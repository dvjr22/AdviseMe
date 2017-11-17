// fileName.js
// @author Diego Valdes
// Nov. 16, 2016

//var MongoClient = require('mongodb').MongoClient;
var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name



// Connect to db
MongoClient.connect(url, function(err, db) {

	if (!err) {
		console.log("connected");
	}


	// Stuff to do goes in here

	db.close();

});