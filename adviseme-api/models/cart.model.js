var mongoose = require('mongoose')

var CartSchema = new mongoose.Schema({
    items: [{class: Schema.ObjectId}])

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;
