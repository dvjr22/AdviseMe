// mongo connectins test

//var MongoClient = require('mongodb').MongoClient;
var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
var url = "mongodb://localhost:27017/adviseMe";		// Database name

insertMany = [
	engl101(),
	engl102(),
	math141(),
	math142(),
	math374(),
	csce145(),
	csce146(),
	csce190(),
	csce215(),
	chem111(),
	chem111L(),
	chem112(),
	chem112L(),
	csce240()
];

// Connect to db
MongoClient.connect(url, function(err, db) {

	if (!err) {
		console.log("connected");
	}

	// pass the json object
	db.collection("classes").insertMany(insertMany, function(err, res) {

		if (err) throw err;

	 	console.log("Inserted");
	 	db.close();
	});

	db.close();

});

function engl101() {

	let obj = new Object(); // object to store JSON data
	obj._id = "ENGL101";
	let course = new Object(); // doc for class
	course.prefix = "ENGL";
	course.coureNo = 101;
	course.title = "Critical Reading and Composition";
	obj.class = course;
	obj.requiredFor = ["ENGL102", "ENGL462", "ENGL463"];
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function engl102() {

	let obj = new Object(); // object to store JSON data
	obj._id = "ENGL102";
	let course = new Object(); // doc for class
	course.prefix = "ENGL";
	course.coureNo = 102;
	course.title = "Rhetoric and Composition";
	obj.class = course;
	obj.prerequisites = ["ENG101"]; 
	obj.requiredFor = ["ENGL102", "ENGL462", "ENGL463"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function math141() {

	let obj = new Object(); // object to store JSON data
	obj._id = "MATH141";
	let course = new Object(); // doc for class
	course.prefix = "MATH";
	course.coureNo = 141;
	course.title = "Calculus I";
	obj.class = course;
	obj.prerequisites = ["MATH112", "MATH115", "MATH116"]; 
	obj.requiredFor = ["CSCE146", "CSCE211", "CHEM112"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function math142() {

	let obj = new Object(); // object to store JSON data
	obj._id = "MATH142";
	let course = new Object(); // doc for class
	course.prefix = "MATH";
	course.coureNo = 142;
	course.title = "Calculus II";
	obj.class = course;
	obj.prerequisites = ["MATH141"]; 
	obj.requiredFor = ["MATH241", "STAT509", "MATH344"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function math374() {

	let obj = new Object(); // object to store JSON data
	obj._id = "MATH374";
	let course = new Object(); // doc for class
	course.prefix = "MATH";
	course.coureNo = 374;
	course.title = "Discrete Sturctures";
	obj.class = course;
	obj.prerequisites = ["MATH142", "CSCE146"]; 
	obj.requiredFor = ["CSCE330", "CSCE350"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function csce145() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CSCE145";
	let course = new Object(); // doc for class
	course.prefix = "CSCE";
	course.coureNo = 145;
	course.title = "Algorithmic Design I";
	obj.class = course;
	obj.prerequisites = ["MATH111", "MATH115"];
	obj.requiredFor = ["CSCE146", "CSCE190", "CSCE215", "CSCE212"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function csce146() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CSCE146";
	let course = new Object(); // doc for class
	course.prefix = "CSCE";
	course.coureNo = 146;
	course.title = "Algorithmic Design II";
	obj.class = course;
	obj.prerequisites = ["CSCE145", "MATH141"];
	obj.requiredFor = ["CSCE240", "MATH374", "CSCE416"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function csce190() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CSCE190";
	let course = new Object(); // doc for class
	course.prefix = "CSCE";
	course.coureNo = 190;
	course.title = "Computing in the Modern World";
	obj.class = course;
	obj.prerequisites = ["CSCE145", "CSCE204", "CSCE205", "CSCE206"];
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function csce215() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CSCE215";
	let course = new Object(); // doc for class
	course.prefix = "CSCE";
	course.coureNo = 215;
	course.title = "UNIX/Linux Fundamentals";
	obj.class = course;
	obj.prerequisites = ["CSCE145"];
	obj.requiredFor = ["CSCE240"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function chem111() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CHEM111";
	let course = new Object(); // doc for class
	course.prefix = "CHEM";
	course.coureNo = 111;
	course.title = "General Chemistry I";
	obj.class = course;
	obj.prerequisites = ["MATH141", "MATH115", "MATH111", "MATH122"];
	obj.requiredFor = ["CHEM112"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function chem111L() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CHEM111L";
	let course = new Object(); // doc for class
	course.prefix = "CHEM";
	course.coureNo = "111L";
	course.title = "General Chemistry I Lab";
	obj.class = course;
	obj.prerequisites = ["MATH141", "MATH115", "MATH111", "MATH122"];
	obj.requiredFor = ["CHEM112L"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function chem112() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CHEM112";
	let course = new Object(); // doc for class
	course.prefix = "CHEM";
	course.coureNo = 112;
	course.title = "General Chemistry II";
	obj.class = course;
	obj.prerequisites = ["CHEM112", "MATH141", "MATH115", "MATH111", "MATH122"];
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function chem112L() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CHEM112L";
	let course = new Object(); // doc for class
	course.prefix = "CHEM";
	course.coureNo = "112L";
	course.title = "General Chemistry II Lab";
	obj.class = course;
	obj.prerequisites = ["CHEM112L", "MATH141", "MATH115", "MATH111", "MATH122"];
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}

function csce240() {

	let obj = new Object(); // object to store JSON data
	obj._id = "CSCE240";
	let course = new Object(); // doc for class
	course.prefix = "CSCE";
	course.coureNo = 240;
	course.title = "Introduction to Software Engineering";
	obj.class = course;
	obj.prerequisites = ["CSCE146", "CSCE215"];
	obj.requiredFor = ["CSCE311", "CSCE330", "CSCE350"]; // classes this class is a prereq for
	obj.department = "cs";
	obj.curriculum = ["cs", "ce"];

	return obj;
}