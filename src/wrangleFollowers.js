var moveFollowersToSides = function() {
  // iterate through array and stop motion
  console.log('Lining up');
  if (window.itsPartyTime) {
    changeFollowerProps('itsPartyTime');
  }
  changeFollowerProps('lineUp');
  // split into sides
  var leftHalf = window.followers.slice(0, window.followers.length / 2);
  var rightHalf = window.followers.slice(window.followers.length / 2);
  // animate movement to sides
  leftHalf.forEach(function(follower, index, array) {
    follower.top = $('body').height() / array.length * index + 60;
    follower.left = 30;
    follower.$node.animate({'top': follower.top, 'left': follower.left});
  });
  rightHalf.forEach(function(follower, index, array) {
    follower.top = $('body').height() / array.length * index + 60;
    follower.left = $('body').width() - 30;
    console.log($('body').width);
    follower.$node.animate({'top': follower.top, 'left': follower.left});
  });
};

var startFollowerParty = function() {
  var partyMode = function() {
    changeFollowerProps('itsPartyTime');
    if (window.lineUp) {
      console.log('change lineup');
      changeFollowerProps('lineUp');
    }
  };
  // instantaneous if dancefloor pumping
  if (!window.lineUp) {
    partyMode();
    return;
  }
  // delay for animation if line up
  setTimeout(partyMode, 350);
  window.followers.forEach(function(follower) {
    follower._updatePosition();
    follower.$node.animate({'top': follower.top, 'left': follower.left}, 350);
  });
};

var simulateCollision = function() {
  // iterate through all followers and set to collided
  window.followers.forEach(function(follower) {
    follower.collided = true;
  });
};

var changeFollowerProps = function(dancerChangerProp) {
  console.log(dancerChangerProp);
  window.followers.forEach(function(follower) {
    follower[dancerChangerProp] = !follower[dancerChangerProp];
  });
  window[dancerChangerProp] = !window[dancerChangerProp];
};

var MDK = function() {
  window.itsPartyTime = false;
  window.followers.forEach(function(follower) {
    follower.setPosition(0, 0);
    follower.dead = true;
    follower.$node.hide('slow');
    follower.deadStep = follower.step;
    setTimeout(function() {
      this.step = null;
    }.bind(follower), 500);
  });
  setTimeout(function() {
    window.followers = [];
    window.awkwardDancers = 0;
  });
};
