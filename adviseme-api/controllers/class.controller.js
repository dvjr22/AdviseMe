//accessing class service
var classService = require('../services/class.service')
_this = this

//create ClassSchema
exports.createClass = async function(req, res, next){
  //req.body contains form submit values
  var newClass = {
      _id: req.body._id,
      prerequisites: req.body.prerequisites,
      department: req.body.department,
      curriculum: req.body.curriculum,
      class: {
        title: req.body.class['title'],
        courseNo: req.body.class['courseNo'],
        prefix: req.body.class['prefix'],
      },
      hrs: req.body.hrs,
      description: req.body.description,
    }

  try{
    //calling service function with new object from request body
    var createdClass = await classService.createClass(newClass)
    return res.status(201).json({status:201, data: createdClass, message: "Successfully Created Class"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

//get Class
exports.getClass = async function(req, res) {

  try{
    var classes = await classService.getClass({})
    return res.status(200).json({status: 200, data: classes, message: "Successfully found Class"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }

}

//get Class by id
exports.getClassById = async function (req, res) {

  if(!req.params.id) { //id is necessary for findById
    return res.status(400).json({status: 400, message: "Id must be present"})
  }

  var id = req.params.id;

  try{
    var classes = await classService.getClassById(id)
    //return classes list with appropiate HTTP status code and message
    return res.status(200).json({status: 200, data: classes, message: "Successfully received classes"})
  }catch(e){
    //return error code response with error message
    return res.status(400).json({status: 400, message: e.message})
  }

}

//update Class
exports.updateClass = async function(req, res){

  if(!req.body._id){//id is necessary for update
    return res.status(400).json({status: 400, message: "Id must be present"})
  }

  var _id = req.body._id;

  var Class = {
    _id,
    prerequisites: req.body.prerequisites,
    department: req.body.department,
    curriculum: req.body.curriculum,
    class: {
      title: req.body.class['title'],
      courseNo: req.body.class['courseNo'],
      prefix: req.body.class['prefix'],
    },
    hrs: req.body.hrs,
    description: req.body.description,
  }

  try{
    var updatedClass = await classService.updateClass(Class)
    return res.status(200).json({status: 200, data: updatedClass, message: "Successfully Updated Class"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

//remove Class
exports.removeClass = async function(req, res){
  var id = req.params.id;

  try{
    var deletedClass = await classService.deleteClass(id)
    return res.status(204).json({status:204, message: "Successfully Deleted Class"})
  }catch(e){
    return res.status(400).json({status:400, message: e.message})
  }
}
