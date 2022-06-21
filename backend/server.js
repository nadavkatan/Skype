require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoConnect = require('./config/mongoose.config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const chatRouter = require('./routes/chat.route');
const friendRequestsRouter = require('./routes/friendRequest.route');
const notificationsRouter = require('./routes/notification.route');
const callsRouter = require('./routes/calls.route');
const {Server} = require('socket.io');
const http = require('http');
const User = require('./models/user.model');
const Chat = require('./models/chat.model');

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 8000
const io = require('socket.io')(server, {cors:{
    origin: 'http://localhost:3000'
}});

mongoConnect();

const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    mongoUrl: process.env.MONGOOSE_URI,
    collectionName: "sessions"
})

// === socket.io listeners and emitters === //
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    socket.on("user_connected", async(user)=>{
        const updatedUser = await User.findOneAndUpdate({username: user.username}, {socket_id: socket.id}, {new:true})
        console.log(`User Connected: ${updatedUser}`)
    })

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on('initiate_call', async(data)=>{
        const relevantUser = await User.findById({_id: data.to});
        io.to(relevantUser.socket_id).emit('receiving_call', {from: data.from, room: data.room});
    });

    socket.on('answer_call', async(data)=>{
        const relevantUser = await User.findById({_id: data._id})
        io.to(relevantUser.socket_id).emit('call_answered', data);
    })

    socket.on("end_call", async(data) => {
        const relevantUser = await User.findById(data._id);
        io.to(relevantUser.socket_id).emit('call_ended', data);
    });

    socket.on('cancel_call', async(data) => {
        const relevantUser = await User.findById(data._id);
        io.to(relevantUser.socket_id).emit('call_cancelled', data);
    })

    socket.on("decline_call", async(data) => {
        const relevantUser = await User.findById(data._id);
        io.to(relevantUser.socket_id).emit('call_declined', data);
    })

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

// === END socket.io listeners and emitters === //

// === Middlewares === //
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie:{
        maxAge: 1000 * 60 * 60,
    }
}))


require('./config/auth.config');
app.use(passport.initialize());
app.use(passport.session());

// === END Middlewares === //


// === Routes === //

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/friend-requests', friendRequestsRouter);
app.use('/notifications', notificationsRouter);
app.use('/calls', callsRouter);

// === END Routes === //


mongoose.connection.once("open", ()=>{
    console.log("Connected to database");
    // mongoose.connection.collection('chats').deleteMany({})

    // === Listen to changes in mongodb === //

    // Notify frontend on update in the user's friends array
    const UsersChangeStream = mongoose.connection.collection('users').watch();
    UsersChangeStream.on("change", async(change)=>{
        if(change.operationType === "update" && !change.updateDescription.updatedFields.hasOwnProperty("socket_id")){
                const relevantUser = await User.findById({_id: change.documentKey._id});
                io.to(relevantUser.socket_id).emit("addFriend", change)
        }
    })

    // Notify frontend on insert of new notification
    const notificationsChangeStream = mongoose.connection.collection('notifications').watch();
    notificationsChangeStream.on('change', async(change)=>{
        if(change.operationType === "insert" && change.fullDocument.title === "friend_request"){
            const relevantUser = await User.findById({_id: change.fullDocument.user_id})
            io.to(relevantUser.socket_id).emit("notificationUpdate", change)
        }
    })

    //Notify frontend on update of chats (for displaying unread messages)
    const chatsChangeStream = mongoose.connection.collection('chats').watch();
    chatsChangeStream.on('change', async(change)=>{
        if(change.operationType === "update"){
            const updatedChat = change.documentKey._id
            const relevantUsers = await User.find({friends: {$elemMatch: {chatId:updatedChat}}})
            io.to(relevantUsers[0].socket_id).emit("message_update", {updatedChat, messageInfo : {senderName: relevantUsers[1].username, senderId: relevantUsers[1]._id}})
            io.to(relevantUsers[1].socket_id).emit("message_update", {updatedChat, messageInfo :{senderName: relevantUsers[0].username, senderId: relevantUsers[0]._id}})
        }
    })

    server.listen(PORT, ()=>{
        console.log('Server is running on port '+PORT);
    });
})


