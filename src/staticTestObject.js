var StaticTestObject = function(top, left, _) {
  Dancer.apply(this, arguments);
  this.timeBetweenSteps = 500;
  this.$node.addClass('largeObject');
  window.followedObject = this;
};

StaticTestObject.prototype = Object.create(Dancer.prototype);
StaticTestObject.prototype.constructor = StaticTestObject;
StaticTestObject.prototype.oldStep = Dancer.prototype.step;

StaticTestObject.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
};
