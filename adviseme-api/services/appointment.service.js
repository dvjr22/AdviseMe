/*
Using async-await feature introduced in NodeJS 7.6.
- Can handle both synchronous and asynchronous errors with try/catch
- Conditionals are easier
- Concise and Clean

services to access the Mongoose Models
*/

//get mongoose model
var Appointment = require('../models/appointment.model')

_this = this

//create a new mongoose object
exports.createAppointment = async function(aAppointment){
    var newAppointment = new Appointment({
      studentID: aAppointment.studentID,
      firstName: aAppointment.firstName,
      lastName: aAppointment.lastName,
      major: aAppointment.major,
      status: aAppointment.status,
      advisor: aAppointment.advisor,
      roomNumber: aAppointment.roomNumber,
      date: aAppointment.date,
      time: {
        hour: aAppointment.time['hour'],
        minute: aAppointment.time['minute'],
      },
      timefull: aAppointment.time['hour']+':'+aAppointment.time['minute'],
    })
    try{
        var savedAppointment = await newAppointment.save();
        return savedAppointment;
    }catch(e){
        throw Error(e.message)
    }
}

/*
* param: Appointment
* Finds requested Appointment by Id and changes Appointment info
* To new Appointment info sent in request.
*/
exports.updateAppointment = async function(aAppointment){
  var _id = aAppointment._id

  try{
    //find by Id
    var oldAppointment = await Appointment.findById(_id);
  }catch(e){
    throw Error(e.message)
  }

  console.log(oldAppointment)

  //edit the Appointment object
  oldAppointment.studentID = aAppointment.studentID,
  oldAppointment.firstName = aAppointment.firstName,
  oldAppointment.lastName = aAppointment.lastName,
  oldAppointment.major = aAppointment.major,
  oldAppointment.status = aAppointment.status,
  oldAppointment.advisor = aAppointment.advisor,
  oldAppointment.roomNumber = aAppointment.roomNumber,
  oldAppointment.date = aAppointment.date,
  oldAppointment.time['hour'] = aAppointment.time['hour'],
  oldAppointment.time['minute'] = aAppointment.time['minute'],

  console.log(oldAppointment)

  try {
    var savedAppointment = await oldAppointment.save()
    return savedAppointment
  }catch(e){
    throw Error(e.message)
  }
}

//gets a Appointment mongoose object
exports.getAppointment = async function() {

  //try-catch handle errors
  try{
    var appointments = await Appointment.find({})
    return appointments;
  }catch(e){
    throw Error(e.message)
  }
}

//gets a appointment object by student ID
exports.getAppointmentByStudentId = async function(id) {

  //try-catch handle errors
  try{
    var appointments = await Appointment.find({'studentID': id});
    return appointments;
  }catch(e){
    throw Error(e.message, "Error while finding appointment by id")
  }
}

//gets a appointment object by advisor ID
exports.getAppointmentByAdvisorId = async function(id) {

  //try-catch handle errors
  try{
    var appointments = await Appointment.find({'advisor': id});
    return appointments;
  }catch(e){
    throw Error(e.message, "Error while finding appointment by id")
  }
}

//delete a appointment mongoose object by ID
exports.deleteAppointment = async function(id) {
  try{
    var deleted = await Appointment.findByIdAndRemove({_id: id});
    return deleted;
  }catch(e){
    throw Error(e.message)
  }
}
