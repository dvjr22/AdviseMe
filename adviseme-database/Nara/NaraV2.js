// NaraV2.js
// @author Diego Valdes
// Started - Jan 26, 2018
// Completed - TBD
// Logic for class recomendation system


"use strict";

class NaraV2 {

	getThatRec(studentId){

		var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
		var url = "mongodb://localhost:27017/adviseMe";	

		//get the results here

		MongoClient.connect(url, function(err, db) {

		if (!err) {
			console.log("connected NaraV2");

			// Stuff to do goes in here

			var query = { studentID : studentId }; //{ studentID : 'tHall01'}

			db.collection('users').findOne({ studentID : studentId }, function(err, doc){

				var test = doc;
				console.log(doc);

			});

			db.close();
		} 

		});

		var results = ["CSCE240", "CSCE210", "MATH374"];

		return results;

	}

}

module.exports = NaraV2; //this class is exportable


