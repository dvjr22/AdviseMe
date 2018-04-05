var mongoose = require('mongoose')
var Class = require('../models/class.model')

var CartSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    studentID: { type: String, required: true},
    status: {type: String}, // Created, Pending, Approved, Rejected
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
    message: { type: String },
    pastMessage: { type: String },

  })

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;
