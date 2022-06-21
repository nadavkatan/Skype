const router = require('express').Router();
const Chat = require('../models/chat.model');
const {addMessage, getChat, getUsersChats} = require('../controllers/chat.controller');

router.post('/', async(req,res)=>{
    const chat = await getChat(req.body.id);
    res.status(200).json(chat);
});

router.get('/:id', async(req,res)=>{
    const chats = await getUsersChats(req.params.id);
    res.status(200).json(chats);
})

router.put('/', async(req,res)=>{
    const updatedChat = await addMessage(req.body.id, req.body.message);
    res.status(200).json(updatedChat);
})

module.exports = router;