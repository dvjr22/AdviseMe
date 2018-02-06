var express = require('express');
var router = express.Router();
var user = require("../../controllers/user.controller.js");

// route for register action

router.post('/authenticate', user.authenticate);
router.post('/register', user.register);
router.get('/', user.getAll);
router.get('/:_id', user.getUser);
router.put('/:_id', user.update);
router.delete('/:_id', user._delete);

module.exports = router;
