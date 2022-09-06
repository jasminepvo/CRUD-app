//test if node is running properly
console.log("May Node be with You");

//this is how we use express by requiring express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//create a server that browsers can connect to using listen method
app.listen(3000, function () {
	console.log("listening on 3000");
});

//Body-parser is middleware, they help to tidy up the request object before we use them
//Express lets us use middleware with the use method
app.use(bodyParser.urlencoded({ extended: true }));

//handle the get request with the get method
//app.get(endpoint,callback)
//endpoint is /
//callback tells the server what to do when the requested endpoint matches the endpoint stated and takes two objects: request and response
app.get("/", (req, res) => {
	//__dirname is the current directory you're in
	res.sendFile(__dirname + "/index.html");
});
//serve up an index.html page back to the browser using sendFile method provided by the res object

//CREATE
//Send a POST request through a form
// app.post("/quotes", (req, res) => {
// 	console.log(req.body);
// });

//CONNECT TO MONGODB
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
	"mongodb+srv://yoda:starwars1@cluster0.n5aqihu.mongodb.net/?retryWrites=true&w=majority",
	{ useUnifiedTopology: true }
)
	.then((client) => {
		console.log("Connected to Database");
		const db = client.db("star-wars-quotes");
		const quotesCollection = db.collection("quotes");
		app.use(bodyParser.urlencoded({ extended: true }));
		app.get("/", (req, res) => {
			//__dirname is the current directory you're in
			// res.sendFile(__dirname + "/index.html");
			db.collection("quotes")
				.find()
				.toArray()
				.then((results) => {
					console.log(results);
				})
				.catch((error) => console.error(error));
		});
		app.post("/quotes", (req, res) => {
			quotesCollection
				.insertOne(req.body)
				.then((result) => {
					res.redirect("/");
				})
				.catch((error) => console.error(error));
		});
		app.listen();
	})
	.catch((error) => console.error(error));
