'use strict';

var Q        = require('q');
var mongoose = require('mongoose');
var config   = require('../config');
var models   = require('./models');

mongoose.connect(config.db.mongo.uri);

var email = 'rupert@example.com';

function getVehicles(email) {
  return Q(models.User.findOne({ email: email }).exec())
  .then(function(user) {
    return Q.all([
      Q(models.Bicycle.find({ ownerId: user._id }).exec()),
      Q(models.Car.find({ ownerId: user._id }).exec())
    ]);
  })
  .spread(function(bicycles, cars) {
    return {
      bicycles: bicycles,
      cars: cars
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
