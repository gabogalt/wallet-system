const express = require("express");
const path = require('path')
const dotenv = require('dotenv')
const expressLayouts = require('express-ejs-layouts')
const {connection} = require('./config/database')

const app = express();

// dotenv 
dotenv.config()

// Database connection
connection.connect(function(err) {
	if (err) throw err;
	console.log('susccesful conection with database.')
  });
  
// views 
app.set('view engine', 'ejs')
app.use(expressLayouts)

// middelwares 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// routes
const router = require('./routes/router');
app.use(router.routes)

// undefined routes
app.get("*", (req, res) => {
	res.status(404).send("Esta página no existe :(");
});

//port
app.listen(3000, () => {
	console.log("Your application is running");
});
