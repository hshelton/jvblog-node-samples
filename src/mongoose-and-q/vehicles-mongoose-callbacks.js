'use strict';

var mongoose = require('mongoose');
var config   = require('../config');
var models   = require('./models');

mongoose.connect(config.db.mongo.uri);

var email = 'rupert@example.com';

function getVehicles(email, cb) {
  models.User.findOne({ email: email}, function(err, user) {
    if (err) {
      return cb(err);
    }
    models.Car.find({ ownerId: user._id }, function(err, cars) {
      if (err) {
        return cb(err);
      }
      models.Bicycle.find({ ownerId: user._id }, function(err, bicycles) {
        if (err) {
          return cb(err);
        }
        cb(null, {
          cars: cars,
          bicycles: bicycles
        });
      });
    });
  });
}

getVehicles(email, function(err, vehicles) {
  if (err) {
    console.error('Something went wrong: ' + err);
  }
  else {
    console.info(vehicles);
  }
  mongoose.disconnect();
});
