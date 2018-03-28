var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var AppointmentSchema = new mongoose.Schema({
    studentID: {
      type: String,
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
      default: Date.now,
    },
    time: {
      hour: { type: Number, required: true },
      minute: { type: Number, required: true },
      second: { type: Number, required: true },
    },
})

AppointmentSchema.plugin(mongoosePaginate)
const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment;
