var express = require('express');
var router = express.Router();
var token = require("../../controllers/token.controller");

// route for register action

router.post('/valid', token.valid);

module.exports = router;
