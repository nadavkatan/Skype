require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoConnect = require('./config/mongoose.config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const authRouter = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 8000

mongoConnect();

const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    // mongoUrl: process.env.MONGOOSE_URI,
    collectionName: "sessions"
})

app.use(cors({
    credentials: true,
    origin: 'https://localhost:3000'
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

mongoose.connection.once("open", ()=>{
    console.log("Connected to database");
    app.listen(PORT, ()=>{
        console.log('Server is running on port '+PORT);
    });
})

