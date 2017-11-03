var config = require('../config.json');
var userService = require('../services/user.service');

var authController = {};

authController.authenticate = authenticate;
authController.register = register;
authController.getAll = getAll;
authController.getCurrent = getCurrent;
authController.update = update;
authController._delete = _delete;

module.exports = authController;

function authenticate(req, res) {
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

function register(req, res) {
  userService.create(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  userService.getAll()
    .then(function (users) {
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getCurrent(req, res) {
  userService.getById(req.user.sub)
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

function update(req, res) {
  userService.update(req.params._id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  userService.delete(req.params._id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
