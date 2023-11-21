const bcrypt = require('bcrypt')
const regCollection = require('../models/regModel')

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

    contactController:(req,res)=>{
        res.render('../views/contact.ejs')
    },
    
}

module.exports= {registeredUserController}


