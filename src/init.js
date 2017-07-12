$(document).ready(function() {
  window.dancers = [];
  window.followers = [];
  window.followedObject = null;
  window.lineUp = false;
  window.itsPartyTime = false;
  window.awkwardDancers = 0;
  window.colors = ['olive', 'maroon', 'violet', 'lilac', 'red', 'green', 'blue', 'navy', 'aquamarine', 'gold'];
  window.getRandomColor = function() {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // click handler to add new dancers
  $('.addDancerButton').on('click', function(event) {
    if ($(this).data('is-follower') && !window.followedObject) {
      var $warning = $('<span>NEEDS AN OBJECT TO FOLLOW</span>');
      $('body').append($warning);
      setTimeout($warning.hide.bind($warning), 500);
      return;
    }
    if (window.lineUp) {
      var $warning = $('<span>NO PARYTING NOW!</span>');
      $('body').append($warning);
      setTimeout($warning.hide.bind($warning), 500);
      return;
    }
    // disable dancers button if dancefloor exceeds 10
    if (window.awkwardDancers === 10) {
      $('.awkwardDancer').prop('disabled', true);
      alert('Too Many Ugly Faces On The Dancefloor');
    }
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    console.log(dancerMakerFunctionName);

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  // creates a disco ball and puts it on the page
  var discoBall = new DiscoBall();
  $('body').append(discoBall.$node);

  // starts the party
  $('#startTheParty').on('click', function(event) {
    startFollowerParty();
    setTimeout(function() {
      $('body .ball-container').addClass('x');
      $('body .disco').addClass('y');
      $('body .disco').css('margin', '0');
    }, 350);
  });

  // black backgrond
  var blackBackground = function() {
    $('body').css('background-color', 'black');
  };

  // pauses the party
  $('#stopTheParty').on('click', function(event) {
    setTimeout(blackBackground(), 300);
    // code to stop disco ball here
    $('body .ball-container').removeClass('x');
    $('body .disco').removeClass('y');
    $('body .disco').css('margin', '0 auto');

    // code to stop dancers here
    window.moveFollowersToSides();
  });

  // kills the dancers
  $('#killThemAll').on('click', function(event) {
    MDK();
    setTimeout(blackBackground(), 600);
  });

  // sets up interactive components
  $('body').keypress(function(event) {
    makerFunc = false;
    if (event.charCode === 115) {
      makerFunc = StaticTestObject;
    } else if (event.charCode === 109) {
      makerFunc = MovingTestObject;
    }
    if (makerFunc) {
      var dancer = new makerFunc(
        $('body').height() * Math.random(),
        $('body').width() * Math.random(),
        Math.random() * 100
      );
      console.log(dancer);
      window.dancers.push(dancer);
      $('body').append(dancer.$node);
    }
  });

});
