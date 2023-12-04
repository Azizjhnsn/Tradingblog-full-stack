// Requiring mongodb
const { text } = require('express');
const mongoose = require('mongoose')
// Creatin db connection
const connect = mongoose.connect(process.env.DbConnectUrl)

// Checking connection
connect.then(()=>{
    console.log("succes");
})
.catch((error)=>{
    console.log(error);
})

module.exports = connect