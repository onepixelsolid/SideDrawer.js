!function( $ ){

  "use strict"

 /* SIDE DRAWER CLASS DEFINITION
  * ============================ */
  
  var SideDrawer = function ( element, options ) {
		this.init('sideDrawer', element, options)
  }

  SideDrawer.prototype = {

    constructor: SideDrawer
    
  , init: function ( type, element, options ) {
	  	this.type = type
      this.$element = $(element)
      this.options = options = $.extend({}, $.fn.sideDrawer.defaults, options, $(element).data())
      this.$side = this.options.side
      this.$main = this.options.main
      this.drawerWidth = this.getDrawerWidth()
      this.open = false
      
      this.events()
      this.draw()
      this.redraw()
  	}
  
  , draw: function () {
		  var h = this.getAvailableHeight()
		  
		  this.$element.css({
		    position: 'relative'
		  , overflow: 'scroll'
		  , height: h 
		  })
		  
		  this.$side.css({
		    display: 'block'
		  , position: 'fixed'
		  , left: '0px'
		  , top: '0px'
		  , 'z-index': 1
		  })
		  
		  this.$main.css({
		    display: 'block'
		  , position: 'absolute'
		  , left: '0px'
		  , top: '0px'
		  , width: '100%'
		  , 'z-index': 2
		  })
	  }
	  
	, redraw: function() {
	    var h = this.getAvailableHeight()
	    
	    this.$element.css('height', h)
		  
		  if (this.$main.height() < h)
		    this.$main.css('height', h)
		  
		  this.$side.height(h)
	  }
	
	, events: function () {
      $('body').on('click.sideDrawer.data-api', '[data-toggle="drawer"]', $.proxy(this.toggle, this))
      
      $(window).on('resize', $.proxy(this.redraw, this))
      
      this.$main.on('webkitTransitionEnd transitionend OTransitionEnd', $.proxy(this.afterTransition, this))
	  }
	
	, toggle: function (e) {	
	    if (e)
	      e.preventDefault()
	      
  	  if (this.open) {
  	    this.$element.css('overflow', 'scroll')
  	    this.$main.css('left', '0px')
        this.open = false
  	  } else {
  	    this.$element.css('overflow', 'hidden')
  	    this.$main.css('left', this.drawerWidth)
  	    this.open = true
  	  }	  
	  }
	
	, afterTransition: function () {
      this.$element.trigger('sideDrawerAfterTransition', this.open);
	  }
	  
	, getDrawerWidth: function () {
	    return this.$side.width()	  
	  }
	
	, getAvailableHeight: function () {
	    return $(window).height()
	  }
	  
  }
  
  /* SIDE DRAWER PRIVATE METHODS
  * ============================ */


  /* SIDE DRAWER PLUGIN DEFINITION
   * ============================= */

  $.fn.sideDrawer = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('sideDrawer')
        , options = typeof option == 'object' && option
      if (!data) $this.data('sideDrawer', (data = new SideDrawer(this, options)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.sideDrawer.Constructor = SideDrawer
  
  $.fn.sideDrawer.defaults = {
  }

  /* SIDE DRAWER DATA-API
    * =================== */
   
  $(function () {
  })

}( window.jQuery );