
const CryptoJS = require('crypto-js')
const Blockchain = require('../../models/blockchain.model')
const difficulty = 4;

exports.generateNextBlock = function(cartData) {
  const date = new Date();
  const timestamp = date.getTime();
  const previousHash = cartData[0].hash;
  const nextIndex = cartData[0]._id + 1;
  let nonce = 0;
  let nextHash = '';

  while(!isValidHashDifficulty(nextHash)) {
    nonce = nonce + 1;
    nextHash = calculateHash(nextIndex, previousHash, timestamp, cartData, nonce);
  }

  return { _id: nextIndex,
        previousHash: previousHash,
        timestamp: timestamp,
        hash: nextHash,
        nonce: nonce, }
}

exports.generateGenesis = function(cartData) {
  const index = 0;
  const previousHash = 0;
  const timestamp = new Date().getTime()
  let nonce = 0;
  let hash = '';

  while(!isValidHashDifficulty(hash)) {
    nonce = nonce + 1;
    hash = calculateHash(0, 0, timestamp, cartData, nonce);
  }
  return {_id: index, previousHash: previousHash, timestamp: timestamp, hash: hash, nonce: nonce};
}

exports.isValidNewBlock = function(newBlock, previousBlock) {
  const blockHash = calculateHashForBlock(newBlock);

  if (previousBlock._id + 1 !== newBlock._id) {
    return false
  } else if (previousBlock.hash !== newBlock.previousHash) {

    return false
  } else if (blockHash !== newBlock.hash) {

    return false
  } else if (!isValidHashDifficulty(calculateHashForBlock(newBlock))) {

    return false;
  }
  return true
}

function calculateHash(index, previousHash, timestamp, cart, nonce) {
  return CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(cart) + nonce).toString();
}

function calculateHashForBlock (block) {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.nonce)
}

function isValidHashDifficulty(hash) {
  var index = 0;
  for (i = 0, b = hash.length; i < b; i ++) {
    index = i;
    if (hash[i] !== '0') {
      break;
    }
  }

  return index === difficulty;
}
