const User = require('../models/user.model');
const { uuid } = require('uuidv4');
const {createNewChat} = require('./chat.controller');
const {validatePassword, genPassword} = require('../utils/crypto.utilities');



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
        const updatedUser1 = await User.findByIdAndUpdate({_id:id},{$push: {friends: [{friendId: friendId, friendName: friendName, chatId: newChat._id}]}, $pull: {friendRequestesFrom: {sender_id: friendId, sender_name: friendName}}}, { safe: true });
        const updatedUser2 = await User.findByIdAndUpdate({_id:friendId},{$push: {friends: [{friendId: id, friendName: username, chatId: newChat._id}]}, $pull: {friendRequestesTo: {friend_id: id}}}, { safe: true });
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
            const updatedSender = await User.findByIdAndUpdate({_id:id},{$push: {friendRequestesTo: [{friend_id:friendId}]}})
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

const findAllUserContacts = async(id)=>{
    // db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})

    try{
        const contacts = await User.find({friends: {$elemMatch:{friendId:id}}});
        return contacts
    }catch(e){
        console.log(e)
    }
}

const updateUserCredentials = async(id, update)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate({_id: id}, update, {new: true});
        return updatedUser
    }catch(e){
        console.log(e)
    }
}

const changePassword = async(id, update)=>{
    const {salt, hash} = await User.findById({_id:id})
    const valid = validatePassword(update.currentPassword, hash, salt);
    if(valid){
        const saltAndHash = genPassword(update.newPassword);
        try{
            const updatedUser = await User.findByIdAndUpdate({_id: id}, saltAndHash, {new: true});
            return {message: "Password changed successfully"}
        }catch(e){
            console.log(e)
        }
    }else{
        console.log("incorrect password")
        return {message: "Incorrect password"}
    }

}


module.exports={getAllUsers,findAllUserContacts, changePassword, updateUserCredentials, getUserById, getUserByName, getUserByUsername, deleteUser, addFriend, sendFriendRequest, unfriend}