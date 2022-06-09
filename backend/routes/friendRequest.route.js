const router = require('express').Router();
const {createFriendRequest, deleteFriendRequest} = require('../controllers/friendRequest.controller');

router.post("/", async(req, res) => {
    const newFriendRequest = await createFriendRequest(req.body);
    res.status(201).json(newFriendRequest);
})

router.delete("/", async(req, res) => {
    const deletedFriendRequest = await deleteFriendRequest(req.body);
    res.status(200).json(deletedFriendRequest);
})

module.exports = router;