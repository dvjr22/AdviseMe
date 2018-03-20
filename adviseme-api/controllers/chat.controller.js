var chatService = require('../services/chat.service')
var Chat = require('../models/chat.model');

exports.getRoom = async function(req, res) {
  var chat = new Chat()
  chat.room = req.params.room;
  try {
    var room = await chatService.getRoom(chat);
    return res.status(200).json({status:200, data: room, message: "Successfully recieved room"})
  } catch (e) {
    return res.status(500).json({status:500, message: e.message})
  }
}

exports.getChat = async function(req, res) {
  var chat = new Chat()
  chat._id = req.params.id;
  try {
    var room = await chatService.getChat(chat);
    return res.status(200).json({status:200, data: room, message: "Successfully recieved chat"})
  } catch (e) {
    return res.status(500).json({status:500, message: e.message})
  }
}

exports.saveChat = async function(req, res) {
  var chat = new Chat()
  chat.room = req.body.room;
  chat.nickname = req.body.nickname;
  chat.message = req.body.message;
  chat._id = req.params.id;
  try {
    var room = await chatService.saveChat(chat);
    return res.status(200).json({status:200, data: room, message: "Successfully saved chat"})
  } catch (e) {
    return res.status(500).json({status:500, message: e.message})
  }
}

exports.updateChat = async function(req, res) {
  var chat = new Chat()
  chat._id = req.params.id;
  try {
    var room = await chatService.updateChat(chat);
    return res.status(200).json({status:200, data: room, message: "Successfully updated chat"})
  } catch (e) {
    return res.status(500).json({status:500, message: e.message})
  }
}

exports.deleteChat = async function(req, res) {
  var chat = new Chat()
  chat._id = req.params.id;
  try {
    var room = await chatService.deleteChat(chat);
    return res.status(200).json({status:200, data: room, message: "Successfully deleted chat"})
  } catch (e) {
    return res.status(500).json({status:500, message: e.message})
  }
}
