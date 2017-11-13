//accessing class service
var classService = require('../services/class.service')
_this = this

//create ClassSchema
exports.createClass = async function(req, res, next){
  //req.body contains form submit values
  var newClass = {
    prefix: req.body.prefix,
    course_num: req.body.course_num,
    title: req.body.title,
    semester: req.body.semester,
    description: req.body.description,
    preReqs: req.body.preReqs,
    department: req.body.department
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
exports.getClass = async function(req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10;
  console.log(page, limit)

  try{
    var classes = await classService.getClass({}, page, limit)
    return res.status(200).json({status: 200, data: classes, message: "Successfully found Class"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }

}

//update Class
exports.updateClass = async function(req, res, next){

  if(!req.body._id){//id is necessary for update
    return res.status(400).json({status: 400, message: "Id must be present"})
  }

  var id = req.body._id;
  console.log(req.body)

  var Class = {
    id,
    prefix: req.body.prefix,
    course_num: req.body.course_num,
    title: req.body.title,
    semester: req.body.semester ? req.body.semester : null,
    description: req.body.description ? req.body.description : null,
    preReqs: req.body.preReqs,
    department: req.body.department
  }

  try{
    var updatedClass = await classService.updateClass(Class)
    return res.status(200).json({status: 200, data: updatedClass, message: "Successfully Updated Class"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

//remove Class
exports.removeClass = async function(req, res, next){
  var id = req.params.id;

  try{
    var deletedClass = await classService.deleteClass(id)
    return res.status(204).json({status:204, message: "Successfully Deleted Class"})
  }catch(e){
    return res.status(400).json({status:400, message: e.message})
  }
}
