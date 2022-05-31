const router = require('express').Router();
const passport = require('passport');
const createUser = require('../controllers/auth.controller');
const User = require('../models/user.model');

router.post("/register", async(req,res)=>{
    User.findOne({username: req.body.username}, async (err, user)=>{
       if(err) throw err;
       if(user) {
           // console.log("User already exists")
           res.send("User already exists");
       }
       if(!user){
           const createdUser = await createUser(req.body);
           res.status(201).json(createdUser);
       }
   })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (e, user, info) => {
        if(e) return next(e);
        if(info) return res.json({info, isAuth: false});
        req.logIn(user, e => {
            if(e) return next(e);
            console.log(req.session);
            return res.json({isAuth: true}) 
            
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next)=>{
    req.logout((err)=> {
      if (err) { return next(err); }
    req.session.destroy((err)=>{
        res.clearCookie("connect.sid", {path: "/"})
        res.json(false)
    });
    });
  });

router.get("/check-auth", (req, res)=>{
    if(req.isAuthenticated()){
        res.json({isAuth: true, user: req.user.username})
    }else{
        res.json({isAuth: false})
    }
})

module.exports = router;