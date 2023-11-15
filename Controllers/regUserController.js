
const registeredUserController= {
     aboutController:(req,res)=>{
        res.render('../views/about.ejs')
    },

    postController:(req,res)=>{
        res.render('../views/post.ejs')
    },

    contactController:(req,res)=>{
        res.render('../views/contact.ejs')
    }
}

module.exports= {registeredUserController}


