const mongoose = require('mongoose');

const friendSchema= new mongoose.Schema({
    friendId:{type: String, required: true},
    friendName:{type: String, required: true},
    chatId:{type: String, required: true}
});

const friendRequestSchema = new mongoose.Schema({
    sender_id: {type: String, required: true},
    sender_name: {type: String, required: true},
})

const friendRequestToSchema = new mongoose.Schema({
    friend_id: {type: String, required: true},
});

const AvatarSchema = {
    _id: false,
    public_id: String,
    format: String,
    bytes: Number,
    secure_url: {type: String, default: 'https://res.cloudinary.com/disyvovh2/image/upload/v1655451340/avatars/profile-pic_r1feca.jpg'},
  };

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true},
    friends: {type: [friendSchema], required: true},
    friendRequestesFrom: {type: [friendRequestSchema]},
    friendRequestesTo:{type: [friendRequestToSchema]},
    socket_id:{type: String},
    avatar: AvatarSchema,
    is_logged_in: {type: Boolean, default: false, required: true},
    hash: {type: String, required: true, trim: true},
    salt: {type: String, required: true, trim: true}
});

const User = mongoose.model('User', userSchema);


module.exports = User;