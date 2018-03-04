var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ClassSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    prerequisites: [String],
    department: { type: String, required: true },
    curriculum: [[String]],
    class: {
      title: { type: String, required: true },
      courseNo: { type: String, required: true },
      prefix: { type: String, required: true },
    },
    hrs: { type: String, required: true},
    description: { type: String, required: true},
})

ClassSchema.plugin(mongoosePaginate)
const Class = mongoose.model('Class', ClassSchema)

module.exports = Class;
