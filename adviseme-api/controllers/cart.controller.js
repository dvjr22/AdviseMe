//accessing Cart service
var cartService = require('../services/cart.service')
_this = this

//create Cart
exports.createCart = async function(req, res){
  //req.body contains form submit values
  var newCart = {
      _id: req.body._id,
      studentID: req.body.studentID,
      classes: req.body.classes
    }

  try{
    //calling service function with new object from request body
    var createdCart = await cartService.createCart(newCart)
    return res.status(201).json({status:201, data: createCart, message: "Successfully Created Cart"})
  }catch(e){
    console.log('here')
    return res.status(500).json({status: 500, message: e.message})
  }
}

//get Cart
exports.getCart = async function(req, res) {

  try{
    var carts = await cartService.getCart({})
    return res.status(200).json({status: 200, data: carts, message: "Successfully returned Carts"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }

}

//get Cart by id
exports.getCartById = async function (req, res) {

  if(!req.params.id) { //id is necessary for findById
    return res.status(400).json({status: 400, message: "Id must be present"})
  }

  var id = req.params.id;

  try{
    var cart = await cartService.getCartById(id)
    //return classes list with appropiate HTTP status code and message
    return res.status(200).json({status: 200, data: cart, message: "Successfully received Cart"})
  }catch(e){
    //return error code response with error message
    return res.status(500).json({status: 500, message: e.message})
  }

}

// Get carts by advisor id
exports.getCartByAdvisor = async function (req, res) {
  if(!req.params.advisorid) {
    return res.status(500).json({status: 500, message: 'AdvisorId must be present'})
  }

  var advisorid = req.params.advisorid;

  try{
    var carts = await cartService.getCartByAdvisor(advisorid);
    console.log("FOUND: " + JSON.stringify(carts))
    return res.status(200).json({status: 200, data: carts, message: "Successfully received carts"})
  } catch (e) {
    return res.status(500).json({status: 500, message: e.message})
  }
}

//update Cart
exports.updateCart = async function(req, res){

  if(!req.body._id){//id is necessary for update
    return res.status(400).json({status: 400, message: "Id must be present"})
  }

  var _id = req.body._id;

  var Cart = {
    _id,
    studentID: req.body.studentID,
    classes: req.body.classes,
    advisor: req.body.advisor,
  }

  try{
    var updatedCart = await cartService.updateCart(Cart)
    return res.status(200).json({status: 200, data: updatedCart, message: "Successfully Updated Class"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

//remove Cart
exports.removeCart = async function(req, res, next){
  var id = req.params.id;

  try{
    var deletedCart = await cartService.deleteCart(id)
    return res.status(204).json({status:204, message: "Successfully Deleted Cart"})
  }catch(e){
    return res.status(400).json({status:400, message: e.message})
  }
}
