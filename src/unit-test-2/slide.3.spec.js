require('should');
var slide = require('./slide');

describe('canUseSlide 3', function() {
  function createPerson(height, weight, isWearingShoes) {
    return {
      height: height,
      weight: weight,
      isWearing: function() { return isWearingShoes; }
    }
  };

  var testCases = [
    {
      name: 'child the slide is intended for',
      person: createPerson(105, 15, false),
      reason: '',
    },
    {
      name: 'large adult instead of child',
      person: createPerson(193, 151, false),
      reason: 'This slide is for children only.',
    },
    {
      name: 'too small child',
      person: createPerson(83, 11, false),
      reason: 'You are not tall enough yet.',
    },
    {
      name: 'wearing shoes',
      person: createPerson(105, 15, true),
      reason: 'You must take off your shoes first!',
    },
    {
      name: '2 children at the same time',
      person: [createPerson(105, 15, false), createPerson(115, 17, false)],
      reason: 'Only 1 person at a time!',
    },
  ];

  testCases.forEach(function(tc) {
    it('should verify if you can use the slide: ' + tc.name, function() {
      var result = slide.canUseSlide(tc.person);
      var expectedResult = {
        canUse: tc.reason.length === 0,
        reason: tc.reason,
      }
      result.should.eql(expectedResult);
    });
  });
});