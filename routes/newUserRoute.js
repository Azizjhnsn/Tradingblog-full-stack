const express= require('express')
const router= express.Router()
const {
    homepage,
    signupController,
    loginController,
    signupPost,
    loginPost
       }= require('../Controllers/newUserController.js')

router.get('/',homepage);
router.get('/login',loginController);
router.get('/signup',signupController);
router.post('/login',loginPost);
router.post('/signup',signupPost);

module.exports= router;