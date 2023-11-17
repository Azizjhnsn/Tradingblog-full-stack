
const newUserController={
    signupController: (req,res)=>{
        res.render('../views/signup.ejs')
    },
    loginController: (req,res)=>{
        res.render('../views/login.ejs')
    },
    signupPost: (req,res)=>{
        console.log('sup');
    },
    loginPost: (req,res)=>{
        console.log('login');
    }
}

module.exports= {newUserController}