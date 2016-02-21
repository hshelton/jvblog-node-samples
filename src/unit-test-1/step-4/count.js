var fs  = require('fs');
var log = require('./log');

function countStart(req, res) {
  var numStartLines = _countStart(log.getFile());
  res.send({ numStart: numStartLines });
}

function _countStart(filename) {
  var data = fs.readFileSync(filename).toString();
  var numStartLines = data
    .split(/\r\n|\r|\n/)
    .filter(function(line) { return /server started/.test(line); })
    .length;
  return numStartLines;
}

module.exports = {
  countStart: countStart
};
