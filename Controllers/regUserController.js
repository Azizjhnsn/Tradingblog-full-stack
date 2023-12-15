const bcrypt = require('bcrypt')
const postsModel = require('../models/postsModel')

// Retrieve the data function
let postTitle= ''
let postContent= ''
let postReference= ''
async function retrieveFromDb (res){
    try {
        // Retrieve all data from the collection
        const allData = await postsModel.find();

        // Accessin the last element of the array
        const latestPost = allData[allData.length -1]

        // Storing post title content and username
        postTitle = latestPost.postHeader
        postContent = latestPost.postContent
        postReference = latestPost.userName


        return(postTitle,postContent,postReference)


    } catch (error) {
        console.error(error);
        // Handle the error or send an internal server error response
        res.status(500).send('Internal server error');
    }
};

console.log(postTitle,postContent,postReference);

const homeController = async (req,res)=>{
     res.render('../views/home.ejs')
    }


const aboutController = (req,res)=>{
        res.render('../views/about.ejs')
    }



    const postController = async (req, res) => {
        try {
            // Wait for the data to be retrieved from the database
            await retrieveFromDb(res);
    
            // Now, you can access the data stored in postTitle, postContent, and postReference
            res.render('../views/post.ejs', {
                Title: postTitle,
                Content: postContent,
                Name: postReference
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
        res.render('../views/contact.ejs')
    }

    
const logoutController = (req,res)=>{
    
        req.session.destroy((err)=>{
            if(err){
                res.status(500).send("Error while login out")
            }
            res.redirect('/login')
        })
    }
    

module.exports= {
    homeController,
    aboutController,
    postController,
    newPostSendingController,
    contactController,
    logoutController
}
