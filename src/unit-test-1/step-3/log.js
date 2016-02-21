'use strict';

var fs     = require('fs');
var moment = require('moment');

var logFileName;

function getFile() {
  return logFileName;
}

function setFile(filename) {
  logFileName = filename;
}

function logMessage(message) {
  fs.appendFileSync(getFile(), moment().format('YYYY-MM-DD HH:mm:ss') + ' - ' + message + '\n');
}

module.exports = {
  getFile   : getFile,
  setFile   : setFile,
  logMessage: logMessage,
};
