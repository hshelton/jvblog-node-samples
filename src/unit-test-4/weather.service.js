var Q = require('q');

function fetchLocalWeather(city, countryCode) {
  // Normally, this function would perform an HTTP call to get the weather
  // data. However, here we just fake it. Note that this is a pretty
  // accurate description of an autumn or winter day in Amsterdam.
  return Q.resolve({ summary: 'rainy, cold and miserable.' });
}

module.exports = {
  fetchLocalWeather: fetchLocalWeather
};
