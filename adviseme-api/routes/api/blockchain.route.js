var express = require('express')

var router = express.Router()

// Getting the appointment Controller
// var appointmentController = require('../../controllers/appointment.controller');
var blockchainController = require('../../controllers/blockchain.controller');

// Map each API to the Controller FUnctions
router.post('/', blockchainController.createBlock)
router.get('/', blockchainController.getChain)

// Export the Router
module.exports = router;
