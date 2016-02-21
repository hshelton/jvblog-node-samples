require('should');

var fs     = require('fs');
var rewire = require('rewire');
var count  = rewire('./count');
var log    = require('./log');

describe('counting server starts', function() {
  describe('_countStart', function() {
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
      
      fs.appendFileSync(logFileName, '2016-02-20 14:53:09 - server started\n');
      fs.appendFileSync(logFileName, '2016-02-20 14:55:50 - server started\n');

      // Get the private _countStart function. We use rewire, because the
      // function is not in module.exports so we can't access it directly.
      var _countStart = count.__get__('_countStart');

      var numStart = _countStart(logFileName);
      numStart.should.equal(2);
    });
  });

  describe('countStart', function() {
    it('should respond with the number of times the server was started', function() {
      var dataSent;
      var fakeResObject = {
        send: function(data) {
          dataSent = data;
        }
      };

      var logFileName = 'testfile.log';
      log.setFile(logFileName);

      var logFileArgument;

      // We overwrite the private _countStart function so it returns what we
      // want. After all, we are testing the countStart function here; the
      // _countStart function has already been tested above.
      // Also, we want to verify that countStart calls _countStart with the correct
      // filename argument. 
      // The __set__() call returns a function that, when called, resets the
      // overwritten function back to its original.
      var reset = count.__set__('_countStart', function(filename) {
        logFileArgument = filename;
        return 2;
      });

      count.countStart({}, fakeResObject);
      dataSent.should.eql({ numStart: 2 });
      logFileArgument.should.equal(logFileName);

      reset();
    });
  });
});
