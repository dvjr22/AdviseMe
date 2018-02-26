// NaraV2.js
// @author Diego Valdes
// Started - Feb 14, 2018
// Completed - TBD
// Logic for class recomendation system - use query to get recommendations

"use strict";
//db.users.findOne( { studentID: 'tHall01'}, {_id : 0, course : 1} )

class NaraV3 {

	/**********************************************************************************************
	*
	*/
	getThatRec(studentId, callback){

		var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
		var url = "mongodb://localhost:27017/adviseMe";	// port and db 
		var assert = require('assert'); // handle errors

		var classes = []; // array of class ids 
		var recomendation = 0;

		// connect to db
		MongoClient.connect(url, function(err, db) {

			assert.equal(err, null); // error check

			console.log("connected NaraV3");

			// find student
			db.collection('users').findOne( { studentID: studentId}, {_id : 0, course : 1}, function(err, doc) {

				doc.course.forEach(function(element) {

					//console.log(element.classID);
					//console.log(element.grade);

					if (element.grade == 'tbc' && recomendation < 5){
						console.log(element.classID);
						classes.push(element.classID);
						recomendation++;
					}

					//classes.push(element.classID);
				});

				//callback(doc); // return the document
				callback(classes); // return test array

			});

			db.close(); // close db

		});

	}


}

module.exports = NaraV3; // export class




