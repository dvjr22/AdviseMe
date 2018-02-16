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

//gets a appointment object by ID
exports.getAppointmentById = async function(id) {

  //try-catch handle errors
  try{
    var appointments = await Appointment.findById({_id: id});
    return appointments;
  }catch(e){
    throw Error(e.message, "Error while finding appointment by id")
  }
}

//delete a appointment mongoose object by ID
exports.deleteAppointment = async function(id) {
  try{
    var deleted = await Appointment.remove({_id: id})
    if(deleted.result.n === 0){
      throw Error("Appointment could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error(e.message)
  }
}
