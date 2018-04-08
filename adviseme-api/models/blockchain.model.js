var mongoose = require('mongoose')
var Cart = require('../models/cart.model')

var BlockchainSchema = new mongoose.Schema({
    _id: { type: Number, required: true},
    previousHash: { type: String, required: true},
    timestamp: { type: String, required: true},
    data: { type: String, required: true},
    hash: { type: String, required: true},
    nonce: { type: Number, required: true},
  })

const Blockchain = mongoose.model('Blockchain', BlockchainSchema)

module.exports = Blockchain;
