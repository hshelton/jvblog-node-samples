'use strict';

var Q        = require('q');
var mongoose = require('mongoose');
var config   = require('../config');
var models   = require('./models');

mongoose.connect(config.db.mongo.uri);

var email = 'rupert@example.com';

function getVehicles(email) {
  var foundCars, foundUser;
  return Q(models.User.findOne({ email: email }).exec())
  .then(function(user) {
    foundUser = user;
    return Q(models.Car.find({ ownerId: user._id }).exec())
  })
  .then(function(cars) {
    foundCars = cars;
    return Q(models.Bicycle.find({ ownerId: foundUser._id }).exec())
  })
  .then(function(bicycles) {
    return {
      bicycles: bicycles,
      cars: foundCars
    };
  });
}

getVehicles(email)
.then(function(vehicles) {
  console.log(vehicles);
})
.catch(function(err) {
  console.error('Something went wrong: ' + err);
})
.done(function() {
  mongoose.disconnect();
});
