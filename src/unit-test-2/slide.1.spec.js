require('should');
var slide = require('./slide');

describe('canUseSlide 1', function() {
  it('should verify if you can use the slide: child the slide is intended for', function() {
    var result = slide.canUseSlide({
      height: 105,
      weight: 15,
      isWearing: function() { return false; }
    });
    result.should.eql({
      canUse: true,
      reason: '',
    });
  });
  
  it('should verify if you can use the slide: large adult instead of child', function() {
    var result = slide.canUseSlide({
      height: 193,
      weight: 151,
      isWearing: function() { return false; }
    });
    result.should.eql({
      canUse: false,
      reason: 'This slide is for children only.',
    });
  });
  
  it('should verify if you can use the slide: too small child', function() {
    var result = slide.canUseSlide({
      height: 83,
      weight: 11,
      isWearing: function() { return false; }
    });
    result.should.eql({
      canUse: false,
      reason: 'You are not tall enough yet.',
    });
  });
  
  it('should verify if you can use the slide: wearing shoes', function() {
    var result = slide.canUseSlide({
      height: 105,
      weight: 15,
      isWearing: function() { return true; }
    });
    result.should.eql({
      canUse: false,
      reason: 'You must take off your shoes first!',
    });
  });
  
  it('should verify if you can use the slide: 2 children at the same time', function() {
    var result = slide.canUseSlide([{
      height: 105,
      weight: 15,
      isWearing: function() { return false; }
    }, {
      height: 115,
      weight: 17,
      isWearing: function() { return false; }
    }]);
    result.should.eql({
      canUse: false,
      reason: 'Only 1 person at a time!',
    });
  });
});