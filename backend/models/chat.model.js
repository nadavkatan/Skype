const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room:{type: String, required: true},
    author: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
})

const chatSchema = new mongoose.Schema({
    messages: {type: [messageSchema]}
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;