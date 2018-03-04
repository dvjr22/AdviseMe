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

    var newCart = new Cart({
      _id: aCart._id,
      classes: aCart.classes
    })
    try{
        var savedCart = await newCart.save();
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

  console.log('aCart' + JSON.stringify(aCart));
  var _id = aCart._id
  console.log("ID : " + _id)
   try{
     //find by Id
     console.log(_id)
     var oldCart = await Cart.findById(_id);
   }catch(e){

   }

   console.log('old cart' + oldCart)
   console.log('a cart later ' + aCart)

   //edit the class object
   if(oldCart === null){
     console.log('no object')
     var oldCart = new Cart({
       _id: aCart._id,
       classes: aCart.classes,
       studentID: aCart.studentID,
       advisor: aCart.advisor
     })
      var savedCart = await oldCart.save();
      return savedCart;
   }else{
     console.log('object found')
     oldCart._id = aCart._id
     oldCart.classes = aCart.classes
     oldCart.studentID = aCart.studentID
     oldCart.advisor = aCart.advisor
   try {
      console.log("OLD CART " + JSON.stringify(oldCart))
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
