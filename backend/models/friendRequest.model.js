const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
    sender_id: {type: String, required: true},
    sender_name: {type: String, required: true},
    receiver_id: {type: String, required: true},
    receiver_name: {type: String, required: true},
})

const FriendRequest = mongoose.model('FriendRequest',friendRequestSchema );

module.exports = FriendRequest