var express = require('express')

var router = express.Router()
//require route variables here
var classes = require('./api/class.route')
var appointments = require('./api/appointment.route')
var user = require('./api/user.route')
var notification = require('./api/notification.route')
var token = require('./api/token.route')

//add route modules here
router.use('/api/classes', classes);
router.use('/api/appointments', appointments);
router.use('/api/users', user);
router.use('/api/notify', notification);
router.use('/api/token', token);
module.exports = router;
