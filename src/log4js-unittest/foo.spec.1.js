'use strict';

// This spec file stubs log4js.getLogger().

var should = require('should');
var sinon  = require('sinon');

// First require log4js here, so we get the time to stub getLogger.
var log4js = require('log4js');

// Create a spy to see which logger.info calls were done.
var infoSpy = sinon.spy();

// Make sure log4js.getLogger() returns an object containing our spy.
var getLoggerStub = sinon.stub(log4js, 'getLogger');
getLoggerStub.returns({ info: infoSpy });

// Now we can require foo.js, which will use our getLogger stub.
var foo = require('./foo');

describe('Foo logger', function() {
  it('should log something', function() {
    foo.logSomething();

    infoSpy.calledOnce.should.equal(true);
    infoSpy.calledWithExactly('something').should.equal(true);
  });
});
