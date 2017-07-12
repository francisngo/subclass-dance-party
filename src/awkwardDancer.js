var AwkwardDancer = function(_, _, _, objectToFollow) {
  FODancer.call(this, arguments);
  this.$node.on('mouseover', (function(event) {
    console.log('mouse');
    this.stepping = false;
    this.bobbing = false;
    this._evasiveManouvre();
  }).bind(this));
  this.$node.css({
    'border': '25px solid ' + getRandomColor(),
    'border-radius': '25px'
  });
  this.timeBetweenSteps = 10;
  this.size = 40;
  this.stepping = true;
  window.awkwardDancers++;
};

AwkwardDancer.prototype = Object.create(FODancer.prototype);
AwkwardDancer.prototype.constructor = AwkwardDancer;
AwkwardDancer.prototype.oldStep = Dancer.prototype.step;

AwkwardDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // check if should be waiting for animation to complete
  if (this.waiting) {
    return;
  }
  // check if should be stepping--changed by mouseover
  if (!this.stepping) {
    if (this.bobbing && !this.lineUp) {
      this.counter++;
      this._bobAwkwardly();
    }
    return;
  }
  // check for collisions
  this._checkForCollisions();
  if (this.collided) {
    this.collided = false;
    this._evasiveManouvre();
  }
  // set up party time and call follower step
  var partyFunc = false;
  if (this.itsPartyTime) {
    partyFunc = this.partyTime.bind(this);
  }
  this._offsetDancerStep(partyFunc, 30);
};

AwkwardDancer.prototype._calculateOffset = function() {
  var topOffset = Math.sin(this.counter / 30) * 150 + 150;
  var leftOffset = Math.cos(this.counter / 30) * 150 + 150;
  return {top: topOffset, left: leftOffset};
};

AwkwardDancer.prototype._bobAwkwardly = function(factor) {
  // waiting to complete evasive manouvre
  if (this.waiting) {
    return;
  }
  // check for collisions and avoid again
  this._checkForCollisions();
  if (this.collided) {
    this.collided = false;
    this._evasiveManouvre();
  }
  // bob
  this.top = this.positionBeforeEvading + Math.sin(this.counter / 15) * 55;
  this.setPosition(this.top, this.left);
};

AwkwardDancer.prototype._evasiveFollowupAction = function() {
  this.waiting = false;
  this.bobbing = true;
};

AwkwardDancer.prototype._cartesianDistance = function(otherFollower) {
  return Math.sqrt(Math.pow(this.top - otherFollower.top, 2) + Math.pow(this.left - otherFollower.left, 2)) <= this.size;
};

AwkwardDancer.prototype._checkForCollisions = function() {
  this.collided = window.followers.reduce((function(acc, follower) {
    if (follower === this) {
      return acc;
    }
    return acc || this._cartesianDistance(follower);
  }).bind(this), false);
};
