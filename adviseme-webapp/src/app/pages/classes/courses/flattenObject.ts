declare var require: any

export function flattenObject(ob) {

  var flatten = require('flattenObject');
  var newOb = []

  //console.log(ob.length);

  for (var i = 0; i < ob.length; i++) {
    var temp = ob[i]
    newOb.push(flatten(temp, 2, ""));
  }

  return newOb;
}

//module.exports = { flattenObject: flattenObject }
