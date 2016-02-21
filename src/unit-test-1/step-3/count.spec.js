require('should');

var fs    = require('fs');
var count = require('./count');
var log   = require('./log');

describe('countStart', function() {
  var logFileName = __dirname + '/unit-test-file.log';
  function cleanupTestFile() {
    if (fs.existsSync(logFileName)) {
      fs.unlinkSync(logFileName);
    }
  }
  beforeEach(cleanupTestFile);
  afterEach(cleanupTestFile);

  it('should count the number of times the server was started', function() {
    var dataSent;
    
    var fakeResObject = {
      send: function(data) {
        dataSent = data;
      }
    };

    fs.appendFileSync(logFileName, '2016-02-20 14:53:09 - server started\n');
    fs.appendFileSync(logFileName, '2016-02-20 14:55:50 - server started\n');

    log.setFile(logFileName);

    count.countStart({}, fakeResObject);
    dataSent.should.eql({ numStart: 2 });
  });
});
