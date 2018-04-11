var mongoose = require('mongoose'),
Cart = require('../models/cart.model'),
CartSchema = mongoose.model('Cart').schema,
Schema = mongoose.Schema;

var BlockchainSchema = new mongoose.Schema({
    _id: { type: Number, required: true},
    previousHash: { type: String, required: true},
    timestamp: { type: String, required: true},
    data: { type: CartSchema, requred: true},
    hash: { type: String, required: true},
    nonce: { type: Number, required: true},
  })

const Blockchain = mongoose.model('Blockchain', BlockchainSchema)

module.exports = Blockchain;
