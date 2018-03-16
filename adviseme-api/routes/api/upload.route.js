var express = require('express')

var router = express.Router()

var uploadController = require('../../controllers/upload.controller');

router.post('/', uploadController.uploadFile)

module.exports = router;
