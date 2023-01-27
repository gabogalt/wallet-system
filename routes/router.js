const express = require('express')
const { Home, Tables,Profile,singUp, Login} = require('../controllers/PageControllers')
const {getAllUsers,registerUser,registerUserWithGoggle} = require('../controllers/Users')
const {Auth, isAuthenticated, validateJwt} = require('../controllers/auth')
const {apiHome} = require('../controllers/home')
const dotenv = require('dotenv')
const router = express.Router()
dotenv.config

router.get('/', Home)
router.get('/sign-up', singUp)
router.get('/tables', Tables)
router.get('/profile', Profile)
router.get('/login', Login)


// API 
router.get('/api/home', validateJwt, apiHome)
router.get('/api/get-users', getAllUsers)
router.post('/api/register-user', Auth.register)
router.post('/api/register-user-with-google',Auth.accessWithGoggle)
router.post('/api/login',Auth.login)
router.get('/api/get-google-client-id',(req,res)=>{
    console.log(process.env.ID_CLIENT_GOOGLE)
    const google = process.env.ID_CLIENT_GOOGLE
    res.send({googleIdClient:  google})
})
router.post('/api/register-account', (req,res)=>{
    console.log(req.body)
})
// router.post('api/login', proccessLogin )

module.exports = {routes:router}