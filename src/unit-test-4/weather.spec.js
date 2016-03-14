require('should');
var sinon = require('sinon');
var Q = require('q');

var weather = require('./weather');
var weatherService = require('./weather.service');

describe('generateWeatherReport', function() {
  it('should generate a weather report', function(done) {
    var user = {
      location: {
        city: 'Amsterdam',
        countryCode: 'NL'
      }
    };

    var fetchLocalWeatherStub = sinon.stub(weatherService, 'fetchLocalWeather');
    fetchLocalWeatherStub.withArgs('Amsterdam', 'NL')
                         .returns(Q.resolve({ summary: 'sunny and great' }));

    weather.generateWeatherReport(user)
    .then(function(report) {
      report.should.equal('The weather in Amsterdam, NL is sunny and great.');
      done();
    })
    .catch(function(err) {
      done(err);
    })
    .done(function() {
      fetchLocalWeatherStub.restore();
    });
  });
});
