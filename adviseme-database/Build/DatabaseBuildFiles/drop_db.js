// drop_db.js
// @author Diego Valdes
// Nov. 29, 2016


var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

var collections = ['users', 'classes', 'appointments'];

// Connect to db
MongoClient.connect(url, function(err, db) {

	if (!err) {
		db.dropDatabase(function(err, result) {
			console.log("Dropped db");
		});
		db.close();
	}
});