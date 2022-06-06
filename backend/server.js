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
const {Server} = require('socket.io');
const http = require('http');


const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 8000

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
        console.log(data)
        console.log(data.message);
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

mongoConnect();

const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    mongoUrl: process.env.MONGOOSE_URI,
    collectionName: "sessions"
})

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

mongoose.connection.once("open", ()=>{
    console.log("Connected to database");

    //Listen to changes in DB
    // const UsersChangeStream = mongoose.connection.collection('users').watch();
    // UsersChangeStream.on("change", (change)=>{
    //     console.log("change stream: ",change);
    // })
    const friendRequestsChangeStream = mongoose.connection.collection('friendrequests').watch();
    friendRequestsChangeStream.on("change", (change)=>{
        console.log("change stream: ",change);
        switch(change.operationType){
            case "insert":
                console.log('insert')
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

