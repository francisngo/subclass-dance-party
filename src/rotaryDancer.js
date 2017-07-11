var RotaryDancer = function(_, _, _, objectToFollow) {
  FODancer.call(this, arguments);
};

RotaryDancer.prototype = Object.create(FODancer.prototype);
RotaryDancer.prototype.constructor = RotaryDancer;
RotaryDancer.prototype.oldStep = Dancer.prototype.step;

RotaryDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep.call(this);
  // set up party time
  var partyFunc = false;
  if (this.itsPartyTime) {
    partyFunc = this.partyTime.bind(this);
  }
  this._offsetDancerStep(partyFunc, 30);
};

RotaryDancer.prototype._calculateOffset = function() {
  var topOffset = Math.sin(this.counter / 40) * 160 + 140;
  var leftOffset = Math.cos(this.counter / 40) * 160 + 140;
  return {top: topOffset, left: leftOffset};
};