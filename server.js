// Add connections
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use("/public", express.static("public"));

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
		const selectionsCollection = db.collection("selections");

		// -------------------------------
		// Middlewares
		// -------------------------------
		// Tell Express we're using ejs as the template engine
		app.set("view engine", "ejs");
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(express.static("public"));

		// -------------------------------
		// Routes
		// -------------------------------
		// CREATE: make form to create poll options + send to db
		app.post("/options", (req, res) => {
			optionsCollection
				.insertOne(req.body)
				.then((result) => {
					res.redirect("/");
				})
				.catch((error) => console.error(error));
		});

		// READ: get poll options results from db + show using ejs
		app.get("/", (req, res) => {
			db.collection("options")
				.find()
				.toArray()
				.then((results) => {
					res.render("index.ejs", { options: results });
				})
				.catch((error) => console.error(error));
		});

		// CREATE: make form for selection input + send to db
		app.post("/selections", (req, res) => {
			selectionsCollection
				.insertOne(req.body)
				.then((result) => {
					res.redirect("/");
				})
				.catch((error) => console.error(error));
		});

		// READ: get poll results from db
		app.get("/", (req, res) => {
			db.collection("selections")
				.find()
				.toArray()
				.then((results) => {
					res.render("index.ejs", { selections: results });
				})
				.catch((error) => console.error(error));
		});

		// UPDATE
		app.put("/options", (req, res) => {});

		// DELETE
		app.delete("/options", (req, res) => {
			optionsCollection
				.findOneAndDelete({ _id: req.body })
				.then((result) => {
					console.log("Deleted option from poll choices");
				})
				.catch((error) => console.error(error));
		});

		// -------------------------------
		// Listen
		// -------------------------------
		const isProduction = process.env.NODE_ENV === "production";
		const PORT = isProduction ? 7500 : 3000;
		app.listen(PORT, function () {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => console.error(error));
