'use strict';

// This spec file uses log4js-test-appender for testing.

// We can now load foo.js at any point, because we are no longer
// stubbing log4js.getLogger().
var foo    = require('./foo');
var should = require('should');

var testAppender = require('log4js-test-appender');
testAppender.init();

describe('Foo logger', function() {
  it('should log something', function() {
    foo.logSomething();

    var logEvents = testAppender.getLogEvents();
    logEvents.should.have.length(1);
    logEvents[0].level.levelStr.should.equal('INFO');
    logEvents[0].data[0].should.equal('something');
  });
});
