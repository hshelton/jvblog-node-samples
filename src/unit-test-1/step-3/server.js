var express = require('express');

var count   = require('./count');
var log     = require('./log');
log.setFile(__dirname + '/server.log');

var app = express();

app.get('/count/start', count.countStart);

var server = app.listen(64001, function () {
  log.logMessage('server started');
  
  var host = server.address().address
  var port = server.address().port

  console.log("Unit test 1 app v3 listening at http://%s:%s", host, port)
});
