// Express is a web framework for node.js.
var express = require('express');

// Moment is a date manipulation library.
var moment  = require('moment');

// Fs is a core module of node.js to manipulate the file system.
var fs      = require('fs');

var app = express();

// When a http request is done on /count/start, execute this code.
// req contains request information, which we are not using.
// res is the response object.
app.get('/count/start', function (req, res) {
  // Read the server log file ...
  var data = fs.readFileSync(__dirname + '/server.log').toString();

  // ... and count how many lines contain the words 'server started'.
  var numStartLines = data
    .split(/\r\n|\r|\n/)
    .filter(function(line) { return /server started/.test(line); })
    .length;

  // Send a JSON answer that shows how many times the server has been started.
  res.send({ numStart: numStartLines });
});

var server = app.listen(64001, function () {
  // When the server starts, log that it started.
  var msg = moment().format('YYYY-MM-DD HH:mm:ss') + ' - server started\n';
  fs.appendFileSync(__dirname + '/server.log', msg);
  
  var host = server.address().address
  var port = server.address().port

  console.log("Unit test 1 app v1 listening at http://%s:%s", host, port)
});
