'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  email    : { type: String },
  firstName: { type: String },
  lastName : { type: String },
});
var User = mongoose.model('User', UserSchema);

var CarSchema = new Schema({
  ownerId       : { type: Schema.Types.ObjectId, ref: 'User' },
  colour        : { type: String },
  numberOfWheels: { type: Number },
});
var Car = mongoose.model('Car', CarSchema);

var BicycleSchema = new Schema({
  ownerId       : { type: Schema.Types.ObjectId, ref: 'User' },
  colour        : { type: String },
  numberOfWheels: { type: Number },
});
var Bicycle = mongoose.model('Bicycle', BicycleSchema);

module.exports = {
  User   : User,
  Car    : Car,
  Bicycle: Bicycle
};
