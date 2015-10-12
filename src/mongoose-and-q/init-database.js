'use strict';

var mongoose = require('mongoose');
var config   = require('../config');
var models   = require('./models');

var Q = require('q');

console.info('Connecting to mongo db: %s', config.db.mongo.uri);
mongoose.connect(config.db.mongo.uri, function(err) {
  if (err) {
    console.error('Could not connect to mongo database. Error: %s', err);
    console.error('Please make sure mongodb is running and local.js points to it!');
    process.exit(1);
  }
});

return Q.fcall(function() {
  var data = {
    'email'    : 'rupert@example.com',
    'firstName': 'Rupert',
    'lastName' : 'Example',
  };

  console.log('Upserting user %s...', data.email);
  return upsertObject(models.User, data);
})
.then(function(user) {
  console.log('  Ok. user _id=%s', user._id);

  var car = {
    'ownerId' : user._id,
    'colour' : 'red',
    'numberOfWheels' : 5
  };
  var bicycle1 = {
    'ownerId' : user._id,
    'colour' : 'blue',
    'numberOfWheels' : 2
  };
  var bicycle2 = {
    'ownerId' : user._id,
    'colour' : 'green',
    'numberOfWheels' : 1
  };

  console.info('Upserting 1 car and 2 bicycles...');
  return [
    upsertObject(models.Car, car),
    upsertObject(models.Bicycle, bicycle1),
    upsertObject(models.Bicycle, bicycle2),
  ];
})
.spread(function(car, bicycle1, bicycle2) {
  console.info('  Ok. Colours are: %s, %s and %s.', car.colour, bicycle1.colour, bicycle2.colour);
})
.catch(function(err) {
  console.error(err);
})
.done(function() {
  console.log('All done. Disconnecting from mongo db.');
  mongoose.disconnect();
});

function upsertObject(model, data) {
  return Q(model.findOneAndUpdate(data, data, { upsert: true }).exec());
}
