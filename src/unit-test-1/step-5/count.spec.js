require('should');

var fs     = require('fs');
var rewire = require('rewire');
var count  = rewire('./count');
var log    = require('./log');

describe('counting server starts', function() {
  describe('_readFile', function() {
    var logFileName = __dirname + '/unit-test-file.log';
    function cleanupTestFile() {
      if (fs.existsSync(logFileName)) {
        fs.unlinkSync(logFileName);
      }
    }
    beforeEach(cleanupTestFile);
    afterEach(cleanupTestFile);

    it('should read the log file', function() {
      var _readFile = count.__get__('_readFile');

      fs.appendFileSync(logFileName, 'line one\n');
      fs.appendFileSync(logFileName, 'line two\n');

      var data = _readFile(logFileName);
      data.should.equal('line one\nline two\n');
    });
  });

  describe('_countMatchingLinesInString', function() {
    it('should count the number of lines that match in a string', function() {
      var _countMatchingLinesInString = count.__get__('_countMatchingLinesInString');

      var string = 'blah server started blah\n' +
                   'this line should not match\n' +
                   'server started server started should count as one\n';
      var regexp = /server started/;
      var num = _countMatchingLinesInString(string, regexp);
      num.should.equal(2);
    });
  });

  describe('_countStart', function() {
    it('should call _readFile and _countMatchingLinesInString', function() {
      var _readFileArg, _countArg1, _countArg2;
      var fileContents = '123 server started\n456 server started server started\nthird line';
      var reset1 = count.__set__('_readFile', function(arg) {
        _readFileArg = arg;
        return fileContents;
      });
      var reset2 = count.__set__('_countMatchingLinesInString', function(arg1, arg2) {
        _countArg1 = arg1;
        _countArg2 = arg2;
      });

      var filename = 'testfile.log';

      var _countStart = count.__get__('_countStart');
      _countStart(filename);

      _readFileArg.should.eql(filename);
      _countArg1.should.eql(fileContents);
      _countArg2.should.eql(/server started/);
      reset1();
      reset2();
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

