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

const registerUser = async (req,res)=>{
  const {firstname, lastname, email, password} = req.body
  try {
		const isUser = await User.findOne({where: {email}});
    if(isUser === null){
      const register = await User.create({firstname, lastname, email, password});
      res.json({code:1, message: 'El usuario fue creado exitosamente'});
    }else{
      res.json({code:0,message:'Ya existe un usuario/a registrado con ese email.'})
    }
	} catch (e) {
		console.log(e)
	}
}

const registerUserWithGoggle =  (req, res )=>{
  const { jwtGoogle} = req.body
  async function verify() {
    const client = new OAuth2Client(ID_CLIENT_GOOGLE);

    const ticket = await client.verifyIdToken({
        idToken: jwtGoogle,
        audience: ID_CLIENT_GOOGLE,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    
    const email = payload.email;
    const firstname = payload.given_name;
    const lastname = payload.family_name;
    // return
    const isUser = await User.findOne({where: {email}});
    if(isUser === null){
      const register = await User.create({firstname, lastname, email});
      res.json({code:1, message: 'El usuario fue creado exitosamente'});
    }else{
      res.json({code:0,message:'Ya existe un usuario/a registrado con ese email.'})
    }
  }
  verify().catch(console.error);
  
}

module.exports ={
    getAllUsers,
    registerUser,
    registerUserWithGoggle
}