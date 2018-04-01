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

/**
  This function flattens a regular class object from the AdviseMe database.
  Returns an array of objects with the following field names:
  * _id
  * class__prefix
  * class__courseNo
  * class__title
  * prerequisites__0..n   // To access, just call "res.data.prerequisites" of
                             response that han't been flattened
  * department
  * curriculum__0__0      // See above
  * hrs
  * description
 */
export function flattenObject(ob) {

  const flatten = require('flat');
  const newOb = [];

  for (let i = 0; i < ob.length; i++) {
    newOb.push(flatten(ob[i], { delimiter: '__' }, { maxDepth: 2 }));
  }

  return newOb;
}

/**
  This function flattens a *few* regular class objects from the AdviseMe database.
  Returns an array of objects with the following field names:
  * _id
  * class__prefix
  * class__courseNo
  * class__title
  * prerequisites__0..n   // To access, just call "res.data.prerequisites" of
                             response that han't been flattened
  * department
  * curriculum__0__0      // See above
  * hrs
  * description
 */
export function flattenFiveObjects(ob) {

  const flatten = require('flat');
  const newOb = [];

  for (let i = 0; i < 5; i++) {
    newOb.push(flatten(ob[i], { delimiter: '__' }, { maxDepth: 2 }));
  }

  return newOb;
}

/**
  This function dives into the cart object, and only flattens the classes array.
  Note: this will only return information in the classes object, all other fields
  from cart will be discarded.
  Returns an array of objects with the following field names:
  * _id
  * class__prefix
  * class__courseNo
  * class__title
  * prerequisites__0..n   // To access, just call "res.data.prerequisites" of
                             response that han't been flattened
  * department
  * curriculum__0__0      // See above
  * hrs
  * description
 */
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
