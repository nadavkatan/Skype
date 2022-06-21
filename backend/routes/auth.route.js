const router = require('express').Router();
const passport = require('passport');
const createUser = require('../controllers/auth.controller');
const User = require('../models/user.model');

// router.post("/register", async(req,res)=>{
//     User.findOne({username: req.body.username}, async (err, user)=>{
//        if(err) throw err;
//        if(user) {
//            res.json({isAuth: false, message: "Username is already taken"});
//        }
//        if(!user){
//            const createdUser = await createUser(req.body);
//            res.status(201).json({isAuth: true, message: "", user: createdUser});
//        }
//    })
// });

router.post("/register", async(req,res)=>{
    User.findOne({username: req.body.username}, async (err, user)=>{
       if(err) throw err;
       if(user) {
           res.json({message: "Username is already taken"});
       }
       if(!user){
           const createdUser = await createUser(req.body);
           res.status(201).json({message: "Created", user: createdUser});
       }
   })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (e, user, info) => {
        if(e) return next(e);
        if(info) return res.json({info, isAuth: false});
        req.logIn(user, async(e) => {
            if(e) return next(e);
            await User.findByIdAndUpdate({_id:req.user._id}, {is_logged_in:true}, {new:true})
            req.user.is_logged_in = true;
            console.log(req.user)
            return res.json({isAuth: true, userId: req.user._id, user:req.user}) 
            
        });
    })(req, res, next);
});

router.post('/logout', async(req, res, next)=>{
    console.log("logout",req.user)
   await User.findByIdAndUpdate({_id:req.user._id}, {is_logged_in:false}, {new:true})
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