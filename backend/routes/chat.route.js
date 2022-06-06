const router = require('express').Router();
const Chat = require('../models/chat.model');
const {addMessage, getChat} = require('../controllers/chat.controller');

router.post('/', async(req,res)=>{
    console.log(req.body.id)
    const chat = await getChat(req.body.id);
    console.log(chat);
    res.status(200).json(chat);
});

router.put('/', async(req,res)=>{
    const updatedChat = await addMessage(req.body.id, req.body.message);
    console.log(updatedChat);
    res.status(200).json(updatedChat);
})

module.exports = router;