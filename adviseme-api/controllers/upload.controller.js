var multer = require('multer');
var DIR = './uploads/';
var upload = multer({dest: DIR}).single('photo');


exports.uploadFile = async function(req, res, next) {
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send("an Error occured uploading a file");
    }

    path = req.file.path;
    return res.send("Upload completed for " + path);
  });
}
