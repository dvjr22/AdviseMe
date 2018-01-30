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
	}

	get studentId(){
		//this.log(this.url)
		return this._studentId;
	}

	set studentId(studentId) {
		this._studentId = studentId;
	}

	getThatRec(){
		
		this.log("getting that recomendation for " + this.studentId);

		//get the results here

		var results = ["CSCE145", "CSCE146", "MATH141"];

		return results;
	}

	log(statement) {
		console.log(statement);
	}

}

module.exports = Nara;




//console.log(doWorkNara("A1234"));