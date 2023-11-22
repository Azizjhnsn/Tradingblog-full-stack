const bcrypt = require('bcrypt')
const regCollection = require("../models/regModel")



const newUserController={
    signupController: (req,res)=>{
        res.render('../views/signup.ejs')
    },
    loginController: (req,res)=>{
        res.render('../views/login.ejs')
    },
    signupPost: async (req,res)=>{
        const data = {
            name: req.body.username,
            password: req.body.password
        }
const existingUser = await regCollection.findOne({name: data.name});
if(existingUser){
    res.redirect('/')
}else{
    // hashing the pasword
    const saltround = 10
    const hashedPassword = await bcrypt.hash(data.password, saltround)
    
    // Replacing original password with hashedpassword
    data.password = hashedPassword

    // The bellow commented are used to test when adding Data to the database
    
    // Adding data to the database
    // const userdata = 
    await regCollection.insertMany(data)
    // console.log(userdata);
    res.redirect('/home')
}
    },
    loginPost: async(req,res)=>{
        try{
            const checker = await regCollection.findOne({name: req.body.username})
            if(!checker){
                console.log("No user with such user");
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, checker.password);
            if(isPasswordValid){
                req.session.user = checker.name
                res.redirect('/home')
            }else{
                console.log("Wrong password")
            }

    }catch{console.log('wrong details')}
    }
}

module.exports= {newUserController}