const connect = require('./connectingDB')
const mongoose = require('mongoose')

// Creating a schema
const postedData = new mongoose.Schema({
    postHeader: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    }
})

const postCollection = new mongoose.model("posts", postedData)


module.exports = postCollection

