/*
Using async-await feature introduced in NodeJS 7.6.
- Can handle both synchronous and asynchronous errors with try/catch
- Conditionals are easier
- Concise and Clean

services to access the Mongoose Models
*/

const CryptoJS = require('crypto-js')

//get mongoose model
var Blockchain = require('../models/blockchain.model')
var Cart = require('../models/cart.model')
const BlockchainService = require('./blockchain/blockchain')
_this = this;

exports.createBlock = async function(aCart) {

    var tempID = 1;
    var newBlock;

    var newCart = new Cart({
    _id: aCart._id,
    studentID: aCart.studentID,
    classes: aCart.classes,
    status: aCart.status,
    advisor: aCart.advisor,
  });

  var prevBlock = await Blockchain.find({}, {_id:1, hash:1})
  .limit(1)
  .sort({$natural:-1});

  if(prevBlock.length !== 0) {
    var genBlock = await BlockchainService.generateNextBlock(prevBlock);
    newBlock = new Blockchain({
      _id: genBlock._id,
      previousHash: genBlock.previousHash,
      timestamp: genBlock.timestamp,
      data: newCart,
      hash: genBlock.hash,
      nonce: genBlock.nonce,
    });
    if(BlockchainService.isValidNewBlock(newBlock, prevBlock[0])){
      newBlock = {};
    }
  } else {
    var genBlock = await BlockchainService.generateGenesis(prevBlock);
    newBlock = new Blockchain({
      _id: genBlock._id,
      previousHash: genBlock.previousHash,
      timestamp: genBlock.timestamp,
      data: newCart,
      hash: genBlock.hash,
      nonce: genBlock.nonce,
    });
  }

  try{
      var savedBlock = await newBlock.save();
      return savedBlock;
  }catch(e){
      throw Error(e.message)
  }
}

exports.getChain = async function() {
  try{
    var chain = await Blockchain.find({}).sort({_id: 1})
    return chain;
  }catch(e){
    throw Error(e.message);
  }
}
