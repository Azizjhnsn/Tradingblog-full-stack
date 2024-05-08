// Requiring mongodb
const { text } = require('express');
const mongoose = require('mongoose')
// Creating db connection
const connect = mongoose.connect(process.env.DbConnectUrl)

// Checking connection
connect.then(()=>{
    console.log("success");
})
.catch((error)=>{
    console.log(error);
})

module.exports = connect