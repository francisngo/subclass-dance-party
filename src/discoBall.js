var DiscoBall = function() {
  this.$node = $('<div class="ball-container x"><div class="disco y"></div></div>');
  Object.defineProperty(this, 'top', {get: function() { return $(this.$node.children()[0]).position().top; } } );
  Object.defineProperty(this, 'left', {get: function() { return this.$node.position().left; } } );
  window.followedObject = this;
};
