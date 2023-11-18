const express= require('express');
const router= express.Router();
const {registeredUserController}= require('../Controllers/regUserController');

router.get('/about',registeredUserController.aboutController);

router.get('/post',registeredUserController.postController);

router.get('/contact',registeredUserController.contactController);

router.get('/home',registeredUserController.homeController);

router.get('/logout',registeredUserController.logoutController);

router.delete('/logout',registeredUserController.logoutDeleteController);

module.exports=router;