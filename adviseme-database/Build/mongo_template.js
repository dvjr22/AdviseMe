// mongo connectins test

//var MongoClient = require('mongodb').MongoClient;
var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name



// Connect and create collections
MongoClient.connect(url, function(err, db) {

	if (!err) {
		console.log("connected");
	}


	// Stuff to do goes in here

	db.close();

});