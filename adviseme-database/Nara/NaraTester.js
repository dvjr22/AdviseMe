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
const Nara = require('/home/diego/Nara.js');
let nara = new Nara("A1234");
//log(nara.studentId);
let results_1 = nara.getThatRec();
iterate(results_1);


//Test v2
const NaraV2 = require('/home/diego/NaraV2.js');
let narav2 = new NaraV2();
let results_2 = narav2.getThatRec("A5678");
iterate(results_2);
