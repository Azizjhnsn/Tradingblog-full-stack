const express= require('express')
const router= express.Router()
const {newUserController}= require('../Controllers/newUserController.js')


router.get('/login',newUserController.loginController)

router.get('/signup',newUserController.signupController)


module.exports= router