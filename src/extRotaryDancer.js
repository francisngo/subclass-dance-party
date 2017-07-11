var ExtRotaryDancer = function(_, _, _, objectToFollow) {
  FODancer.call(this, arguments);
  this.rotationSpeed = 300;
};

ExtRotaryDancer.prototype = Object.create(FODancer.prototype);
ExtRotaryDancer.prototype.constructor = ExtRotaryDancer;
ExtRotaryDancer.prototype.oldStep = Dancer.prototype.step;

ExtRotaryDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // call follower specific steps
  var partyFunc = false;
  if (this.itsPartyTime) {
    partyFunc = this.partyTime.bind(this);
    this.rotationSpeed = 20;
  }
  this._offsetDancerStep(partyFunc, 10);
};

ExtRotaryDancer.prototype._calculateOffset = function() {
  var topOffset = Math.sin(this.counter / 20) * 60 + 140 + Math.sin(this.counter / this.rotationSpeed) * 220;
  var leftOffset = Math.cos(this.counter / 20) * 60 + 140 + Math.cos(this.counter / this.rotationSpeed) * 220;
  return {top: topOffset, left: leftOffset};
};
