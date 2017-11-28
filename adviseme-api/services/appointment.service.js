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
      name: aAppointment.name,
      major: aAppointment.major,
      year: aAppointment.year,
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
  var id = aAppointment.id

  try{
    //find by Id
    var oldAppointment = await Appointment.findById(id);
  }catch(e){
    throw Error(e.message)
  }

  console.log(oldAppointment)

  //edit the Appointment object
  oldAppointment.studentID = aAppointment.studentID,
  oldAppointment.name = aAppointment.name,
  oldAppointment.major = aAppointment.major,
  oldAppointment.year = aAppointment.year,
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

//gets a Appointment mongoose object by ID
exports.getAppointment = async function(query, page, limit) {

  //options setup for the mongoose paginate
  var options = {
    page,
    limit
  }

  //try-catch handle errors
  try{
    var appointments = await Appointment.paginate(query,options)
    return appointments;
  }catch(e){
    throw Error(e.message)
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
