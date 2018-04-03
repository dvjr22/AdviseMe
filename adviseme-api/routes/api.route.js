var express = require('express')

var router = express.Router()
//require route variables here
var classes = require('./api/class.route')
var appointments = require('./api/appointment.route')
var carts = require('./api/cart.route')
var user = require('./api/user.route')
var notification = require('./api/notification.route')
var token = require('./api/token.route')
var upload = require('./api/upload.route')
var chat = require('./api/chat.route')

//add route modules here
router.use('/api/classes', classes);
router.use('/api/appointments', appointments);
router.use('/api/carts', carts)
router.use('/api/users', user);
router.use('/api/notify', notification);
router.use('/api/token', token);
router.use('/upload', upload);
router.use('/api/chat', chat);
module.exports = router;
