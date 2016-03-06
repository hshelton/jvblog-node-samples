'use strict';

var myLogger = require('./mylogger');

function calculateTotal(items) {
  var totalPrice = 0;
  var totalItems = 0;

  items.forEach(function(item) {
    totalItems += item.count;
    totalPrice += item.count * item.price;
  });

  if (totalPrice > 1000) {
    myLogger.log('An order of ' + totalPrice + ' is being considered!');
  }

  return {
    totalPrice: totalPrice,
    totalItems: totalItems,
  };
}

module.exports = {
  calculateTotal: calculateTotal
};
