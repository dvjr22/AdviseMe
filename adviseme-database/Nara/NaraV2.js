// NaraV2.js
// @author Diego Valdes
// Started - Jan 26, 2018
// Completed - TBD
// Logic for class recomendation system


"use strict";

class NaraV2 {

	getThatRec(studentId, callback){

		var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
		var url = "mongodb://localhost:27017/adviseMe";	

		MongoClient.connect(url, function(err, db) {

			if (!err) {

				console.log("connected NaraV2");

				db.collection('users').findOne({ studentID : studentId }, function(err, doc){

					callback(doc); // return the document

				});

				db.close();
			} 

		});

	}

}

module.exports = NaraV2; //this class is exportable


