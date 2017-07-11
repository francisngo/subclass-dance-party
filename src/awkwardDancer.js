var AwkwardDancer = function(_, _, _, objectToFollow) {
  FODancer.call(this, arguments);
  this.$node.on('mouseover', (function(event) {
    console.log('mouse');
    this.moused = true;
    this.bobbing = false;
    this._evasiveAction();
  }).bind(this));
  this.$node.css({
    'border': '25px solid ' + getRandomColor(),
    'border-radius': '25px'
  });
};

AwkwardDancer.prototype = Object.create(FODancer.prototype);
AwkwardDancer.prototype.constructor = AwkwardDancer;
AwkwardDancer.prototype.oldStep = Dancer.prototype.step;

AwkwardDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // check if avoiding mouse
  if (this.moused) {
    this.counter++;
    if (this.bobbing && !this.lineUp) {
      this._bobAwkwardly();
    }
    return;
  }
  // set up party time and call follower step
  var partyFunc = false;
  if (this.itsPartyTime) {
    partyFunc = this.partyTime.bind(this);
  }
  this._offsetDancerStep(partyFunc, 30);
};

AwkwardDancer.prototype._calculateOffset = function() {
  var topOffset = Math.sin(this.counter / 50) * 150 + 150;
  var leftOffset = Math.cos(this.counter / 50) * 150 + 150;
  return {top: topOffset, left: leftOffset};
};

AwkwardDancer.prototype._bobAwkwardly = function(factor) {
  // use setTimeout... and animate
  this.top = this.base+ Math.sin(this.counter / 50) * 50;
  this.setPosition(this.top, this.left);
};

AwkwardDancer.prototype._evasiveAction = function() {
  var randomNum = Math.random() * 2 - 1;
  this.top += 100 * Math.sin(randomNum);
  this.left += 100 * Math.cos(randomNum);
  this.$node.animate({'top': this.top, 'left': this.left}, 100);
  this.base = this.top;
  setTimeout((function() {
    this.bobbing = true;
  }).bind(this), 101);
};
