var express = require('express')

var router = express.Router()
//require route variables here
var classes = require('./api/class.route')
var appointments = require('./api/appointment.route')
var user = require('./api/user.route')
var notification = require('./api/notification.route')

//add route modules here
router.use('/classes', classes);
router.use('/appointments', appointments);
router.use('/users', user);
router.use('/notify', notification);
module.exports = router;
