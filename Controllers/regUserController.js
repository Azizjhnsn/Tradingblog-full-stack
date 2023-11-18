
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
    logoutController:(req,res)=>{
        res.render('../views/logout.ejs')
    },
    logoutDeleteController:(req,res)=>{
        
    }
}

module.exports= {registeredUserController}


