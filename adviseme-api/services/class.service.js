/*
Using async-await feature introduced in NodeJS 7.6.
- Can handle both synchronous and asynchronous errors with try/catch
- Conditionals are easier
- Concise and Clean

services to access the Mongoose Models
*/

//get mongoose model
var Class = require('../models/class.model')
var User = require('../models/user.model')

_this = this

//create a new mongoose object
exports.createClass = async function(aClass){
    var newClass = new Class({
        _id: aClass._id,
        class: {
          prefix: aClass.class['prefix'],
          courseNo: aClass.class['courseNo'],
          title: aClass.class['title'],
        },
        department: aClass.department,
        curriculum: aClass.curriculum,
        prerequisites: aClass.prerequisites,
        hrs: aClass.hrs,
        description: aClass.description,
    })
    try{
        var savedClass = await newClass.save();
        return savedClass;
    }catch(e){
        throw Error(e.message)
    }
}

/*
* param: Class
* Finds requested Class by Id and changes Class info
* To new Class info sent in request.
*/
exports.updateClass = async function(aClass){
  var _id = aClass._id

  try{
    //find by Id
    var oldClass = await Class.findById(_id);
  }catch(e){
    throw Error(e.message)
  }

  //edit the class object
  oldClass._id = aClass._id
  oldClass.prerequisites = aClass.prerequisites
  oldClass.department = aClass.department
  oldClass.curriculum = aClass.curriculum
  oldClass.class['title'] = aClass.class['title']
  oldClass.class['courseNo'] = aClass.class['courseNo']
  oldClass.class['prefix'] = aClass.class['prefix']
  oldClass.hrs = aClass.hrs
  oldClass.description = aClass.description

  try {
    var savedClass = await oldClass.save()
    return savedClass
  }catch(e){
    throw Error(e.message)
  }
}

//get all class objects
exports.getClass = async function() {

  //try-catch handle errors
  try{
    var classes = await Class.find({})
    return classes;
  }catch(e){
    throw Error(e.message)
  }
}

//gets a class object by ID
exports.getClassById = async function(id) {

  //try-catch handle errors
  try{
    var classes = await Class.findById({_id: id});
    return classes;
  }catch(e){
    throw Error(e.message, "Error while finding class by id")
  }
}

exports.getCurrentClasses = async function(id) {

  try{
    var currentUser = await User.findById(id);
    var userClasses = currentUser.course.filter(function (el) {
      return el.grade === "enrolled"
    });
    return userClasses;
  }catch(e){
    throw Error(e.message, "Error while finding current classes")
  }
}

exports.getGradedClasses = async function (id) {
  try{
    var currentUser = await User.findById(id);
    var userClasses = currentUser.course.filter(function (el) {
      return el.grade != "tbc" && el.grade != "enrolled"
    });
    return userClasses;
  }catch(e){
    throw Error(e.message, "Error while finding graded classes")
  }
}


//delete a class mongoose object by ID
exports.deleteClass = async function(id) {
  try{
    var deleted = await Class.remove({_id: id})
    if(deleted.n === 0){
      throw Error("Class could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error(e.message)
  }
}
