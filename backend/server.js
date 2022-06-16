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
const {Server} = require('socket.io');
const http = require('http');
const User = require('./models/user.model');


const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 8000
const io = require('socket.io')(server, {cors:{
    origin: 'http://localhost:3000'
}});

// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000'
//     }
// });

mongoConnect();

const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    mongoUrl: process.env.MONGOOSE_URI,
    collectionName: "sessions"
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // socket.to(socket.id).emit("user_connection", socket.id);
    
    socket.on("user_connected", async(user)=>{
        const updatedUser = await User.findOneAndUpdate({username: user.username}, {socket_id: socket.id}, {new:true})
    })

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
        console.log(data)
        console.log(data.message);
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("callUser", (data) => {
        console.log('call user', data)
		io.to(data.userToCall).emit("incomingCall", { signal: data.signalData, from: data.from})
	});

    socket.on('initiate_call', async(data)=>{
        const relevantUser = await User.findById({_id: data.to});
        console.log(relevantUser)
        io.to(relevantUser.socket_id).emit('receiving_call', {from: data.from});
    });

    socket.on('answer_call', async(data)=>{
        console.log('answer call', data);
        const relevantUser = await User.findById({_id: data.friendId})
        io.to(relevantUser.socket_id).emit('call_answered', data);
    })

    socket.on("end_call", async(data) => {
        console.log('receieved end_call event', data);
        // const relevantUser = await User.findById(data.friendId);
        const relevantUser = await User.findById(data._id);
        console.log('relevant user', relevantUser);
        io.to(relevantUser.socket_id).emit('call_ended', data);
    });

    socket.on('cancel_call', async(data) => {
        // console.log("cancel call event",data)
        // const relevantUser = await User.findById(data.friendId);
        const relevantUser = await User.findById(data._id);
        // console.log("relevant user: ",relevantUser)
        io.to(relevantUser.socket_id).emit('call_cancelled', data);
    })

    socket.on("acceptCall", (data) => {
        console.log('call accepted', data)
        io.to(data.to).emit('callAccepted', data.signal);
    });


    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });


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

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/friend-requests', friendRequestsRouter);
app.use('/notifications', notificationsRouter);

mongoose.connection.once("open", ()=>{
    console.log("Connected to database");
    // mongoose.connection.collection('chats').deleteMany({})

    // Listen to changes in DB
    const UsersChangeStream = mongoose.connection.collection('users').watch();
    UsersChangeStream.on("change", async(change)=>{
        // console.log("change stream: ",change);
        if(change.operationType === "update" && !change.updateDescription.updatedFields.hasOwnProperty("socket_id")){
                const relevantUser = await User.findById({_id: change.documentKey._id});
                // console.log('relevant user: ', relevantUser);
                io.to(relevantUser.socket_id).emit("addFriend", change)
        }
    })

    const notificationsChangeStream = mongoose.connection.collection('notifications').watch();
    notificationsChangeStream.on('change', async(change)=>{
        // console.log("notifications change stream: ",change);
        if(change.operationType === "insert" && change.fullDocument.title === "friend_request"){
            const relevantUser = await User.findById({_id: change.fullDocument.user_id})
            // console.log('relevant user: ', relevantUser);
            io.to(relevantUser.socket_id).emit("notificationUpdate", change)
        }
    })

    const friendRequestsChangeStream = mongoose.connection.collection('friendrequests').watch();
    friendRequestsChangeStream.on("change", (change)=>{
        // console.log("change stream: ",change);
        switch(change.operationType){
            case "insert":
                // console.log('insert')
                const friendRequest = {
                    sender_name: change.fullDocument.sender_name,
                    sender_id: change.fullDocument.sender_id,
                    receiver_id: change.fullDocument.receiver_id,
                    receiver_name: change.fullDocument.receiver_name,
                }

                io.emit("newFriendRequest", friendRequest);
        }
    })

    server.listen(PORT, ()=>{
        console.log('Server is running on port '+PORT);
    });
})


