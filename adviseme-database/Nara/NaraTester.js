// NaraTester.js
// @author Diego Valdes
// Jan 26, 2018
// Testing for logic operations

"use strict";

function log(statement) {
	console.log(statement);
}

function iterate(list) {
	list.forEach( function(recomendation) {
	log(recomendation);
});
}


//Test v1
log("test 1")
//const Nara = require('/home/diego/Nara.js'); 
const Nara = require('/home/valdeslab/SeniorYear/AdviseMe/AdviseMe/adviseme-database/Nara/Nara.js');
let nara = new Nara("tHall01");
nara.getThatRec(function(returnValue) {
	log(returnValue);
});



//Test v2
log("test 2")
//const NaraV2 = require('/home/diego/NaraV2.js');
const NaraV2 = require('/home/valdeslab/SeniorYear/AdviseMe/AdviseMe/adviseme-database/Nara/NaraV2.js');
let narav2 = new NaraV2();
narav2.getThatRec("tHall01", function(returnValue) {
	log(returnValue);
});

