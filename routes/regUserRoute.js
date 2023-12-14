const express= require('express');
const router= express.Router();
const {registeredUserController}= require('../Controllers/regUserController');
const protection = require('../middlewares/protection')
const retrieval = require('../middlewares/dataretrieval')
const imgUpload= require('../middlewares/fileUploadMiddleware')

router.get('/about',protection,registeredUserController.aboutController);

router.get('/post',[protection,retrieval],registeredUserController.postController);

router.get('/contact',protection,registeredUserController.contactController);

router.get('/home',protection,registeredUserController.homeController);

// router.post('/newPost',registeredUserController.newPostSendingController);

// I've commented this so I can create another post route to handle posting pictures with another UI as well

router.post('/newPost',imgUpload.array('imageFile',5),registeredUserController.newPostSendingController);


router.get('/logout',registeredUserController.logoutController);


module.exports=router;