var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");

// route for register action
router.post('/authenticate', authenticate);
router.post('/register',register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete(':_id', _delete);

module.exports = router;
