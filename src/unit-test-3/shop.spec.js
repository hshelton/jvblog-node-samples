'use strict';

require('should');
var sinon = require('sinon');

var shop = require('./shop');
var myLogger = require('./mylogger');

describe('calculateTotal', function() {
  it('should log a happy message for a large total', function() {
    var items = [
      {
        price: 200,
        count: 4,
      },
      {
        price: 300,
        count: 2,
      }
    ];

    var logSpy = sinon.spy(myLogger, 'log');

    shop.calculateTotal(items);

    logSpy.calledOnce.should.be.true;
    logSpy.getCall(0).args[0].should.equal('An order of 1400 is being considered!')
  });
});