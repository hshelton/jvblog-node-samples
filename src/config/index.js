'use strict';

var defaultConfig = {
  db: {
    uri: 'mongodb://localhost/blogcode'
  }
};
var localConfig;

try {
  localConfig = require('./local.js');
}
catch(err) {
  console.log('Error loading src/config/local.js: %s', err);
  console.log('Please make sure that src/config/local.js exists and contains no errors.');
  console.log('You can copy src/config/local.example.js to src/config.local.js and edit it.')
  process.exit(1);
}

module.exports = localConfig;