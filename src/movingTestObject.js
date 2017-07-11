var MovingTestObject = function(top, left, _) {
  StaticTestObject.apply(this, arguments);
};

MovingTestObject.prototype = Object.create(Dancer.prototype);
MovingTestObject.prototype.constructor = MovingTestObject;
MovingTestObject.prototype.oldStep = Dancer.prototype.step;

MovingTestObject.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if (Math.random() < .5) {
    this.left -= Math.random() * 100;
    this.top += Math.random() * 100;
  } else {
    this.left += Math.random() * 100;
    this.top -= Math.random() * 100;
  }
  // this.setPosition(this.top, this.left);
  this.$node.animate({top: this.top, left: this.left}, this.timeBetweenSteps);
};
