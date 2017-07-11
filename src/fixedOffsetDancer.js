var FODancer = function(_, _, _, objectToFollow) {
  this.objectToFollow = objectToFollow || window.followedObject;
  this._updatePosition();
  this.timeBetweenSteps = 1;
  Dancer.call(this, this.top, this.left, this.timeBetweenSteps);
  this.$node.css('color', 'blue');
};

FODancer.prototype = Object.create(Dancer.prototype);
FODancer.prototype.constructor = FODancer;
FODancer.prototype.oldStep = Dancer.prototype.step;

FODancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html t
  this._updatePosition();
  this.setPosition(this.top, this.left);
};

FODancer.prototype._updatePosition = function() {
  this.top = Number(this.objectToFollow.$node.css('top').slice(0, -2));
  this.left = Number(this.objectToFollow.$node.css('left').slice(0, -2));
};
