const router = require('express').Router();
const passport = require('passport');
const createUser = require('../controllers/auth.controller');
const User = require('../models/user.model');

router.post("/register", async(req,res)=>{
    User.findOne({username: req.body.username}, async (err, user)=>{
       if(err) throw err;
       if(user) {
           // console.log("User already exists")
        //    res.send("User already exists");
           res.json({isAuth: false, message: "User already exists"});
       }
       if(!user){
           const createdUser = await createUser(req.body);
        //    res.status(201).json(createdUser);
           res.status(201).json({isAuth: true, message: "", user: createdUser});
       }
   })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (e, user, info) => {
        if(e) return next(e);
        if(info) return res.json({info, isAuth: false});
        req.logIn(user, e => {
            if(e) return next(e);
            console.log(req.user);
            return res.json({isAuth: true, userId: req.user._id, user:req.user}) 
            
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next)=>{
    console.log(req.user)
    req.logout((err)=> {
      if (err) { return next(err); }
    req.session.destroy((err)=>{
        res.clearCookie("connect.sid", {path: "/"})
        res.json(false)
    });
    });
  });

router.get("/check-auth", (req, res)=>{
    // console.log(req.user)
    if(req.isAuthenticated()){
        res.json({isAuth: true, userId: req.user._id, user: req.user})
    }else{
        res.json({isAuth: false})
    }
})

module.exports = router;