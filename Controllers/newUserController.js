const bcrypt = require('bcrypt')
const regCollection = require("../models/regModel")
const postsModel = require('../models/postsModel')


// Function to retrive the data from the databse and use it later

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


// Non registerd users page route
const homepage= async(req,res)=>{
    try{
       await retrieveFromDb(res);
       res.render('index',{
           layout: false,
           records: allData
       })
    }catch(error){
       console.log(error);
    }
   }

// Get controllers (Athentication)
const signupController= (req,res)=>{
        res.render('signup',{layout: false})
    }
const loginController= (req,res)=>{
        res.render('login',{layout: false})
    }

// Post controllers (Authentication)
// const signupPost= async (req,res)=>{
//         const data = {
//             name: req.body.username,
//             password: req.body.password
//         }
//         console.log(data);
//         const existingUser = await regCollection.findOne({name: data.name});
//         if(existingUser){
//         console.log('User already there')
//         res.redirect('/')
//         }
//         else{
//     // hashing the pasword
//     const saltround = 10
//     const hashedPassword = await bcrypt.hash(data.password, saltround)
    
//     // Replacing original password with hashedpassword
//     data.password = hashedPassword


//     await regCollection.insertMany(data)

//     console.log("SUCCESFUL REGISTRATION")
//     res.redirect('/home')
// }
//     }
const signupPost = async (req, res) => {
    try {
      // Extract data from request body
      const data = {
        name: req.body.username,
        password: req.body.password,
      };
  
      // Check for existing user
      const existingUser = await regCollection.findOne({ name: data.name });
      if (existingUser) {
        console.log('User already exists');
        res.redirect('/'); // Or display an appropriate error message to the user
        return; // Exit the function if user already exists
      }
  
      // Hash the password with bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  
      // Update data object with hashed password
      data.password = hashedPassword;
  
      // Insert user data into database
      await regCollection.insertMany(data); // Use insertOne for single document insertion
  
      console.log("Successful registration");
      res.redirect('/home');
    } catch (error) {
      console.error('Error during signup:', error);
      res.redirect('/signup'); // Redirect to signup page with an error message (optional)
    }
  };
  
const loginPost= async(req,res)=>{
        try{
            const isUserValid = await regCollection.findOne({name: req.body.username})
            if(!isUserValid){
                console.log("No user with such user name");
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, isUserValid.password);
            if(isPasswordValid){
                if (req.session){
                    req.session.user = isUserValid.name
                    req.session.userId = isUserValid._id;
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