const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room:{type: String, required: true},
    author: {type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
})

const chatSchema = new mongoose.Schema({
    members:{type: [String]},
    messages: {type: [messageSchema], default: []}
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;