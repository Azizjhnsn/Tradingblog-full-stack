// Middleware to protect routes
const protetionMiddlware = (req,res,next)=>{
    if(req.session && req.session.user){
        next()
    }else{
        res.redirect('/login')
        console.log('secured');
    }
}

module.exports = protetionMiddlware