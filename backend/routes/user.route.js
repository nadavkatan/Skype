const router = require('express').Router();
const {getAllUsers, getUserById, changePassword, updateUserCredentials, findAllUserContacts, getUserByName, getUserByUsername, addFriend, sendFriendRequest, deleteUser, unfriend} = require('../controllers/user.controller');
const upload = require('../config/multer.config');
const {uploadFile} = require('../controllers/cloudinary.controller');

router.get('/', async(req, res) => {
    const users = await getAllUsers();
    res.status(200).json(users);
});

router.get('/:id', async(req, res) => {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
})

router.get('/contacts/:id', async(req, res) => {
    const contacts = await findAllUserContacts(req.params.id);
    res.status(200).json(contacts);
})


router.post('/one', async(req, res) => {
    const user = await getUserByName(req.body.username);
    res.status(200).json(user);
})

router.put('/', async(req, res) => {
    const updatedUser = await addFriend(req.body.id, req.body.username, req.body.friendId, req.body.friendName);
    res.status(200).json(updatedUser);
});

router.put('/request', async(req, res) => {
    const updatedUser = await sendFriendRequest(req.body.id, req.body.friendName, req.body.friendId);
    res.status(200).json('Friend request sent');
});

router.put('/edit-credentials/:id', upload.single("avatar") ,async(req, res) => {
    if(req.file){
        const {public_id, format, bytes, secure_url} = await uploadFile(req.file, req.file.fieldname + "-" + Date.now() , 'avatars');
        const userWithAvatar = {...req.body, avatar: {public_id, format, bytes, secure_url}};
        const updatedUser = await updateUserCredentials(req.params.id, userWithAvatar);
        res.status(200).json(updatedUser);
    }else{
        const updatedUser = await updateUserCredentials(req.params.id, req.body);
        res.status(200).json(updatedUser);
    }
});

router.put('/change-password/:id', async(req, res) => {
    const updatedUser = await changePassword(req.params.id, req.body)
    res.status(200).json(updatedUser);
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