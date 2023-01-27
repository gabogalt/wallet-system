const User = require("../models/users");

const apiHome = async  (req, res)=>{
    let user = await User.findOne({where:{id:req.auth.id}});
    user = {
        firstname: user.email,
        lastname: user. lastname,
        email: user.email
    }
    res.status(200).json({code:1, user})
}

module.exports = {
    apiHome
}