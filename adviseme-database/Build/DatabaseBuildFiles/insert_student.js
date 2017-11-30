// insert.js
// @author Diego Valdes
// Nov. 16, 2016

// Insert randomly generated students

var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

let insertMany = []; // array to hold json 
let noOfStudents = 40; // Number of students to generate

insertMany.push(makeTyler()); // push Tyler to db

// Create students
for (var i = 0; i < noOfStudents; i++) {

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

	coursesArr = course(); // get random course work
	obj.status = status(coursesArr); // set status based on course work
	obj.course = coursesArr;

	// console.log(JSON.stringify(obj)); // log to console

	insertMany.push(obj); // add student to array
}

// get connection
MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	// pass the json object
	db.collection("users").insertMany(insertMany, function(err, res) {

		if (err) throw err;

	 	console.log("Inserted");
	 	db.close();
	});

});

/**************************************************************************************************
*	generate Tyler Hall
*/
function makeTyler() {

	let obj = new Object(); // object to store JSON data

	obj.firstName = "Tyler"; // get random first name
	obj.lastName = "Hall"; // get random last name
	obj.studentID = "tHall01"
	obj.major = major(); // get major

	obj.username = "tbhall";
	obj.email = "tbhall@email.sc.edu";
	obj.hash = "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa";

	coursesArr = course(); // get random course work
	obj.status = status(coursesArr); // set status based on course work
	obj.course = coursesArr;

	return obj;
}

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
		["CSCE145", "B+"],
		["CSCE190", "A"],
		["ENGL101", "B"],
		["MATH141", "B+"],
		// freshman 2 (10)
		["MATH142", "B"],
		["ENGL102", "A"],
		["CHEM111", "B"],
		["CHEM111L", "A"],
		["CSCE215", "A"], 
		["CSCE146", "A"],

		// Sophmore 1 (15)
		["CSCE211", "B+"],
		["CSCE240", "A"],
		["SPCH140", "B"],
		["CHEM112", "C"],
		["CHEM112L", "A"],

		// sophmore 2 (18)
		["MATH241", "B"],
		["CSCE212", "A"],
		["MATH374", "B+"],

		// junior 1 (length)
		["CSCE311", "A"],
		["CSCE350", "B"],
		["CSCE390", "A"], 
		["ENGL462", "A"]
	];

	let index = Math.floor(Math.random() * classes.length);

	let courses = [];

	for (let i = 0; i < index; i++) {

		var course = new Object();
		course.classID = classes[i][0];
		course.grade = classes[i][1];

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