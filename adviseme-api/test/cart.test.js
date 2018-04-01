let mongoose = require("mongoose");
//let User = require('../models/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

// Parent block
describe('Cart', () => {
  beforeEach((done) => {
    // Actions to be done before each test
    console.log("Starting test");
  })
})

/*
 * Test the /get route
 */
 describe(' /GET all carts', () => {
   it('it should GET all the carts', (done) => {
     chai.request(server)
      .get('/carts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
   });
 });
