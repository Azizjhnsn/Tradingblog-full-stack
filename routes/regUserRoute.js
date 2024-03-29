const express= require('express');
const router= express.Router();
const {
    homeController,
    aboutController,
    postController,
    newPostSendingController,
    contactController,
    logoutController,
    deletePost,
    sendEmail
        }= require('../Controllers/regUserController');

const protection = require('../middlewares/protection')
const imgUpload= require('../middlewares/fileUploadMiddleware')

router.get('/about',protection,aboutController);
router.get('/post',protection,postController);
router.get('/contact',protection,contactController);
router.get('/home',protection,homeController);
router.get('/logout',protection,logoutController);

router.post('/newPost',imgUpload.array('imageFile',5),newPostSendingController);
router.post('/deletePost/:id',deletePost)
router.post('/sendEmail',sendEmail)


module.exports=router;