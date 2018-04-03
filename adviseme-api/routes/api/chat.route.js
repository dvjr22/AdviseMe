var express = require('express')

var router = express.Router()

var chatController = require('../../controllers/chat.controller');

router.get('/room/:room', chatController.getRoom);
router.get('/:id', chatController.getChat);
router.post('/', chatController.saveChat);
router.put('/:id', chatController.updateChat);
router.delete('/:id', chatController.deleteChat);

module.exports = router;
