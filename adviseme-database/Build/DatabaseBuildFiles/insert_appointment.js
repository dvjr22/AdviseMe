// insert_appointment.js
// @author Diego Valdes
// Nov. 29, 2016



var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

// create one test appointment record
let obj = new Object();
obj.studentID = "tHall01";
obj.firstName = "Tyler";
obj.lastName = "Hall";
obj.major = "cs";
obj.status = "senior";
obj.advisor = "advisor01";
obj.roomNumber = "211A";
obj.date = "2018-04-18T12:00:00"

// Connect to db
MongoClient.connect(url, function(err, db) {

	if (!err) {
		console.log("connected");

		db.collection("appointments").insertOne(obj, function(err, res) {
		 	console.log("Inserted");
		 	db.close();
		});
	}

});