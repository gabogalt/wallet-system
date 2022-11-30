const express = require("express");
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const app = express();

// views 
app.set('view engine', 'ejs')
app.use(expressLayouts)

// middelwares 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// routes

const router = require('./routes/router');
app.use(router.routes)
// app.get("/", (req, res) => {
// 	res.status(200).send("Estas en la raiz");
// });


// undefined routes
app.get("*", (req, res) => {
	res.status(404).send("Esta página no existe :(");
});

//port
app.listen(3000, () => {
	console.log("Your application is running");
});
