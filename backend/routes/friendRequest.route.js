const router = require('express').Router();
const {createFriendRequest} = require('../controllers/friendRequest.controller');

router.post("/", async(req, res) => {
    const newFriendRequest = await createFriendRequest(req.body);
    res.status(201).json(newFriendRequest);
})

module.exports = router;