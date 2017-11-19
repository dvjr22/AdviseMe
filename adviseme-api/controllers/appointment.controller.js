//accessing Appointment service
var AppointmentService = require('../services/appointment.service')
_this = this

//create AppointmentSchema
exports.createAppointment = async function(req, res, next){
  //req.body contains form submit values
  var newAppointment = {
    name: req.body.name,
    major: req.body.major,
    year: req.body.year,
    advisor: req.body.advisor,
    date: req.body.date,
  }

  try{
    //calling service function with new object from request body
    var createdAppointment = await AppointmentService.createAppointment(newAppointment)
    return res.status(201).json({status:201, data: createdAppointment, message: "Successfully Created Appointment"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

//get Appointment
exports.getAppointment = async function(req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10;
  console.log(page, limit)

  try{
    var Appointments = await AppointmentService.getAppointment({}, page, limit)
    return res.status(200).json({status: 200, data: Appointments, message: "Successfully found Appointment"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }

}

//update Appointment
exports.updateAppointment = async function(req, res, next){

  if(!req.body._id){//id is necessary for update
    return res.status(400).json({status: 400, message: "Id must be present"})
  }

  var id = req.body._id;
  console.log(req.body)

  var Appointment = {
    id,
    name: req.body.name,
    major: req.body.major,
    year: req.body.year,
    advisor: req.body.advisor,
    date: req.body.date,
  }

  try{
    var updatedAppointment = await AppointmentService.updateAppointment(Appointment)
    return res.status(200).json({status: 200, data: updatedAppointment, message: "Successfully Updated Appointment"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

//remove Appointment
exports.removeAppointment = async function(req, res, next){
  var id = req.params.id;

  try{
    var deletedAppointment = await AppointmentService.deleteAppointment(id)
    return res.status(204).json({status:204, message: "Successfully Deleted Appointment"})
  }catch(e){
    return res.status(400).json({status:400, message: e.message})
  }
}
