var mongoose = require('mongoose')
var Class = require('../models/class.model')

var CartSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    studentID: { type: String, required: true},
    classes: [{
        _id: { type: String, required: true},
        prerequisites: [String],
        department: { type: String, required: true },
        curriculum: [[String]],
        class: {
          title: { type: String, required: true },
          courseNo: { type: String, required: true },
          prefix: { type: String, required: true },
        },
    }],
    advisor: { type: String },
  })

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;
