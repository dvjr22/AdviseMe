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
        prefix: aClass.prefix,
        course_num: aClass.course_num,
        title: aClass.title,
        semester: aClass.semester,
        description: aClass.description,
        preReqs: aClass.preReqs,
        department: aClass.department,
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
  var id = aClass.id

  try{
    //find by Id
    var oldClass = await Class.findById(id);
  }catch(e){
    throw Error(e.message)
  }

  console.log(oldClass)

  //edit the class object
  oldClass.prefix = aClass.prefix
  oldClass.course_num = aClass.course_num
  oldClass.title = aClass.title
  oldClass.semester = aClass.semester
  oldClass.description = aClass.description
  oldClass.preReqs = aClass.preReqs
  oldClass.department = aClass.department

  console.log(oldClass)

  try {
    var savedClass = await oldClass.save()
    return savedClass
  }catch(e){
    throw Error(e.message)
  }
}

//gets a class mongoose object by ID
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
