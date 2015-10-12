'use strict';

// This spec file stubs log4js.getLogger(), but in the situation
// where another file has already required foo.js.

// What if this file (or any other spec file!) requires foo before
// we can create the getLogger stub?
var foo = require('./foo');

var should = require('should');
var sinon  = require('sinon');
var log4js = require('log4js');
var infoSpy = sinon.spy();
var getLoggerStub = sinon.stub(log4js, 'getLogger');
getLoggerStub.returns({ info: infoSpy });

describe('Foo logger', function() {
  it('should log something', function() {
    foo.logSomething();

    // So this fails, unfortunately.
    infoSpy.calledOnce.should.equal(true);
    infoSpy.calledWithExactly('something').should.equal(true);
  });
});
