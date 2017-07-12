var WeirdRotaryDancer = function(_, _, _, objectToFollow) {
  FODancer.call(this, arguments);
  this.rotationSpeed = 40;
  this.xFactor = Math.random() * 300;
  this.yFactor = Math.random() * 300;
};

WeirdRotaryDancer.prototype = Object.create(FODancer.prototype);
WeirdRotaryDancer.prototype.constructor = WeirdRotaryDancer;
WeirdRotaryDancer.prototype.oldStep = Dancer.prototype.step;

WeirdRotaryDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  //  check for party time
  var partyFunc = false;
  if (this.itsPartyTime) {
    partyFunc = this.partyTime.bind(this);
    this.rotationSpeed = 35;
  }
  // perform all other follower steps
  this._offsetDancerStep(partyFunc, 10);
};

WeirdRotaryDancer.prototype._calculateOffset = function() {
  var topOffset = Math.sin(this.counter / 30) * 60 + 140 + Math.sin(this.counter / this.rotationSpeed) * this.xFactor;
  var leftOffset = Math.cos(this.counter / 30) * 60 + 140 + Math.cos(this.counter / this.rotationSpeed) * this.yFactor;
  return {top: topOffset, left: leftOffset};
};

WeirdRotaryDancer.prototype._evasiveAction = function() {
  this.waiting = false;
};


