// Add connections
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Body-parser is middleware, they help to tidy up the request object before we use them
//Express lets us use middleware with the use method
// app.use(bodyParser.urlencoded({ extended: true }));

//handle the get request with the get method
//app.get(endpoint,callback)
//endpoint is /
//callback tells the server what to do when the requested endpoint matches the endpoint stated and takes two objects: request and response
// app.get("/", (req, res) => {
// 	//__dirname is the current directory you're in
// 	res.sendFile(__dirname + "/index.html");
// });
//serve up an index.html page back to the browser using sendFile method provided by the res object

//CREATE
//Send a POST request through a form
// app.post("/quotes", (req, res) => {
// 	console.log(req.body);
// });

// -------------------------------
// Link to Database
// -------------------------------

//CONNECT TO MONGODB
const MongoClient = require("mongodb").MongoClient;

// Updates environment variables
require("dotenv").config();

// Replace process.env.DB_URL with actual connection string
const connectionString = process.env.DB_URL;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
	.then((client) => {
		console.log("Connected to Database");
		const db = client.db("poll");
		const optionsCollection = db.collection("options");

		// -------------------------------
		// Middlewares
		// -------------------------------
		// Tell express we're using ejs as the template engine
		app.set("view engine", "ejs");
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(express.static("public"));

		// -------------------------------
		// Routes
		// -------------------------------
		// CREATE
		app.get("/", (req, res) => {
			db.collection("options")
				.find()
				.toArray()
				.then((results) => {
					res.render("index.ejs", { options: results });
				})
				.catch((error) => console.error(error));
		});

		// READ
		app.post("/options", (req, res) => {
			console.log(req.body);
			optionsCollection
				.insertOne(req.body)
				.then((result) => {
					res.redirect("/");
				})
				.catch((error) => console.error(error));
		});

		// UPDATE
		app.put("/poll", (req, res) => {});

		// DELETE
		app.delete("/poll", (req, res) => {});

		// -------------------------------
		// Listen
		// -------------------------------
		const isProduction = process.env.NODE_ENV === "production";
		const port = isProduction ? 7500 : 3000;
		app.listen(port, function () {
			console.log(`Server is running on http://localhost:${port}`);
		});
	})
	.catch((error) => console.error(error));
