'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('foo');

function logSomething() {
  logger.info('something');
}

module.exports = {
  logSomething: logSomething
};
