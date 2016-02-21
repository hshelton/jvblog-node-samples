var fs  = require('fs');
var log = require('./log');

function countStart(req, res) {
  var numStartLines = _countStart(log.getFile());
  res.send({ numStart: numStartLines });
}

function _countStart(filename) {
  var data = _readFile(filename);
  return _countMatchingLinesInString(data, /server started/);
}

function _readFile(filename) {
  return fs.readFileSync(filename).toString();
}

function _countMatchingLinesInString(string, regexp) {
  return string.split(/\r\n|\r|\n/)
    .filter(function(line) { return regexp.test(line); })
    .length;
}

module.exports = {
  countStart: countStart
};
