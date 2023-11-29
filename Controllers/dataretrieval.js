// Middleware for data retrieal

const postsModel= require('../models/postsModel')


// Middleware to retrieve the data
const retriveLatestData = async (req, res, next) => {
    try {
        // Retrieve all data from the collection
        const allData = await postsModel.find();

        // Logging the retrieved data
        console.log('All Data: ', allData);

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









// Variables to check if data has already been retrieved
// let isDataRetrieved = false;
// let latestData = null;

// // middleware to retrieve the data 
// const retriveLatestData = async(req,res,next)=>{
//     try{
//         if (!isDataRetrieved){
//             // Retrieve the latest uploaded data
//             latestData = await postsModel.findOne()
//             // .sort({timestampField: -1})
//             // .limit(1);
//             isDataRetrieved= true;

//             // Logging the retrived data
//             console.log('Latest Data: ', latestData);
//         }
//         // Attach the data to the request
//         req.latestData = latestData

//         // Continue to the route handler
//         next();
//     }catch(error){
//         console.error(error);
//         // res.status(500).send('Internal server error')
//     }

// };




