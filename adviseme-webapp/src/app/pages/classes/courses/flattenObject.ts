/* Written by Ethan Harmon **/

/**
  Var for requirement
*/
declare var require: any

/**
  This script flattens json objects, and delimits them in
  a manner that is accepted by ng2-smart-table. Requires the
  npm package 'flat'.

  @param {object} ob
  @returns {object}
*/
export function flattenObject(ob) {

  var flatten = require('flat');
  var newOb = []

  for (var i = 0; i < ob.length; i++) {
    newOb.push(flatten(ob[i], { delimiter: '_' }, { maxDepth: 2 }));
  }

  return newOb;
}
