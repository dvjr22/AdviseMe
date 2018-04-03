let mongoose = require("mongoose");
//let User = require('../models/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

// Parent block
describe('User', () => {
  beforeEach((done) => {
    // Actions to be done before each test
    console.log("Starting test");
  })
})

/*
 * Test the /get route
 */
 describe(' /GET all users', () => {
   it('it should GET all the users', (done) => {
     chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
   });
 });
