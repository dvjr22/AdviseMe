/* Written by Ethan Harmon **/

/**
  Var for requirement
*/
declare var require: any;

/**
  This script flattens json objects, and delimits them in
  a manner that is accepted by ng2-smart-table. Requires the
  npm package 'flat'.

  @param {object} ob
  @returns {object}
*/
export function flattenObject(ob) {

  const flatten = require('flat');
  const newOb = [];

  for (let i = 0; i < ob.length; i++) {
    newOb.push(flatten(ob[i], { delimiter: '_' }, { maxDepth: 2 }));
  }

  return newOb;
}

export function flattenClassesInCart(ob) {

  const flatten = require('flat');
  const middleOb = [];
  const newOb = [];

  for (let i = 0; i < ob.length; i++) {
    middleOb.push(ob[i].classes);
  }

  for (let i = 0; i < ob.length; i++) {
    newOb.push(flatten(middleOb[i], { delimiter: '__' }, { maxDepth: 1 }));
  }

  return newOb;
}
