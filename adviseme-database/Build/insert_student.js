// insert.js
// @author Diego Valdes
// Nov. 16, 2016

var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

var obj = new Object();
id = makeid();

obj._id = id;
obj.firstName = firstName();
obj.lastName = lastName();
obj.sid = id;

var course = new Object();
course.prefix = "CSCE";
course.coNum = 145;
course.grade = "A";

var course2 = new Object();
course2.prefix = "CSCE";
course2.coNum = 146;
course2.grade = "B";

var major = ["CS"];

obj.major = major;


classes = [course, course2];
obj.classes = classes;

console.log(JSON.stringify(obj));

MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	// pass the json object
	db.collection("users").insertOne(obj, function(err, res) {

		if (err) throw err;

	 	console.log("Inserted");
	 	db.close();
	});

});

/*
*	generate random id
*/
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/*
*	generate random last name
*/
function lastName() {

	last = ["Parker", "Wayne", "Stevens", "Cooper", "Thomas", "Smith", "Peterson", "Brady", "Rogers", 
		"Jordan", "Ewing", "Starks", "King", "Washington", "Cain", "Grayson", "Prince", "Gonzalez",
		"Gordon", "Jameson", "Holmes", "Cole", "Summers", "Connors", "Kent", "Morales"]

		return last[Math.random() * (last.length - 0) + 0];
}

/*
*	generate random first name
*/
function firstName() {

	first = ["Bill", "Ted", "Peter", "Thomas", "Bruce", "Samuel", "Kevin", "Tyler", "Evan", "Ethan", 
		"Jean", "Cassandra", "Gwen", "Angelica", "Barbara", "Stacey", "Nikki", "August", "April", 
		"Ann", "Nick", "Patricia", "Mary Jane", "Kitty", "Casey", "Caleb", "Clark", "Bruce"]

		return first[Math.random() * (first.length - 0) + 0];
}

/*
*	generate random major
*/
function major() {

	major = ["cs", "ce"];
}


function course() {

	course = {};
}
