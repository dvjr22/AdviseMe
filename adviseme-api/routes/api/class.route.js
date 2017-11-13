var express = require('express')

var router = express.Router()

// Getting the class Controller
var classController = require('../../controllers/class.controller');

// Map each API to the Controller FUnctions
router.get('/', classController.getClass)
router.post('/', classController.createClass)
router.put('/', classController.updateClass)
router.delete('/:id',classController.removeClass)


// Export the Router
module.exports = router;
