var express = require('express')

var router = express.Router()

// Getting the appointment Controller
// var appointmentController = require('../../controllers/appointment.controller');
var blockchainController = require('../../controllers/blockchain.controller');

// Map each API to the Controller FUnctions
// router.get('/', appointmentController.getAppointment)
// router.get('/student/:id', appointmentController.getAppointmentByStudentId)
// router.get('/advisor/:id', appointmentController.getAppointmentByAdvisorId)
// router.post('/', appointmentController.createAppointment)
// router.put('/', appointmentController.updateAppointment)
// router.delete('/:id',appointmentController.removeAppointment)
router.post('/', blockchainController.createBlock)

// Export the Router
module.exports = router;
