const bcrypt = require('bcrypt')
const postsModel = require('../models/postsModel')
const nodemailer = require('nodemailer')

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


// Get requests
const homeController = async (req,res)=>{
     try{
        await retrieveFromDb(res);
        res.render('home',
        {
            headerImage: 'assets/img/home-bg.jpg',
            records: allData
        })
     }catch(error){
        console.log(error);
     }
    }
const aboutController = (req,res)=>{
        res.render('about',{headerImage: 'assets/img/about-bg.jpg'})
    }
const postController = async (req, res) => {
        try {
            // Wait for the data to be retrieved from the database
            await retrieveFromDb(res);
    
            // Now, you can access the data stored in postTitle, postContent, and postReference
            res.render('post', {
                headerImage: 'assets/img/post-bg.jpg',
                records: allData,
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    };
const contactController = (req,res)=>{
    res.render('contact',{
        headerImage: 'assets/img/contact-bg.jpg',
    })
}    


// Post requests
const newPostSendingController = async (req,res)=>{
        try{
        // Creating record
        const postData = {
            postHeader: req.body.postHeader,
            postContent: req.body.postContent,
            userName: req.session.user,
            userId: req.session.userId
        }
        // Adding record to db
            await postsModel.insertMany(postData)
            console.log('Post sent')
        } catch(err){
            console.log(err);
        }
        await 
        res.redirect('post')
    }
const deletePost = async(req,res)=>{
    const recordId = req.params.id;
    const postUserId = req.body.userId
    if (postUserId == req.session.userId){
        try {
            const deletedRecord = await postsModel.findByIdAndDelete(recordId);
        
            if (!deletedRecord) {
              return res.status(404).json({ error: 'Record not found' });
            } else{
                 res.redirect('/post');
        
            }
        
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    } else{
        console.log('You cannot delete this post');
        res.redirect('/post')
    }

}    
const logoutController = (req,res)=>{
    
        req.session.destroy((err)=>{
            if(err){
                res.status(500).send("Error while login out")
            }
            res.redirect('/login')
        })
    }

// Email sending
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
    deletePost,
    sendEmail
}
