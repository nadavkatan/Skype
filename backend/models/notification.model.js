const mongoose = require('mongoose');

const notificationContentSchema = new mongoose.Schema({
    sender_name: String,
    receiver_id: String,
    receiver_name: String,
    confirmation_text: String,
})

const notificationSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    sender_id: String,
    title: {type: String, required: true},
    content: {type: notificationContentSchema, required: true}
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification;