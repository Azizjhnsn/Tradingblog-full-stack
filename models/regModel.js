const mongoose = require('mongoose')
const connectingDB = require('./connectingDB')

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