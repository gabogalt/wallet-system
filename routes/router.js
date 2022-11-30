const express = require('express')
const { Home, Tables, Notifications} = require('../controllers/PageControllers')
const router = express.Router()

router.get('/', Home)
router.get('/tables', Tables)
router.get('/notifications', Notifications)

module.exports = {routes:router}