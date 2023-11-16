const express= require('express')
require('dotenv').config()
const App= express()
const ejs= require('ejs')



const Port= process.env.Port || 3090

App.use(express.static(__dirname+'/public'))
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
