const mongoose = require('mongoose');
const FriendRequest = require('../models/friendRequest.model');

const createFriendRequest = async(data)=>{
    const newFriendRequest = new FriendRequest(data);
        try{
            newFriendRequest.save();
            return newFriendRequest
        }catch(e){
            console.log(e);
        }
}

const deleteFriendRequest = async(friendRequest)=>{
    const deletedFriendRequest =  FriendRequest.findOneAndDelete(friendRequest);
    return deletedFriendRequest
}

module.exports={createFriendRequest, deleteFriendRequest}