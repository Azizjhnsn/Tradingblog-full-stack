const express= require('express');
const router= express.Router();
const {registeredUserController}= require('../Controllers/regUserController');

router.get('/about',registeredUserController.aboutController);

router.get('/post',registeredUserController.postController);

router.get('/contact',registeredUserController.contactController);

module.exports=router;