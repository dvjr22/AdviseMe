// insert.js
// @author Diego Valdes
// Nov. 16, 2016

var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

var obj = new Object(); // object to store JSON data
id = makeid(); // get random id

// set student data
obj._id = id;
obj.firstName = firstName(); // get random first name
obj.lastName = lastName(); // get random last name
obj.sid = id;
obj.major = major(); // get major

coursesArr = course(); // get random course work
obj.status = status(coursesArr); // set status based on course work
obj.course = coursesArr;

console.log(JSON.stringify(obj)); // log to console

// get connection
MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	// pass the json object
	db.collection("users").insertOne(obj, function(err, res) {

		if (err) throw err;

	 	console.log("Inserted");
	 	db.close();
	});

});

/**************************************************************************************************
*	generate random id
*/
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/**************************************************************************************************
*	generate random last name
*/
function lastName() {

	let last = ["Parker", "Wayne", "Stevens", "Cooper", "Thomas", "Smith", "Peterson", "Brady", "Rogers", 
		"Jordan", "Ewing", "Starks", "King", "Washington", "Cain", "Grayson", "Prince", "Gonzalez",
		"Gordon", "Jameson", "Holmes", "Cole", "Summers", "Connors", "Kent", "Morales"];

		return last[Math.floor(Math.random() * last.length)];
}

/**************************************************************************************************
*	generate random first name
*/
function firstName() {

	let first = ["Bill", "Ted", "Peter", "Thomas", "Bruce", "Samuel", "Kevin", "Tyler", "Evan", "Ethan", 
		"Jean", "Cassandra", "Gwen", "Angelica", "Barbara", "Stacey", "Nikki", "August", "April", 
		"Ann", "Nick", "Patricia", "Mary Jane", "Kitty", "Casey", "Caleb", "Clark", "Bruce"];

		return first[Math.floor(Math.random() * first.length)];
}

/**************************************************************************************************
*	generate random major
*/
function major() {

	let majorArray = ["cs", "ce"];

	return majorArray[0];
}

/**************************************************************************************************
*	generate course work
*/
function course() {

	let classes = [
		// freshman 1 (4)
		["CSCE", 145, "B+"],
		["CSCE", 190, "A"],
		["ENGL", 101, "B"],
		["MATH", 141, "B+"],
		// freshman 2 (10)
		["MATH", 142, "B"],
		["ENGL", 102, "A"],
		["CHEM", 111, "B"],
		["CHEM", "111L", "A"],
		["CSCE", 215, "A"], 
		["CSCE", 146, "A"],

		// Sophmore 1 (15)
		["CSCE", 211, "B+"],
		["CSCE", 240, "A"],
		["SPCH", 140, "B"],
		["CHEM", 112, "C"],
		["CHEM", "112L", "A"],
		

		// sophmore 2 (18)
		["MATH", 241, "B"],
		["CSCE", 212, "A"],
		["MATH", 374, "B+"],

		// junior 1 (length)
		["CSCE", 311, "A"],
		["CSCE", 350, "B"],
		["CSCE", 390, "A"], 
		["ENGL", 462, "A"]
	];

	let index = Math.floor(Math.random() * classes.length);

	let courses = [];

	for (let i = 0; i < index; i++) {

		var course = new Object();
		course.prefix = classes[i][0];
		course.coNum = classes[i][1];
		course.grade = classes[i][2];

		courses.push(course);
		//console.log(JSON.stringify(course));
	}

	return courses;
}

/**************************************************************************************************
*	generate status based on course work
*/
function status(coursesArray) {

	let status = ["freshman", "sophmore", "junior", "senior"];
	let check = coursesArray.length;

	if (check < 15) {
		return status[0];
	} else if (check < 18) {
		return status[1];
	} else {
		return status[2];
	}

}