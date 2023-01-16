const User = require("../models/users");

const getAllUsers = async (req,res)=>{
    try {
		const users = await User.findAll();
    // console.log(users.every(user => user instanceof User)); // true
        res.json(users)
	} catch (e) {
		console.log(e)
	}
}

module.exports ={
    getAllUsers,
}