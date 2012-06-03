$(function() {
	
  $('#drawer').sideDrawer({ 
    side       : $('#side')
  , main       : $('#main')
  });
 
  $(window).bind('sideDrawerAfterTransition', function(e, open) {
    
  });
	 
});