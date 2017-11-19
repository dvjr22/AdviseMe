var express = require('express')

var router = express.Router()
//require route variables here
var classes = require('./api/class.route')
var appointments = require('./api/appointment.route')

//add route modules here
router.use('/classes', classes);
router.use('/appointments', appointments)


module.exports = router;
