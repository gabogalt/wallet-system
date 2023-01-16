const express = require('express')
const { Home, Tables, Notifications,Profile,singUp} = require('../controllers/PageControllers')
const {getAllUsers} = require('../controllers/Users')
const router = express.Router()

router.get('/', Home)
router.get('/sign-up', singUp)
router.get('/tables', Tables)
router.get('/notifications', Notifications)
router.get('/profile', Profile)


// API 
router.get('/api/get-users', getAllUsers)
router.post('/api/register-user', (req,res)=>{
    console.log(req.body)
})

module.exports = {routes:router}