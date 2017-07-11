var RotaryDancer = function(_, _, _, objectToFollow) {
  this.objectToFollow = objectToFollow || window.followedObject;
  this._updatePosition();
  this.timeBetweenSteps = 1;
  this.counter = 1;
  Dancer.call(this, this.top, this.left, this.timeBetweenSteps);
};

RotaryDancer.prototype = Object.create(Dancer.prototype);
RotaryDancer.prototype.constructor = RotaryDancer;
RotaryDancer.prototype.oldStep = Dancer.prototype.step;

RotaryDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html t
  this.counter++;
  this._updatePosition();
  this.setPosition(this.top, this.left);
};

RotaryDancer.prototype._updatePosition = function() {
  var newCoords = this._calculateOffset();
  this.top = Number(this.objectToFollow.$node.css('top').slice(0, -2)) + newCoords.top;
  this.left = Number(this.objectToFollow.$node.css('left').slice(0, -2)) + 100;
};

RotaryDancer.prototype._calculateOffset = function() {
  var topOffset = Math.sin((this.counter / 10000) * Math.PI * 100);
  return {top: topOffset, left: 0};
};
