// Nara.js
// @author Diego Valdes
// Started - Jan 26, 2018
// Completed - TBD
// Logic for class recomendation system


"use strict";

class Nara {

	/**********************************************************************************************
	*
	*/
	constructor(studentId){

		this.studentId = studentId; // student id
		this.MongoClient = require('mongodb').MongoClient; // Mongo client to connect
		this.url = "mongodb://localhost:27017/adviseMe"; // port and db 
		this.assert = require('assert'); // handle errors
	}

	/**********************************************************************************************
	*
	*/
	get studentId(){

		return this._studentId;
	}

	/**********************************************************************************************
	*
	*/
	set studentId(studentId) {

		this._studentId = studentId;
	}

	/**********************************************************************************************
	*
	*/
	getThatRec(callback){

		var sI = this.studentId; // assign id to var to be accessed inside Mongo call
		var assert = this.assert; // assign assert to hande errors inside Mongo call

		// Connect to db
		this.MongoClient.connect(this.url, function(err, db) {

			assert.equal(err, null);

			console.log("connected NaraV1");

			// find student
			db.collection('users').findOne({ studentID : sI}, function(err, doc){

				doc.course.forEach(function(element) {

					console.log(element.classID);
					console.log(element.grade);

				});

				callback(doc); // return the document
				
			});

			db.close(); // close db

		});

	}

}

module.exports = Nara; // export class

