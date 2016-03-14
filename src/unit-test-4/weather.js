var sprintf = require('sprintf-js').sprintf;
var weatherService = require('./weather.service');

function generateWeatherReport(user) {
  var city = user.location.city;
  var countryCode = user.location.countryCode;
  return weatherService.fetchLocalWeather(city, countryCode)
  .then(function(weatherData) {
    return sprintf('The weather in %s, %s is %s.',
      city, countryCode, weatherData.summary);
  });
}

module.exports = {
  generateWeatherReport: generateWeatherReport
};
