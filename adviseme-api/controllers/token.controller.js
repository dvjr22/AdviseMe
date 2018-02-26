var config = require('../config.json');
var tokenService = require('../services/token.service');

exports.valid = async function(req, res) {
  tokenService.valid(req.body.token)
    .then(function (token) {
      if (token) {
        // Authentication successful!
        res.send(token);
      } else {
        // Authentication failed :(
        res.status(400).json({status: 400, return: 'false', message: 'Failed validation'});
      }
    })
    .catch(function (err) {
      res.status(400).json({status: 400, return: 'false', message: 'Failed validation'});
    });
}
