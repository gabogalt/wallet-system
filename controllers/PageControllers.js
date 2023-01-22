const Home = (req, res) =>{
    
    res.render('home')
}

const Tables = (req, res) =>{
    res.render('tables')
}

const Notifications = (req, res) =>{
    res.render('notifications')
}

const Profile = (req, res)=>{
    res.render('profile')
}

const singUp = (req, res)=>{
    res.render('singUp',{
        registerUser: {
            init: true
        }
    })
    
}

const Login = (req,res)=>{
    res.render('Login')
}

module.exports = {
    Home,
    Tables,
    Notifications,
    Profile,
    singUp,
    Login 
}