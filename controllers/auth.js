const express = require("express");
const bcrypt = require("bcrypt");
const { expressjwt: jwt } = require("express-jwt");
const jwToken = require("jsonwebtoken");
const User = require("../models/users");

const validateJwt = jwt({
	secret: process.env.SECRET,
	algorithms: ["HS256"],
});

const signToken = (id) => jwToken.sign({ id }, process.env.SECRET, { expiresIn: '1d',});

const findAndAssignerUser = async (err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		
		res.json({code:0, message:"invalid token"});
		res.render('Login')
	}
	next();

};

const isAuthenticated = express.Router().use(validateJwt, findAndAssignerUser);

const Auth = {
	login: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({where:{ email}});
			if (!user) {
				res.status(401).send("Usuario y/o contrasenia invalido");
			} else {
				const isMatch = await bcrypt.compare(password, user.password);
				if (isMatch) {
					const signed = signToken(user.id);
					res.status(200).json({signed});
				} else {
					res.status(401).send("Usuario y/o contrasenia invalido");
				}
			}
		} catch (e) {
			res.send(e.message);
		}
	},
	register: async (req, res) => {
        const {firstname, lastname, email, password} = req.body
		try {
			const isUser = await User.findOne({where:{ email }});
			if (isUser) {
				res.send("El usuario ya existe");
			} else {
				const salt = await bcrypt.genSalt();
				const hashed = await bcrypt.hash(password, salt);
				const user = await User.create({
                    firstname,
                    lastname,
					email,
					password: hashed,
					salt,
				});
				const signed = signToken(user.id);
				res.send(signed);
			}
		} catch (err) {
			res.status(500).send(err.message);
		}
	},
    accessWithGoggle: async (req, res )=>{
        const { jwtGoogle} = req.body
        async function verify() {
          const client = new OAuth2Client(process.env.ID_CLIENT_GOOGLE);
      
          const ticket = await client.verifyIdToken({
              idToken: jwtGoogle,
              audience: process.env.ID_CLIENT_GOOGLE,  // Specify the CLIENT_ID of the app that accesses the backend
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
            if(isUser.is_google != 1){
              res.json({code:0,message:'Ya existe un usuario/a registrado con ese email.'})
            }else{
              processLogin(isUser);
            }
          }
        }
        verify().catch(console.error);
      }
};

// const registerUser = async (req,res)=>{
//     const {firstname, lastname, email, password} = req.body
//     try {
//           const isUser = await User.findOne({where: {email}});
//       if(isUser === null){
//         const register = await User.create({firstname, lastname, email, password});
//         res.json({code:1, message: 'El usuario fue creado exitosamente'});
//       }else{
//         res.json({code:0,message:'Ya existe un usuario/a registrado con ese email.'})
//       }
//       } catch (e) {
//           console.log(e)
//       }
//   }
  
  
module.exports = {
	isAuthenticated,
	Auth,
	validateJwt
};
