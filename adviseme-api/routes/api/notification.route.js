var express = require('express');
var router = express.Router();
var notification = require('../../controllers/notification.controller.js');

// Route /sendnotification to the notification controller
router.post('/sendnotification', notification.sendNotification);

module.exports = router;
