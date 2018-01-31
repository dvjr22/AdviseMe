// Nara.js
// @author Diego Valdes
// Started - Jan 26, 2018
// Completed - TBD
// Logic for class recomendation system


"use strict";

class Nara {

	constructor(studentId){
		this.studentId = studentId;
		//this.MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
		this.url = "mongodb://localhost:27017/adviseMe";	

		this.MongoClient = require('mongodb').MongoClient;
		//this.assert = require('assert');
	}

	get studentId(){
		//this.log(this.url)
		return this._studentId;
	}

	set studentId(studentId) {
		this._studentId = studentId;
	}

	getThatRec(){
		
		//get the results here

		// Connect to db
		this.MongoClient.connect(this.url, function(err, db) {

			if (!err) {
				console.log("connected");

				// Stuff to do goes in here

				db.collection('users').findOne({ studentID : 'tHall01'}, function(err, doc){
					console.log(doc);
				});

			}

			db.close();

		});

		var results = ["CSCE145", "CSCE146", "MATH141"];

		return results;
	}

}

module.exports = Nara;

