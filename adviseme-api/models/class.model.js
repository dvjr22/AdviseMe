var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ClassSchema = new mongoose.Schema({
    prefix: { type: String, required: true },
    course_num: { type: String, required: true },
    title: { type: String, required: true },
    semester: String,
    description: String,
    preReqs: String,
    department: { type: String, required: true },
})

ClassSchema.plugin(mongoosePaginate)
const Class = mongoose.model('Class', ClassSchema)

module.exports = Class;
