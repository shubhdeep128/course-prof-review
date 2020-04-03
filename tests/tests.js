var assert = require('assert');
var chai = require('chai');
// var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
// chai.use(chaiHttp);

/// Testing if arithmetic is true. Spoiler alert: it is
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
