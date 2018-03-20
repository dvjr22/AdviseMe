var Chat = require('../models/chat.model')

exports.getRoom = async function(aChat) {
  try{
    Chat.find({ room: aChat.room }, function (err, chats) {
      if(err) throw Error(err.message);
      return chats;
    });
  } catch (e) {
    throw Error(e.message);
  }
};

exports.getChat = async function(aChat) {
  try{
    var post = await Chat.findById({ _id: aChat._id }, function (err, post) {
      if(err) throw Error(err.message);
      return post;
    });
    return post;
  } catch (e) {
    throw Error(e.message);
  }
}

exports.saveChat = async function(aChat) {
  try{
    Chat.create(aChat, function (err, post) {
      if(err) throw Error(err.message);
      return post;
    })
  } catch (e) {
    throw Error(e.message);
  }
}

exports.updateChat = async function(aChat) {
  try{
    Chat.findByIdAndUpdate(aChat._id, aChat, function (err, post) {
      if (err) throw Error(err.message);
      return post;
    })
  } catch (e) {
    throw Error(e.message);
  }
}

exports.deleteChat = async function(aChat) {
  try {
    Chat.findByIdAndRemove(aChat._id, aChat, function(err, post) {
      if (err) throw Error(err.message);
      return post;
    })
  } catch (e) {
    throw Error(e.message);
  }
}
