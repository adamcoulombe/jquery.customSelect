/*! jQuery.customSelect() - v0.2.1 - 2012-12-17 */

(function($){
 $.fn.extend({
 
 	customSelect : function(options) {
	  if(typeof document.body.style.maxHeight != "undefined"){ /* filter out <= IE6 */
	  var defaults = {
		  customClass: null,
		  mapClass:true,
		  mapStyle:true
	  };
	  var options = $.extend(defaults, options);
	  
	  return this.each(function() {
	  		var $this = $(this);
			var customSelectInnerSpan = $('<span class="customSelectInner" />');
			var customSelectSpan = $('<span class="customSelect" />').append(customSelectInnerSpan);
			$this.after(customSelectSpan);
			
			if(options.customClass)	{ customSelectSpan.addClass(options.customClass); }
			if(options.mapClass)	{ customSelectSpan.addClass($this.attr('class')); }
			if(options.mapStyle)	{ customSelectSpan.attr('style', $this.attr('style')); }
			
			$this.bind('update',function(){
				$this.change();
				var selectBoxWidth = parseInt($this.outerWidth()) - (parseInt(customSelectSpan.outerWidth()) - parseInt(customSelectSpan.width()) );			
				customSelectSpan.css({display:'inline-block'});
				customSelectInnerSpan.css({width:selectBoxWidth, display:'inline-block'});
				var selectBoxHeight = customSelectSpan.outerHeight();
				$this.css({'-webkit-appearance':'menulist-button',width:customSelectSpan.outerWidth(),position:'absolute', opacity:0,height:selectBoxHeight,fontSize:customSelectSpan.css('font-size')});
			}).change(function(){
				var currentSelected = $this.find(':selected');
				var html = currentSelected.html() || '&nbsp;';
				customSelectInnerSpan.html(html).parent().addClass('customSelectChanged');
				setTimeout(function(){customSelectSpan.removeClass('customSelectOpen');},60);
			}).bind('mousedown',function(){
				customSelectSpan.toggleClass('customSelectOpen');
			}).focus(function(){
				customSelectSpan.addClass('customSelectFocus');
			}).blur(function(){
				customSelectSpan.removeClass('customSelectFocus customSelectOpen');
			}).trigger('update');
			
	  });
	  }
	}
 });
})(jQuery);
