const connect = require('./connectingDB')
const mongoose = require('mongoose')

// Creating a schema
const postedData = new mongoose.Schema({
    newPost: {
        type: String,
        required: true
    }
})

const postCollection = new mongoose.model("posts", postedData)

module.exports = postCollection
