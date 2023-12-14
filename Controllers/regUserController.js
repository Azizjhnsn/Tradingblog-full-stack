const bcrypt = require('bcrypt')
const postsModel = require('../models/postsModel')
const databaseContent = require('../middlewares/dataretrieval')

const registeredUserController= {
    homeController: async (req,res)=>{
     res.render('../views/home.ejs')
    },


     aboutController:(req,res)=>{
        res.render('../views/about.ejs')
    },



    postController:async(req,res)=>{
 
       try{ res.render('../views/post.ejs',
      await{
            Title: databaseContent.postTitle,
            Content: databaseContent.postContent,
            Name: databaseContent.postReference,
            Date: 'Theorical date'
        }

       )
    
    } catch(error){console.log(error);}

    },



    newPostSendingController:async (req,res)=>{
        try{
        // Creating record
        const postData = {
            postHeader: req.body.postHeader,
            postContent: req.body.postContent,
            userName: req.session.user
        }
        // Adding record to db
            await postsModel.insertMany(postData)
            console.log('Post sent');
            console.log(req.session.user);
        } catch(err){
            console.log(err);
        }
        await 
        res.redirect('post')
    },


    contactController:(req,res)=>{
        res.render('../views/contact.ejs')
    },

    
    logoutController: (req,res)=>{
    
        req.session.destroy((err)=>{
            if(err){
                res.status(500).send("Error while login out")
            }
            res.redirect('/login')
        })
    }
    
}

module.exports= {registeredUserController}