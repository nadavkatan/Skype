const User = require('../models/user.model');

const getAllUsers = async()=>{
    try{
        const users = await User.find({});
        return users;
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

const addFriend = async(id,friendId)=>{
    try{
        const updatedUser1 = await User.findByIdAndUpdate({_id:id},{$push: {friends: [friendId]}, $pull: {friendRequestesFrom: friendId}});
        const updatedUser2 = await User.findByIdAndUpdate({_id:friendId},{$push: {friends: [id]}});
        return [updatedUser1, updatedUser2]
    }catch(e){
        console.log(e)
    }
}

const sendFriendRequest = async(id, friendId)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate({_id:friendId},{$push: {friendRequestesFrom: [id]}});
        return updatedUser;
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

const unfriend = async(id, friendId)=>{
    try{
        const updatedUser1 = await User.findByIdAndUpdate({_id: id}, {$pull: {friends: friendId}});
        const updatedUser2 = await User.findByIdAndUpdate({_id: friendId}, {$pull: {friends: id}});
    }catch(e){
        console.log(e)
    }
}


module.exports={getAllUsers, getUserByUsername, deleteUser, addFriend, sendFriendRequest, unfriend}