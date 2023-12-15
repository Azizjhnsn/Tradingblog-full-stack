const express= require('express');
const router= express.Router();
const registeredUserController= require('../Controllers/regUserController');
const protection = require('../middlewares/protection')
const imgUpload= require('../middlewares/fileUploadMiddleware')

router.get('/about',protection,registeredUserController.aboutController);

router.get('/post',protection,registeredUserController.postController);

router.get('/contact',protection,registeredUserController.contactController);

router.get('/home',protection,registeredUserController.homeController);


router.post('/newPost',imgUpload.array('imageFile',5),registeredUserController.newPostSendingController);


router.get('/logout',registeredUserController.logoutController);


module.exports=router;