var fs  = require('fs');
var log = require('./log');

function countStart(req, res) {
  var filename = log.getFile();
  var data = fs.readFileSync(filename).toString();
  var numStartLines = data
    .split(/\r\n|\r|\n/)
    .filter(function(line) { return /server started/.test(line); })
    .length;
  res.send({ numStart: numStartLines });
}

module.exports = {
  countStart: countStart
};
