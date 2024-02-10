const bcrypt = require('bcrypt')
const regCollection = require("../models/regModel")
const postsModel = require('../models/postsModel')



let allData=[]
async function retrieveFromDb (res){
    try {
        
        // Retrieve all data from the collection
         allData = await postsModel.find();

        return(allData)


    } catch (error) {
        console.error(error);
        // Handle the error or send an internal server error response
        res.status(500).send('Internal server error');
    }
};


// homepage
const homepage= async(req,res)=>{
    try{
       await retrieveFromDb(res);
       res.render('index',
       {
           posts: allData
       })
    }catch(error){
       console.log(error);
    }
   }

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
                if (req.session){
                    req.session.user = isUserValid.name
                res.redirect('/home')
                }else{
                    console.error('Session Error')
                    res.status(500).send('No session')
                }
            }else{
                console.log("Wrong password")
                
            }

    }catch(error){
        console.error(error);
        res.status(500).send('Verification error')
    }
    }


module.exports= {
    homepage,
    signupController,
    loginController,
    signupPost,
    loginPost
}