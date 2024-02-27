const bcrypt = require('bcrypt')
const postsModel = require('../models/postsModel')
const nodemailer = require('nodemailer')


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



const homeController = async (req,res)=>{
     try{
        await retrieveFromDb(res);
        res.render('home.ejs',
        {
            posts: allData
        })
     }catch(error){
        console.log(error);
     }
    }


const aboutController = (req,res)=>{
        res.render('about.ejs')
    }



    const postController = async (req, res) => {
        try {
            // Wait for the data to be retrieved from the database
            await retrieveFromDb(res);
    
            // Now, you can access the data stored in postTitle, postContent, and postReference
            res.render('post.ejs', {
                posts: allData,
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    };
    



const newPostSendingController = async (req,res)=>{
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
    }


const contactController = (req,res)=>{
        res.render('contact.ejs')
    }

    
const logoutController = (req,res)=>{
    
        req.session.destroy((err)=>{
            if(err){
                res.status(500).send("Error while login out")
            }
            res.redirect('/login')
        })
    }

const sendEmail = async(req,res)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secured:false,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASSWORD
        }
    })

    try{
        const mailOptions={
            from:req.body.email,
            to:process.env.USER,
            subject:"Message from Aziz&Charts User",
            text:req.body.message
        }
        transporter.sendMail(mailOptions)
        console.log('Email Sent');
        res.redirect('/contact')
    }catch(error){
        console.log();
        res.status(500).send('Error sending Email')
    }
}
    

module.exports= {
    homeController,
    aboutController,
    postController,
    newPostSendingController,
    contactController,
    logoutController,
    sendEmail
}
