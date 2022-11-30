const Home = (req, res) =>{
    res.render('home')
}

const Tables = (req, res) =>{
    res.render('tables')
}

const Notifications = (req, res) =>{
    res.render('notifications')
}

module.exports = {
    Home,
    Tables,
    Notifications
}