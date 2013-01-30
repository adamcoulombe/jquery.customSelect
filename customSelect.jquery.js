/*! jQuery.customSelect() - v0.2.3 - 2013-01-30 */

(function($){
	$.fn.extend({
		customSelect : function(options) {
			if(typeof document.body.style.maxHeight !== "undefined"){ /* filter out <= IE6 */
				var
					defaults = {
						customClass: null,
						mapClass:true,
						mapStyle:true
					};
				options = $.extend(defaults, options);

				return this.each(function() {
					var
						$this = $(this),
						customSelectInnerSpan = $('<span class="customSelectInner" />'),
						customSelectSpan = $('<span class="customSelect" />').append(customSelectInnerSpan);
					$this.after(customSelectSpan);
					
					if(options.customClass)	{ customSelectSpan.addClass(options.customClass); }
					if(options.mapClass)	{ customSelectSpan.addClass($this.attr('class')); }
					if(options.mapStyle)	{ customSelectSpan.attr('style', $this.attr('style')); }
					
					$this.on('update',function(){
						changed(this);
						var selectBoxWidth = parseInt($this.outerWidth(), 10) - (parseInt(customSelectSpan.outerWidth(), 10) - parseInt(customSelectSpan.width(), 10) );
						customSelectSpan.css({display:'inline-block'});
						customSelectInnerSpan.css({width:selectBoxWidth, display:'inline-block'});
						var selectBoxHeight = customSelectSpan.outerHeight();
						$this.css({'-webkit-appearance':'menulist-button',width:customSelectSpan.outerWidth(),position:'absolute', opacity:0,height:selectBoxHeight,fontSize:customSelectSpan.css('font-size')});
					}).on("change",changed).on('keyup',function(){
						$this.blur(); $this.focus(); 
					}).on('mousedown',function(){
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
	function changed(e){
		var $this = $( (e.currentTarget || e) ) ;
		var currentSelected = $this.find(':selected');
		var customSelectSpan = $this.next();
		var customSelectSpanInner = customSelectSpan.children(':first');
		var html = currentSelected.html() || '&nbsp;';
		customSelectSpanInner.html(html).parent().addClass('customSelectChanged');
		setTimeout(function(){customSelectSpan.removeClass('customSelectOpen');},60);
	}
})(jQuery);