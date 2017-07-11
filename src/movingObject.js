var MovingTestObect = function(top, left) {
  this.timeBetweenSteps = 500;
  Dancer.apply(this, arguments);
  this.$node.addClass('largeObject');
};

movingObect.prototype = Object.create(Dancer.prototype);
movingObect.prototype.constructor = movingObect;
movingObect.prototype.oldStep = Dancer.prototype.step;

movingObect.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if (Math.random() < .5) {
    this.left -= Math.random() * 30;
    this.top += Math.random() * 30;
  } else {
    this.left += Math.random() * 30;
    this.top -= Math.random() * 30;
  }
  this.setPosition(this.top, this.left);
};
