var mongoose = require('mongoose')

var CartSchema = new mongoose.Schema({
    items: [
      {
      prefix: String,
      courseNo: Number,
      title: String,
      semester: String,
      preReqs: [{ preReq: Number }],
      department: String,
    }
  ])

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;
