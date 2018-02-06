/*
Using async-await feature introduced in NodeJS 7.6.
- Can handle both synchronous and asynchronous errors with try/catch
- Conditionals are easier
- Concise and Clean

services to access the Mongoose Models
*/

//get mongoose model
var Class = require('../models/class.model')

_this = this

//create a new mongoose object
exports.createClass = async function(aClass){
    var newClass = new Class({
        _id: aClass._id,
        class: {
          prefix: aClass.prefix,
          courseNo: aClass.courseNo,
          title: aClass.title,
        },
        requiredFor: aClass.requiredFor,
        department: aClass.department,
        curriculum: aClass.curriculum,
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

  console.log(oldClass)

  //edit the class object
  oldClass._id = aClass._id
  oldClass.class.prefix = aClass.class.prefix
  oldClass.class.courseNo = aClass.class.courseNo
  oldClass.class.title = aClass.class.title
  oldClass.requiredFor = aClass.requiredFor
  oldClass.department = aClass.department
  oldClass.curriculum = aClass.curriculum

  console.log(oldClass)

  try {
    var savedClass = await oldClass.save()
    return savedClass
  }catch(e){
    throw Error(e.message)
  }
}

//get all class objects
exports.getClass = async function(query, page, limit) {

  //options setup for the mongoose paginate
  var options = {
    page,
    limit
  }

  //try-catch handle errors
  try{
    var classes = await Class.paginate(query,options)
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


//delete a class mongoose object by ID
exports.deleteClass = async function(id) {
  try{
    var deleted = await Class.remove({_id: id})
    if(deleted.result.n === 0){
      throw Error("Class could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error(e.message)
  }
}
