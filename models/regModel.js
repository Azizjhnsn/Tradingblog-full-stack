// Requiring mongodb
const { text } = require('express');
const mongoose = require('mongoose')
// Creatin db connection
const connect = mongoose.connect('mongodb://127.0.0.1:27017/CleanBlog')

// Checking connection
connect.then(()=>{
    console.log("succes");
})
.catch((error)=>{
    console.log(error);
})

// Creating schema
const regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const regCollection = new mongoose.model("users", regSchema);

module.exports= regCollection