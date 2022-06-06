const User = require('../models/user.model');
const { uuid } = require('uuidv4');
const {createNewChat} = require('./chat.controller');

const getAllUsers = async()=>{
    try{
        const users = await User.find({});
        return users;
    }catch(e){
        console.log(e)
    }
}

const getUserById = async(id)=>{
    try{
        const user = await User.findById({_id:id});
        return user;
    }catch(e){
        console.log(e)
    }
}

const getUserByName = async(username)=>{
    try{
        const foundUser = await User.findOne({username:username});
        return foundUser;
    }catch(e){
        console.log(e)
    }
}

const getUserByUsername = async(username)=>{
    try{
        const foundUser = await User.findOne({username: username});
        return foundUser;
    }catch(e){
        console.log(e)
    }
}

const addFriend = async(id,username, friendId, friendName)=>{
    try{
        const newChat = await createNewChat();
        console.log(newChat);
        const updatedUser1 = await User.findByIdAndUpdate({_id:id},{$push: {friends: [{friendId: friendId, friendName: friendName, chatId: newChat._id}]}, $pull: {friendRequestesFrom: {friendId: friendId, friendName: friendName}}}, { safe: true });
        const updatedUser2 = await User.findByIdAndUpdate({_id:friendId},{$push: {friends: [{friendId: id, friendName: username, chatId: newChat._id}]}, $pull: {friendRequestesFrom: {friendId: id, friendName: username}}}, { safe: true });
        return updatedUser1
    }catch(e){
        console.log(e)
    }
}

const sendFriendRequest = async(id, username, friendId)=>{
    try{
        const user = await getUserById(friendId);
        const exsitingFriendRequest = user.friendRequestesFrom.some(e => e.friendId === id);
        const existingFriend = user.friends.some(e => e.friendId === id);
        if(!exsitingFriendRequest && !existingFriend){
            const updatedUser = await User.findByIdAndUpdate({_id:friendId},{$push: {friendRequestesFrom: [{sender_id: id, sender_name: username}]}});
            return updatedUser;
        }else{
            console.log("existingFriendRequest: ", exsitingFriendRequest)
            console.log("existingFriend: ", existingFriend)
            console.log("request or friend already exists")
        }
    }catch(e){
        console.log(e)
    }
}

const deleteUser = async(username)=>{
    try{
        await User.findOneAndDelete({username: username});
    }catch(e){
        console.log(e)
    }
}

const unfriend = async(id, username, friendId, friendName)=>{
    try{
        const updatedUser1 = await User.findByIdAndUpdate({_id: id}, {$pull: {friends: { friendId: friendId, friendName: friendName}}}, { safe: true },);
        const updatedUser2 = await User.findByIdAndUpdate({_id: friendId}, {$pull: {friends: {friendId: id, friendName: username}}}, { safe: true },);
    }catch(e){
        console.log(e)
    }
}


module.exports={getAllUsers, getUserById, getUserByName, getUserByUsername, deleteUser, addFriend, sendFriendRequest, unfriend}