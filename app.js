const express= require('express')
require('dotenv').config()
const App= express()
const regCollection = require('./models/regModel')
const ejs= require('ejs')
const path= require('path')
const expressSession = require('express-session')


const Port= process.env.Port || 3090

// Converting data into json and encoding URL
App.use(express.json())
App.use(express.urlencoded({extended: false}))

App.use(express.static(__dirname+'/public'))
// Setting the session up
App.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    name: process.env.NAME,
    saveUninitialized: true,
    cookie: {}
}))


// Creating the authentication middleware




App.set('view engine','ejs')

App.get('/',(req,res)=>{
    res.render('index.ejs')
})

const registeredRouter= require('./routes/regUserRoute')
const newUserRouter= require('./routes/newUserRoute')

App.use('/',registeredRouter)
App.use('/',newUserRouter)

App.listen(Port,()=>{
    console.log(`Server listening on Port http://localhost:${Port}`);
})
