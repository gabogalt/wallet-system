const express = require("express");


const app = express();

// middelwares for req.body
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.status(200).send("Estas en la raiz");
});


// undefined routes
app.get("*", (req, res) => {
	res.status(404).send("Esta página no existe :(");
});

//port
app.listen(3000, () => {
	console.log("Your application is running");
});
