// insert.js
// @author Diego Valdes
// Nov. 16, 2016

// Insert randomly generated students

var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

var insertMany = []; // array to hold json
var noOfStudents = 40; // Number of students to generate
var advisedStudents = []; // array to hold student id to place in advisor doc

// push sample data: Tyler, student
var tyler = makeTyler();
insertMany.push(tyler); 
var student = makeStudent();
insertMany.push(student); 

// push Tyler and student id to array
advisedStudents.push(tyler.studentID); 
advisedStudents.push(student.studentID);

// Create students
for (let i = 0; i < noOfStudents; i++) {

	let obj = new Object(); // object to store JSON data
	let id = makeid(); // get random id
	let last = lastName(); // get random last name

	advisedStudents.push(id); // add student id to advisor array

	obj._id = id;
	obj.firstName = firstName(); // get random first name
	obj.lastName = last;
	obj.role = "student"
	obj.studentID = id;
	obj.university = "Univeristy of South Carolina";
	obj.major = major(); // get major
	obj.advisor = "advisor01"; // student advisor
	obj.advisorRoom = "331A"; // advisor room

	obj.username = last + id; // unique user login
	obj.email = "random.student@email.sc.edu";  // user email
	obj.hash = "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa"; // password 1234

	coursesArr = course(); // get random course work
	obj.status = status(coursesArr); // set status based on course work
	obj.course = coursesArr;

	//console.log(JSON.stringify(obj)); // log to console

	insertMany.push(obj); // add student to array
}

var advisor = makeAdvisor(); // create advisor
advisor.students = advisedStudents; // add array of student id

// push advisor and admin
insertMany.push(advisor); 
insertMany.push(makeAdmin());

// get connection
MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	// pass the json object
	db.collection("users").insertMany(insertMany, function(err, res) {

		if (err) throw err;

	 	console.log("Inserted " + insertMany.length + " users");
	 	db.close();
	});

});

/**************************************************************************************************
*	generate Tyler Hall
*/
function makeTyler() {

	let obj = new Object(); // object to store JSON data

	obj._id = "tHall01"; // object id
	obj.firstName = "Tyler"; // get random first name
	obj.lastName = "Hall"; // get random last name
	obj.role = "student";
	obj.studentID = "tHall01";
	obj.university = "Univeristy of South Carolina";
	obj.major = major(); // get major
	obj.advisor = "advisor01"; // student advisor
	obj.advisorRoom = "331A"; // advisor room

	obj.username = "tbhall";
	obj.email = "tbhall@email.sc.edu";
	obj.hash = "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa";

	coursesArr = course(); // get random course work
	obj.status = status(coursesArr); // set status based on course work
	obj.course = coursesArr;

	return obj;
}

/**************************************************************************************************
*	generate student
*/
function makeStudent() {

	let obj = new Object(); // object to store JSON data

	obj._id = "student01"; // object id
	obj.firstName = "Student"; // get random first name
	obj.lastName = "Student"; // get random last name
	obj.role = "student"
	obj.studentID = "student01";
	obj.university = "Univeristy of South Carolina";
	obj.major = major(); // get major
	obj.advisor = "advisor01"; // student advisor
	obj.advisorRoom = "331A"; // advisor room

	obj.username = "student";
	obj.email = "student@email.sc.edu";
	obj.hash = "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa";

	coursesArr = course(); // get random course work
	obj.status = status(coursesArr); // set status based on course work
	obj.course = coursesArr;

	return obj;
}

/**************************************************************************************************
*	generate advisor
*/
function makeAdvisor() {

	let obj = new Object(); // object to store JSON data

	obj._id = "advisor01" // make object id advisor id
	obj.firstName = "Steve"; // get random first name
	obj.lastName = "Rogers"; // get random last name
	obj.role = "advisor";
	obj.studentID = "advisor01";

	obj.username = "advisor";
	obj.email = "advisor@email.sc.edu";
	obj.hash = "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa";

	return obj;
}

/**************************************************************************************************
*	generate advisor
*/
function makeAdmin() {

	let obj = new Object(); // object to store JSON data

	obj._id = "admin01"; // object id
	obj.firstName = "Admin"; // get random first name
	obj.lastName = "Admin"; // get random last name
	obj.role = "admin";
	obj.studentID = "admin01";

	obj.username = "admin";
	obj.email = "admin@email.sc.edu";
	obj.hash = "$2a$10$AYYlKAk7SFPzIwHCBAV8gu8FDwv/.RgNYvbfzN.k.Mfxwl.wcl8Sa";

	return obj;
}

/**************************************************************************************************
*	generate random id
*/
function makeid() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
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

	// CS course work
	let classes = [
		// freshman 1 (5)
		["CSCE145", "B+"],
		["CSCE190", "A"],
		["ENGL101", "B"],
		["MATH141", "B+"],
		["CORE001", "B"],
		// freshman 2 (11)
		["MATH142", "B"],
		["ENGL102", "A"],
		["CHEM111", "B"],
		["CHEM111L", "A"],
		["CSCE215", "A"],
		["CSCE146", "A"],

		// Sophmore 1 (17)
		["CSCE211", "B+"],
		["CSCE240", "A"],
		["MATH374", "B+"],
		["SPCH140", "B"],
		["CHEM112", "C"],
		["CHEM112L", "A"],
		// sophmore 2 (22)
		["MATH241", "B"],
		["CSCE212", "A"],
		["SCIE001", "B"],
		["CORE002", "B"],
		["CORE003", "B"],
		
		// junior 1 (28)
		["CSCE311", "A"],
		["CSCE330", "A"],
		["CSCE350", "B"],
		["CSCE390", "A"],
		["ENGL462", "A"],
		["AREA001", "B"],
		// junior 2 (34)
		["CSCE416", "A"],
		["STAT509", "B+"],
		["CSCE311", "A"],
		["LIBE001", "B"],
		["LIBE002", "C"],
		["AREA002", "B"],

		// senior 1 (40)
		["CSCE490", "A"],
		["CSCE355", "C+"],
		["CSEL001", "B+"],
		["MATH344", "A"],
		["MATH344L", "A"],
		["AREA003", "B"],
		// senior 2 (length)
		["CSCE492", "A"],
		["CSEL002", "B+"],
		["CSEL003", "B+"],
		["LIBE003", "B"]

	];

	let index = Math.floor(Math.random() * classes.length); // random number

	let courses = [];

	for (let i = 0; i < classes.length; i++) {

		var course = new Object();

		if ( i < index ) { // completed student course work

			course.classID = classes[i][0];
			course.grade = classes[i][1];

			courses.push(course);
			//console.log(JSON.stringify(course));
		} else if ( i >= index && i < index+5 ) { // enrolled course work

			course.classID = classes[i][0];
			course.grade = 'enrolled';

			courses.push(course);

		} else { // to be completed course work

			course.classID = classes[i][0];
			course.grade = 'tbc';

			courses.push(course);

		}

	}

	return courses;
}

/**************************************************************************************************
*	generate status based on course work
*/
function status(coursesArray) {

	let status = ["freshman", "sophmore", "junior", "senior"];
	let check = coursesArray.length;

	for (let i = 0; i < coursesArray.length; i++ ){

		if (coursesArray[i].grade == 'tbc') check--;
	}

	if (check < 12) { // freshman
		return status[0];
	} else if (check < 23) { // sophmores
		return status[1];
	} else if (check < 35) { // junior
		return status[2];
	} else { // senior
		return status[3];
	}

}
