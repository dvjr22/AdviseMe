var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var AppointmentSchema = new mongoose.Schema({
    studentID: {
      type: Number,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    major: {
      type: String,
      default: 'undeclared',
      trim: true,
    },
    status: {
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
      required: true,
      default: Date.now,
    },
})

AppointmentSchema.plugin(mongoosePaginate)
const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment;
