$(function() {
	
	$('#drawer').sideDrawer({ 
     side       : $('#side'),
     main       : $('#main'),
     fullscreen : true
 });
 
 $(window).bind('sideDrawerAfterTransition', function(e, open) {
   
 });
	 
});




