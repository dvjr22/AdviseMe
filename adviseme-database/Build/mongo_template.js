// fileName.js
// @author Diego Valdes
// Nov. 16, 2016



var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

// Connect to db
MongoClient.connect(url, function(err, db) {

	if (!err) {
		console.log("connected");

		// Stuff to do goes in here

	}

	db.close();

});

/**************************************************************************************************
INSERT DATA EXAMPLES

	// Insert many example
	// varCollectionName - String value of the collection to insert record
	// insertMany - array of obj in json format
	db.collection(varCollectionName).insertMany(insertMany, function(err, res) {
	 	console.log("Inserted");
	 	db.close();
	});

	// Insert one
	// varCollectionName - String value of the collection to insert record
	// obj - an obj in json format
	db.collection(varCollectionName).insertOne(obj, function(err, res) {
	 	console.log("Inserted");
	 	db.close();
	});
*/

/**************************************************************************************************
CREATE JSON RECORD EXAMPLE

	// Create object to store data in json format
	var obj = new Object();
	obj.fieldName = dataToAdd; // add fields and data

	SEE BELOW EXAMPLE:

	var obj = new Object(); // object to store JSON data
	var id = makeid(); // get random id
	var last = lastName(); // get random last name

	obj.firstName = firstName(); // get random first name
	obj.lastName = last; 
	obj.studentID = id;
	obj.major = major(); // get major

	obj.username = last + id; // unique user login
	obj.email = "random.student@email.sc.edu";  // user email
	obj.hash = "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa"; // password 1234

	coursesArr = course(); // get random course work, an array of obj
	obj.status = status(coursesArr); // set status based on course work
	obj.course = coursesArr;

	WILL PRODUCE JSON:

{
	"_id" : ObjectId("5a1eb194c2871e43c1e2a69e"),
	"firstName" : "Casey",
	"lastName" : "Gordon",
	"sid" : "HtOWw",
	"major" : "cs",
	"username" : "GordonHtOWw",
	"email" : "random.student@email.sc.edu",
	"hash" : "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa",
	"status" : "freshman",
	"course" : [
		{
			"prefix" : "CSCE",
			"coNum" : 145,
			"grade" : "B+"
		},
		{
			"prefix" : "CSCE",
			"coNum" : 190,
			"grade" : "A"
		},
		{
			"prefix" : "ENGL",
			"coNum" : 101,
			"grade" : "B"
		},
		{
			"prefix" : "MATH",
			"coNum" : 141,
			"grade" : "B+"
		},
		{
			"prefix" : "MATH",
			"coNum" : 142,
			"grade" : "B"
		},
		{
			"prefix" : "ENGL",
			"coNum" : 102,
			"grade" : "A"
		}
	]
}

*/