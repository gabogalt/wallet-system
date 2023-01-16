const express = require("express");
const path = require('path')
const dotenv = require('dotenv')
const {connection} = require('./config/database')
const router = require('./routes/router');


const app = express();

// dotenv 
dotenv.config()

// Database connection
connection()
  
// views 
app.set('view engine', 'ejs')

// middelwares 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use(router.routes)

// undefined routes
app.get("*", (req, res) => {
	res.status(404).send("Esta página no existe :(");
});

//port
app.listen(3000, () => {
	console.log("Your application is running");
});
