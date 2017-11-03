var express = require('express')

var router = express.Router()
//require route variables here
var classes = require('./api/class.route')

//add route modules here
router.use('/classes', classes);


module.exports = router;
