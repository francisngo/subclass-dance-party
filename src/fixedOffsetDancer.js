var FODancer = function(_, _, _, objectToFollow) {
  // get object to follow
  this.objectToFollow = objectToFollow || window.followedObject;
  // fast update to follow smooth motion
  this.timeBetweenSteps = 1;
  // make it dancy time
  Dancer.call(this, this.top, this.left, this.timeBetweenSteps);
  // used by subclass that require a steadily incrementing value (e.g. for sine and cosine) or size for collisions
  this.counter = 1;
  this.size = Number(this.$node.css('border-radius').slice(0, -2));
  // get them ready for party time
  this.itsPartyTime = window.itsPartyTime;
  this.lineUp = window.lineUp;
  window.followers.push(this);
  // set random offset and move follower to there
  var randOffset = Math.random() * 2 * Math.PI;
  this.xOffset = Math.cos(randOffset) * 160 + 140;
  this.yOffset = Math.sin(randOffset) * 160 + 140;
  this._updatePosition();
};

FODancer.prototype = Object.create(Dancer.prototype);
FODancer.prototype.constructor = FODancer;
FODancer.prototype.oldStep = Dancer.prototype.step;

FODancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  var partyFunc = false;
  if (this.itsPartyTime) {
    partyFunc = this.partyTime.bind(this);
  }
  this._offsetDancerStep(partyFunc, 10);
};

FODancer.prototype._getFollowedProps = function() {
  var followedProps = this.followedObject.$node.css(['border-radius', 'width', 'height']);
  for (var key in followedProps) {
    followedProps[key] = Number(followedProps[key].slice(0, -2));
    return followedProps;
  }
};

FODancer.prototype._offsetDancerStep = function(infrequentFunc, throttle) {
  if (this.lineUp) {
    return;
  }
  this._updatePosition();
  this.setPosition(this.top, this.left);
  if (this.counter++ % (throttle || 100) === 0 && infrequentFunc) {
    infrequentFunc();
  }
};

FODancer.prototype._updatePosition = function() {
  var newOffsets = this._calculateOffset();
  this.top = this.objectToFollow.top + newOffsets.top;
  this.left = this.objectToFollow.left + newOffsets.left;
};

FODancer.prototype._calculateOffset = function() {
  return {top: this.yOffset, left: this.xOffset};
};

FODancer.prototype.partyTime = function() {
  this.$node.css('border-color', getRandomColor());
  this.$node.toggleClass('squareDancer');
};

FODancer.prototype._evasiveManouvre = function(time, func) {
  time = time || 100;
  var randomNum = Math.random() * 2 - 1;
  this.top += 100 * Math.sin(randomNum);
  this.left += 100 * Math.cos(randomNum);
  this.$node.animate({'top': this.top, 'left': this.left}, time);
  this.positionBeforeEvading = this.top;
  this.waiting = true;
  setTimeout(func || this._evasiveFollowupAction.bind(this), time + 1);
};
