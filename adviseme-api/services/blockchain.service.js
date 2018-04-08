/*
Using async-await feature introduced in NodeJS 7.6.
- Can handle both synchronous and asynchronous errors with try/catch
- Conditionals are easier
- Concise and Clean

services to access the Mongoose Models
*/

//get mongoose model
var Blockchain = require('../models/blockchain.model')
var Cart = require('../models/cart.model')

_this = this

exports.createBlock = async function() {

    var tempID = 1;

  //   var aCart = new Cart({
  //   _id: aCart._id,
  //   studentID: aCart.studentID,
  //   classes: aCart.classes,
  //   status: aCart.status,
  // });

  var cart = await Blockchain.find({}, {_id:1})
  .limit(1)
  .sort({$natural:-1});

  console.log(cart);
  //.forEach(function(u) { tempID = (u._id + 1) });

  var newBlock = new Blockchain({
    _id: tempID,
    previousHash: 'jkl;',
    timestamp: 'today',
    data: 'jkl;',
    hash: '1234',
    nonce: 1234,
  });

  try{
      var savedBlock = await newBlock.save();
      return savedBlock;
  }catch(e){
      throw Error(e.message)
  }
}
