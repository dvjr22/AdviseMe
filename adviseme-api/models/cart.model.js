var mongoose = require('mongoose')
var Class = require('../models/class.model')

var CartSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    classes: [Class],
  })

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;
