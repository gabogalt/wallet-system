const User = require("../models/users");
const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv')
dotenv.config()

const getAllUsers = async (req,res)=>{
    try {
		const users = await User.findAll();
    res.json(users)
	} catch (e) {
		console.log(e)
	}
}


module.exports ={
    getAllUsers,
}