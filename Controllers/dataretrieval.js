// Middleware for data retrieal

const postsModel= require('../models/postsModel')


// Middleware to retrieve the data
const retriveLatestData = async (req, res, next) => {
    try {
        // Retrieve all data from the collection
        const allData = await postsModel.find();

        // Accessin the last element of the array
        const latestPost = allData[allData.length -1]
        console.log(latestPost);

        // Storing post title content and username
        let postTitle = latestPost.postHeader
        let postContent = latestPost.postContent
        let postReference = latestPost.userName
        // let postDate = latestPost.createdAT

        console.log(postTitle,postContent,postReference);


        // Logging the retrieved data
        // console.log('All Data: ', allData);

        // Attach the data to the request
        req.allData = allData;

        // Continue to the route handler
        next();
    } catch (error) {
        console.error(error);
        // Handle the error or send an internal server error response
        res.status(500).send('Internal server error');
    }
};

module.exports = retriveLatestData







