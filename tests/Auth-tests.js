var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
chai.use(chaiHttp);
require('dotenv/config');

process.env['NODE_ENV'] = "Production"

const responseChecker = (done,endpoint) => {
	chai.request(server)
		.post(`/api/${endpoint}/add`,{})
		.end((err,res)=>{
			res.should.have.status(401);
			done();
		});
}

const endPointHelper = [
	'course',
	'prof',
	'review',
	'vote'
]

describe('Basic Math', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('Addition', function() {
    it('should return 3 when 1, 2 is added', function() {
      assert.equal(1 + 2, 3);
    });
  });
});

describe('Test API', function(){

	describe('Endpoint /api', function(){
		it('returns correct status', function(done) {
		  chai.request(server)
		    .get('/api')
		    .end(function(err, res){
		      res.should.have.status(200);
		      res.should.be.an('object');
		      done();
		    });
		});

		it('welcome message', function(done) {
		  chai.request(server)
		    .get('/api')
		    .end(function(err, res){
		      res.body.should.have.property('message');
		      res.body.message.should.equal("Welcome to the course-prof API");
		      done();
		    });
		});
	});

	describe('Test intrusion: access protected endpoints with no login', function(){
		endPointHelper.map(endpoint => {
			it(`/api/${endpoint}/add returns unauthorized`, function(done) {
				responseChecker(done,endpoint)
		  });
		})
	});
});
