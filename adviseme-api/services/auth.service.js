var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;

module.exports = service;

function authenticate(username, password){
  var deferred = Q.defer();

  db.users.findOne({ username: username }, function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if(user && bcrypt.compareSync(password, user.hash)) {
      // Authentication successful
      deferred.resolve({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        school: user.school,
        role: user.role,
        advisor: user.advisor,
        currentClasses: user.currentClasses,
        suggestedClasses: user.suggestedClasses,
        student_Meta: user.student_Meta,
        underlings: user.underlings,
        appointments: user.appointments,
        created: user.created,
        updated: user.updated,
        token: jwt.sign({ sub: user._id }, config.secret)
      });
    } else {
      // Authentication failure
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}
