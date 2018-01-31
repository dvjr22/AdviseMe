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
		var assert = require('assert');


		var classes = []; // array of class ids to query and create graph

		MongoClient.connect(url, function(err, db) {

			assert.equal(err, null); // error check



			console.log("connected NaraV2");

			db.collection('users').findOne({ studentID : studentId }, function(err, doc){

				doc.course.forEach(function(element) {

					console.log(element.classID);
					console.log(element.grade);

					classes.push(element.classID);

				});

				//callback(doc); // return the document
				callback(classes); // return test array

			});

		});

	}


	getClassList() {

		db.collection('classes').findOne( { '_id' : 'CSCE145' }, function(err, doc) {

			console.log(doc);

		});


		db.close();

	}

}

module.exports = NaraV2; //this class is exportable


