var express = require('express')

var router = express.Router()

// Getting the user Controller
var userController = require('../../controllers/user.controller');

// Map each API to the Controller FUnctions
router.get('/:id', userController.getUser)
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.delete('/:id',userController.removeUser)


// Export the Router
module.exports = router;
