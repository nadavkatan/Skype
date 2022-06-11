const Notification = require('../models/notification.model');

const createNotification = async(data)=>{
    const newNotification = await new Notification(data);
        try{
            newNotification.save();
            return newNotification
        }catch(e){
            console.log(e);
        }
}

const getAllUserNotification = async(userId)=>{
    try{
        const notifications = await Notification.find({user_id: userId});
        return notifications
    }catch(e){
        console.log(e);
    }
}

const deleteNotification = async(data)=>{
    try{
        const deletedNotification = await Notification.findOneAndDelete({user_id: data.user_id, sender_id: data.sender_id});
        return deletedNotification
    }catch(e){
        console.log(e)
    }

}

module.exports={createNotification, getAllUserNotification, deleteNotification}