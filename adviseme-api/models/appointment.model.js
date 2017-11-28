var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var AppointmentSchema = new mongoose.Schema({
    studentID: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    major: {
      type: String,
      default: 'undeclared',
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    advisor: {
      type: String,
      required: true,
      trim: true,
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
})

AppointmentSchema.plugin(mongoosePaginate)
const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment;