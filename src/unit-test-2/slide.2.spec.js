require('should');
var slide = require('./slide');

describe('canUseSlide 2', function() {
  var testCases = [
    {
      name: 'child the slide is intended for',
      person: {
        height: 105,
        weight: 15,
        isWearing: function() { return false; }
      },
      expectedResult: {
        canUse: true,
        reason: '',
      }
    },
    {
      name: 'large adult instead of child',
      person: {
        height: 193,
        weight: 151,
        isWearing: function() { return false; }
      },
      expectedResult: {
        canUse: false,
        reason: 'This slide is for children only.',
      }
    },
    {
      name: 'too small child',
      person: {
        height: 83,
        weight: 11,
        isWearing: function() { return false; }
      },
      expectedResult: {
        canUse: false,
        reason: 'You are not tall enough yet.',
      }
    },
    {
      name: 'wearing shoes',
      person: {
        height: 105,
        weight: 15,
        isWearing: function() { return true; }
      },
      expectedResult: {
        canUse: false,
        reason: 'You must take off your shoes first!',
      }
    },
    {
      name: '2 children at the same time',
      person: [{
        height: 105,
        weight: 15,
        isWearing: function() { return false; }
      }, {
        height: 115,
        weight: 17,
        isWearing: function() { return false; }
      }],
      expectedResult: {
        canUse: false,
        reason: 'Only 1 person at a time!',
      }
    },
  ];

  testCases.forEach(function(tc) {
    it('should verify if you can use the slide: ' + tc.name, function() {
      var result = slide.canUseSlide(tc.person);
      result.should.eql(tc.expectedResult);
    });
  });
});