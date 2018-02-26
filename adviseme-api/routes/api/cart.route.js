var express = require('express')

var router = express.Router()

// Getting the class Controller
var cartController = require('../../controllers/cart.controller');

// Map each API to the Controller FUnctions
router.get('/', cartController.getCart)
router.get('/:id', cartController.getCartById)
router.post('/', cartController.createCart)
router.put('/', cartController.updateCart)
router.delete('/:id',cartController.removeCart)


// Export the Router
module.exports = router;
