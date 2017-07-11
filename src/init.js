$(document).ready(function() {
  window.dancers = [];
  window.followers = [];
  window.followedObject = null;
  window.colors = ['olive', 'maroon', 'violet', 'lilac', 'red', 'green', 'blue', 'navy', 'aquamrine', 'gold'];
  window.getRandomColor = function() {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // click handler to add new dancers
  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    if ($(this).data('is-follower') && !window.followedObject) {
      var $warning = $('<span>NEEDS AN OBJECT TO FOLLOW</span>');
      $('body').append($warning);
      setTimeout($warning.hide.bind($warning), 500);
      return;
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

  // click handler to change dancers
  $('.changeDancerButton').on('click', function(event) {
    var dancerChangerProp = $(this).data('dancer-changer-function-name');
    console.log(dancerChangerProp);
    window.followers.forEach(function(follower) {
      follower[dancerChangerProp] = !follower[dancerChangerProp];
      follower.lineUp = false;
    });
  });

  // creates a disco ball and puts it on the page
  var discoBall = new DiscoBall();
  $('body').append(discoBall.$node);

  // pauses the party
  $('#stopTheParty').on('click', function(event) {
    // code to stop disco ball here

    // code to stop dancers here
    window.moveFollowersToSides();
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
