var express = require('express');
var moment  = require('moment');
var fs      = require('fs');
var count   = require('./count');

var app = express();

app.get('/count/start', count.countStart);

var server = app.listen(64001, function () {
  var msg = moment().format('YYYY-MM-DD HH:mm:ss') + ' - server started\n';
  fs.appendFileSync(__dirname + '/server.log', msg);
  
  var host = server.address().address
  var port = server.address().port

  console.log("Unit test 1 app v2 listening at http://%s:%s", host, port)
});
