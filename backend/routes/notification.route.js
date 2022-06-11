const router = require('express').Router();
const {createNotification, getAllUserNotification, deleteNotification} = require('../controllers/notification.controller');

router.get("/:id", async(req, res)=>{
    const notifications = await getAllUserNotification(req.params.id);
    if(notifications.length){
        res.status(200).json(notifications);
    }else{
        res.status(200).json({message: 'no notifications'})
    }
});

router.post("/", async(req, res)=>{
    const newNotification = await createNotification(req.body);
    res.status(201).json(newNotification);
});

router.delete("/", async(req, res)=>{
    const deletedNotification = await deleteNotification(req.body);
    res.status(204).json(deletedNotification);
})

module.exports = router;