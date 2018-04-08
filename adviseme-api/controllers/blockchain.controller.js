//accessing Cart service
var blockchainService = require('../services/blockchain.service')
_this = this

//create Cart
exports.createBlock = async function(req, res){

  //req.body contains form submit values
  // var aCart = {
  //     _id: req.body._id,
  //     studentID: req.body.studentID,
  //     classes: req.body.classes,
  //     status: req.body.status,
  //   }

  try{
    //calling service function with new object from request body
    var createdBlock = await blockchainService.createBlock()
    return res.status(201).json({status:200, data: createdBlock, message: "Successfully Created Cart"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}
