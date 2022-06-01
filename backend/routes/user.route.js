const router = require('express').Router();
const {getAllUsers, getUserById, getUserByName, getUserByUsername, addFriend, sendFriendRequest, deleteUser, unfriend} = require('../controllers/user.controller');

router.get('/', async(req, res) => {
    const users = await getAllUsers();
    res.status(200).json(users);
});

router.get('/:id', async(req, res) => {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
})

router.post('/one', async(req, res) => {
    console.log(req.body.username)
    const user = await getUserByName(req.body.username);
    res.status(200).json(user);
})

router.post('/', async(req, res) => {
    const foundUser = await getUserByUsername(req.body.username);
    res.status(200).json(foundUser);
});

router.put('/', async(req, res) => {
    const updatedUsers = await addFriend(req.body.id, req.body.username, req.body.friendId, req.body.friendName);
    res.status(200).json('Friend added');
})

router.put('/request', async(req, res) => {
    const updatedUser = await sendFriendRequest(req.body.id, req.body.username, req.body.friendId);
    res.status(200).json('Friend request sent');
})

router.put('/unfriend', async(req, res) => {
    const updatedUser = await unfriend(req.body.id, req.body.username, req.body.friendId, req.body.friendName);
    res.status(200).json('Unfriended');
})


router.delete('/', async(req, res) => {
    await deleteUser(req.body.username);
    res.status(200).json("User deleted");
});



module.exports=router;