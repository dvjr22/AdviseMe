// insert.js
// @author Diego Valdes
// Nov. 16, 2016

var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name


var obj = new Object();

obj._id = "V123456789";
obj.firstName = "Diego";
obj.lastName = "Valdes";
obj.sid = "V123456789";

var course = new Object();
course.prefix = "CSCE";
course.coNum = 145;
course.grade = "A";

var course2 = new Object();
course2.prefix = "CSCE";
course2.coNum = 146;
course2.grade = "B";

classes = [course, course2];
obj.classes = classes;







var jsonString = JSON.stringify(obj);

console.log(jsonString);

MongoClient.connect(url, function(err, db) {

	if (err) throw err;



	
	/* Testing if this works.
	var student = { firstName: "Diego", lastName: "Valdes", sid: "V123456789"};

	db.collection("users").insertOne(student, function(err, res) {

		if (err) throw err;

		 console.log("Inserted");
		 db.close();

	});

	*/

	// pass the json object
	db.collection("users").insertOne(obj, function(err, res) {

		if (err) throw err;

	 	console.log("Inserted");
	 	db.close();

	});

});