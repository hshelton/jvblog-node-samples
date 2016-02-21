var fs = require('fs');

function countStart(req, res) {
  var data = fs.readFileSync(__dirname + '/server.log').toString();
  var numStartLines = data
    .split(/\r\n|\r|\n/)
    .filter(function(line) { return /server started/.test(line); })
    .length;
  res.send({ numStart: numStartLines });
}

module.exports = {
  countStart: countStart
};
