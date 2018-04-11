//accessing Cart service
var blockchainService = require('../services/blockchain.service')
_this = this

//Create Block
exports.createBlock = async function(req, res){

  var aCart = {
      _id: req.body._id,
      studentID: req.body.studentID,
      classes: req.body.classes,
      status: req.body.status,
    }

  try{
    //calling service function with new object from request body
    var createdBlock = await blockchainService.createBlock(aCart)
    return res.status(201).json({status:200, data: createdBlock, message: "Successfully Created Cart"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }
}

//get Block
exports.getChain = async function(req, res) {

  try{
    var chain = await blockchainService.getChain()
    return res.status(200).json({status: 200, data: chain, message: "Successfully returned Carts"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }

}
