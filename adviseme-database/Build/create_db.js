// connection.js
// @author Diego Valdes
// Nov. 16, 2016

// To run this
/* To run ensure:
	1. mongodb is installed
	2. link npm to the folder this file is in using: npm link mongodb

*/


var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name
var collections = ["users", "classes"];


// Connect and create collections
MongoClient.connect(url, function(err, db) {

	if (err) throw err;

    console.log("Database created!");

    db.createCollection(collections[0], function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    db.createCollection(collections[1], function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

});

