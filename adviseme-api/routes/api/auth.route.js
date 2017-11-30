var express = require('express');
var router = express.Router();
var auth = require("../../controllers/AuthController.js");

// route for register action
router.post('/authenticate', auth.authenticate);
router.post('/register', auth.register);
router.get('/', auth.getAll);
router.get('/:_id', auth.getUser);
router.put('/:_id', auth.update);
router.delete('/:_id', auth._delete);

module.exports = router;
