var config = require('../config.json');
var userService = require('../services/user.service');

exports.authenticate = async function(req, res) {
  userService.authenticate(req.body.username, req.body.password)
    .then(function (user) {
      if (user) {
        // Authentication successful!
        res.send(user);
      } else {
        // Authentication failed :(
        res.status(400).send('Username or password is incorrect');
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

exports.register = async function(req, res) {
  userService.create(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

exports.getAll = async function(req, res) {
  userService.getAll()
    .then(function (users) {
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

exports.getUser = async function(req, res) {
  userService.getById(req.params._id)
    .then(function (user) {
      if(user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

exports.update = async function(req, res) {
  console.log(req.body);
  userService.update(req.params._id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

exports._delete = async function(req, res) {
  userService.delete(req.params._id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
