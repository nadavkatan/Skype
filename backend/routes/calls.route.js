const router = require('express').Router();
const {storeCall, getParticipantCalls} = require('../controllers/call.controller');


router.get('/:id', async(req, res)=>{
    const calls = await getParticipantCalls(req.params.id);
    res.status(200).json(calls);
});

router.post('/', async(req, res)=>{
    const newCall = await storeCall(req.body);
    res.status(201).json(newCall);
});

module.exports = router;
