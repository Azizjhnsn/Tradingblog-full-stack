const express= require('express');
const router= express.Router();
const {registeredUserController}= require('../Controllers/regUserController');
const protection = require('../Controllers/protection')


router.get('/about',protection,registeredUserController.aboutController);

router.get('/post',protection,registeredUserController.postController);

router.get('/contact',protection,registeredUserController.contactController);

router.get('/home',protection,registeredUserController.homeController);

router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send("Error while login out")
        }
        res.redirect('/login')
    })
})


module.exports=router;