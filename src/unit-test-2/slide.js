'use strict';

function canUseSlide(person) {
  if (Array.isArray(person) && person.length > 1) {
    // Sneaky! Trying to go with more than 1 person together!
    return {
      canUse: false,
      reason: 'Only 1 person at a time!',
    };
  }

  if (person.weight > 125) {
    // We don't want the slide to break!
    return {
      canUse: false,
      reason: 'This slide is for children only.',
    };
  }

  if (person.height < 90) {
    // Small children are not allowed on this dangerous slide.
    return {
      canUse: false,
      reason: 'You are not tall enough yet.',
    };
  }

  if (person.isWearing('shoes')) {
    // You're only allowed to go down the slide barefoot.
    return {
      canUse: false,
      reason: 'You must take off your shoes first!',
    };
  }

  return {
    canUse: true,
    reason: ''
  };
}

module.exports = {
  canUseSlide: canUseSlide
};
