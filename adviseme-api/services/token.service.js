var jwt = require('jsonwebtoken');
var config = require('../config.json');
var Q = require('q');

var service = {};

service.valid = valid;

module.exports = service;

function valid(token){
  var deferred = Q.defer();
  try {
    jwt.verify(token, config.secret);
    deferred.resolve({
      status: '200',
      return: 'true'
    });
  } catch(err) {
    deferred.resolve({
      status: '400',
      return: 'false',
      message: err
    });
  }

  return deferred.promise;
}
