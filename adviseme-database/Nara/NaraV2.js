// NaraV2.js
// @author Diego Valdes
// Started - Jan 26, 2018
// Completed - TBD
// Logic for class recomendation system


"use strict";

class NaraV2 {

	getThatRec(studentId){

		//var MongoClient = require('mongodb').MongoClient;	// Mongo client to connect
		var url = "mongodb://localhost:27017/adviseMe";	

		this.log("getting that recomendation for " + studentId);

		//get the results here

		var results = ["CSCE240", "CSCE210", "MATH374"];

		return results;
	}

	log(statement) {
		console.log(statement);
	}

}

module.exports = NaraV2; //this class is exportable


