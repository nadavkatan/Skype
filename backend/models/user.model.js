const mongoose = require('mongoose');

const friendSchema= new mongoose.Schema({
    friendId:{type: String, required: true},
    friendName:{type: String, required: true},
    chatId:{type: String, required: true}
});

const friendRequestSchema = new mongoose.Schema({
    sender_id: {type: String, required: true},
    sender_name: {type: String, required: true},
    // receiver_id: {type: String, required: true},
    // receiver_name: {type: String, required: true},
})

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, unique: true},
    // friends:{type:[String]},
    friends: {type: [friendSchema], required: true},
    // friendRequestesFrom: {type: [String]},
    friendRequestesFrom: {type: [friendRequestSchema]},
    hash: {type: String, required: true, trim: true},
    salt: {type: String, required: true, trim: true}
});

const User = mongoose.model('User', userSchema);


module.exports = User;