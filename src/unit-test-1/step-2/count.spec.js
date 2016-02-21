require('should');

var count = require('./count');

describe('countStart', function() {
  it('should count the number of times the server was started', function() {
    var dataSent;
    
    var fakeResObject = {
      send: function(data) {
        dataSent = data;
      }
    };

    count.countStart({}, fakeResObject);
    dataSent.should.have.keys(['numStart']);
    dataSent.numStart.should.be.a.number;
  });
});
