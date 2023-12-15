const bcrypt = require('bcrypt')
const regCollection = require("../models/regModel")


// Login and signup routes (get/post)
const signupController= (req,res)=>{
        res.render('../views/signup.ejs')
    }


    loginController= (req,res)=>{
        res.render('../views/login.ejs')
    }


    signupPost= async (req,res)=>{
        const data = {
            name: req.body.username,
            password: req.body.password
        }
        const existingUser = await regCollection.findOne({name: data.name});
        if(existingUser){
        res.redirect('/')
        }
        else{
    // hashing the pasword
    const saltround = 10
    const hashedPassword = await bcrypt.hash(data.password, saltround)
    
    // Replacing original password with hashedpassword
    data.password = hashedPassword


    await regCollection.insertMany(data)

    res.redirect('/home')
}
    }
    

    loginPost= async(req,res)=>{
        try{
            const isUserValid = await regCollection.findOne({name: req.body.username})
            if(!isUserValid){
                console.log("No user with such user name");
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, isUserValid.password);
            if(isPasswordValid){
                req.session.user = isUserValid.name
                res.redirect('/home')
            }else{
                console.log("Wrong password")
            }

    }catch{console.log('wrong details')}
    }


module.exports= {
    signupController,
    loginController,
    signupPost,
    loginPost
}