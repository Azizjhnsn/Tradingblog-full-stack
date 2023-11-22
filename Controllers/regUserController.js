const bcrypt = require('bcrypt')
const postsModel = require('../models/postsModel')

const registeredUserController= {
    homeController:(req,res)=>{
        res.render('../views/home.ejs')
    },
     aboutController:(req,res)=>{
        res.render('../views/about.ejs')
    },

    postController:(req,res)=>{
        res.render('../views/post.ejs')
    },

    newPostController:(req,res)=>{
        res.render('../views/newPost.ejs')
    },
    newPostSendingController:async (req,res)=>{

        // Creating record
        const postData = {
            newPost: req.body.newPost
        }
        // Adding record to db
        try{
            await postsModel.insertMany(postData)
            console.log('Post sent');
        } catch(err){
            console.log(err);
        }
    },

    contactController:(req,res)=>{
        res.render('../views/contact.ejs')
    },
    
}

module.exports= {registeredUserController}


