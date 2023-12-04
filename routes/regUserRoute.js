const express= require('express');
const router= express.Router();
const {registeredUserController}= require('../Controllers/regUserController');
const protection = require('../Controllers/protection')
const retrieval = require('../Controllers/dataretrieval')

router.get('/about',protection,registeredUserController.aboutController);

router.get('/post',[protection,retrieval],registeredUserController.postController);

router.get('/contact',protection,registeredUserController.contactController);

router.get('/home',protection,registeredUserController.homeController);

router.get('/newPost',protection,registeredUserController.newPostController);

router.post('/newPost',protection,registeredUserController.newPostSendingController);


router.get('/logout',registeredUserController.logoutController);


module.exports=router;