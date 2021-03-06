/*
Using async-await feature introduced in NodeJS 7.6.
- Can handle both synchronous and asynchronous errors with try/catch
- Conditionals are easier
- Concise and Clean

services to access the Mongoose Models
*/

//get mongoose model
var Cart = require('../models/cart.model')

_this = this

//create a new mongoose object
exports.createCart = async function(aCart){

    var aCart = new Cart({
      _id: aCart._id,
      studentID: aCart.studentID,
      classes: aCart.classes,
      status: aCart.status,
    })
    try{
        var savedCart = await aCart.save();
        return savedCart;
    }catch(e){
        throw Error(e.message)
    }
}

/*
* param: Cart
* Finds requested cart by Id and changes cart info
* to new cart info sent in request.
*/
exports.updateCart = async function(aCart){

  var _id = aCart._id
   try{
     //find by Id
     var oldCart = await Cart.findById({_id: _id});
   }catch(e){

   }

   //edit the class object
   if(oldCart === null){
     var oldCart = new Cart({
       _id: aCart._id,
       classes: aCart.classes,
       studentID: aCart.studentID,
       advisor: aCart.advisor,
       status: aCart.status,
       message: aCart.message,
       approvedDate: aCart.approvedDate,
       pastMessage: aCart.pastMessage,
       requestDate: aCart.requestDate,
     })
      var savedCart = await oldCart.save();
      return savedCart;
   }else{
     oldCart._id = aCart._id
     oldCart.classes = aCart.classes
     oldCart.studentID = aCart.studentID
     oldCart.advisor = aCart.advisor
     oldCart.status = aCart.status
     oldCart.message = aCart.message
     oldCart.approvedDate = aCart.approvedDate
     oldCart.pastMessage = aCart.pastMessage
     oldCart.requestDate = aCart.requestDate
   try {
     var savedCart = await oldCart.save()
     return savedCart
   }catch(e){
     throw Error(e.message)
   }
   }

}

//get all class objects
exports.getCart = async function() {

  //try-catch handle errors
  try{
    var carts = await Cart.find({})
    return carts;
  }catch(e){
    throw Error(e.message)
  }
}

//gets a class object by ID
exports.getCartById = async function(id) {
  //try-catch handle errors
  try{
    var cart = await Cart.findById({_id: id});
    return cart;
  }catch(e){
    throw Error(e.message, "Error while finding class by id")
  }
}

// Gets carts by advisor id
exports.getCartByAdvisor = async function(advisorid) {
  try{
    var carts = await Cart.find({advisor: advisorid});
    return carts;
  } catch (e) {
    throw Error(e.message, "error while finding classes by advisor id")
  }
}

// Gets carts by advisor id
exports.getCartByAdvisorAndStudent = async function(advisorid, studentid) {
  try{
    var carts = await Cart.find({advisor: advisorid, studentID: studentid});
    return carts;
  } catch (e) {
    throw Error(e.message, "error while finding classes by advisor id")
  }
}

// Gets current cart of student
exports.getCurrentStudentCart = async function(studentid) {
  //try-catch handle errors
  try{
    var cart = await Cart.find({studentID: studentid, approvedDate: undefined});
    return cart;
  }catch(e){
    throw Error(e.message, "Error while finding class by id and undefined approved date")
  }
}

// Gets current request for the advisors
exports.getCurrentRequests = async function(advisorid) {
  //try-catch handle errors
  try{
    var cart = await Cart.find({advisor: advisorid, approvedDate: undefined});
    return cart;
  }catch(e){
    throw Error(e.message, "Error while finding class by advisorid and undefined approved date")
  }
}

//delete a class mongoose object by ID
exports.deleteCart = async function(id) {
  try{
    var deleted = await Cart.remove({_id: id})
    if(deleted.result.n === 0){
      throw Error("Class could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error(e.message)
  }
}

exports.deleteAll = async function() {
  try{
    var deleteAll = await Cart.collection.drop();
    return deleteAll;
  }catch(e) {
    throw Error(e.message)
  }
}
