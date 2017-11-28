var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ClassSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    class: {
      prefix: { type: String, required: true },
      courseNo: { type: String, required: true },
      title: { type: String, required: true },
    },
    requiredFor: [String],
    department: { type: String, required: true },
    curriculum: [String],
})

ClassSchema.plugin(mongoosePaginate)
const Class = mongoose.model('Class', ClassSchema)

module.exports = Class;
