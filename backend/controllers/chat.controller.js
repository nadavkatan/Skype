const Chat = require('../models/chat.model');

const createNewChat = async(members)=>{
    const newChat = new Chat(members);
    try{
        newChat.save();
        return newChat;
    }catch(e){
        console.log(e)
    }
}

const addMessage = async(id, message)=>{
    try{
        const updatedChat = await Chat.findByIdAndUpdate({_id:id, message}, {$push: {messages: [message]}}, {new: true})
        return updatedChat
    }catch(e){
        console.log(e)
    }
}

const getChat = async(id)=>{
    try{
        const chat = await Chat.findById({_id:id});
        return chat
    }catch(e){
        console.log(e)
    }
}

const getUsersChats = async(id)=>{
    try{
        const chats = await Chat.find({members:{$in:[id]}});
        return chats;
    }catch(e){
        console.log(e)
    }
}

module.exports = {createNewChat, addMessage, getChat, getUsersChats};