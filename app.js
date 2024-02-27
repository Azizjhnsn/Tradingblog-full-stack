const express= require('express')
require('dotenv').config()

const regCollection = require('./models/regModel')
const ejs= require('ejs')
const path= require('path')
const expressSession = require('express-session')
const registeredRouter= require('./routes/regUserRoute')
const newUserRouter= require('./routes/newUserRoute')
const expressLayouts = require('express-ejs-layouts')

const App= express()
const Port= process.env.Port || 3090

// Converting data into json and encoding URL
App.use(express.json())
App.use(express.urlencoded({extended: false}))
App.set("views", __dirname + "/views/pages/");
App.set("layout", __dirname + "/views/master");
App.use(express.static(__dirname+'/public'))
App.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    name: process.env.NAME,
    saveUninitialized: true,
    cookie: {}
}))
App.use('/',registeredRouter)
App.use('/',newUserRouter)

App.set('view engine','ejs')
App.use(expressLayouts)



App.listen(Port,()=>{
    console.log(`Server listening on Port http://localhost:${Port}`);
})