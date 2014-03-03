/*!
 * jquery.customSelect() - v0.4.1
 * http://adam.co/lab/jquery/customselect/
 * 2013-05-13
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License 
 */
(function(d){d.fn.extend({customSelect:function(f){if("undefined"===typeof document.body.style.maxHeight)return this;f=d.extend({customClass:"customSelect",mapClass:!0,mapStyle:!0},f);var b=f.customClass,g=function(c,e){var a=c.find(":selected"),k=e.children(":first"),h=a.html()||"&nbsp;";k.html(h);a.attr("disabled")?e.addClass(b+"DisabledOption"):e.removeClass(b+"DisabledOption");setTimeout(function(){e.removeClass(b+"Open");d(document).off("mouseup.customSelect")},60)};return this.each(function(){var c=
d(this),e=d("<span />").addClass(b+"Inner"),a=d("<span />");c.after(a.append(e));a.addClass(b);f.mapClass&&a.addClass(c.attr("class"));f.mapStyle&&a.attr("style",c.attr("style"));c.addClass("hasCustomSelect").on("render.customSelect",function(){g(c,a);var d=parseInt(c.outerWidth(),10)-(parseInt(a.outerWidth(),10)-parseInt(a.width(),10));a.css({display:"inline-block"});var h=a.outerHeight();c.attr("disabled")?a.addClass(b+"Disabled"):a.removeClass(b+"Disabled");e.css({width:d,display:"inline-block"});
c.css({"-webkit-appearance":"menulist-button",width:a.outerWidth(),position:"absolute",opacity:0,height:h,fontSize:a.css("font-size")})}).on("change.customSelect",function(){a.addClass(b+"Changed");g(c,a)}).on("keyup.customSelect",function(d){a.hasClass(b+"Open")?13!=d.which&&27!=d.which||g(c,a):(c.trigger("blur.customSelect"),c.trigger("focus.customSelect"))}).on("mousedown.customSelect",function(){a.removeClass(b+"Changed")}).on("mouseup.customSelect",function(e){a.hasClass(b+"Open")||(0<d("."+
(b+"Open")).not(a).length&&"undefined"!==typeof InstallTrigger?c.trigger("focus.customSelect"):(a.addClass(b+"Open"),e.stopPropagation(),d(document).one("mouseup.customSelect",function(b){b.target!=c.get(0)&&0>d.inArray(b.target,c.find("*").get())?c.trigger("blur.customSelect"):g(c,a)})))}).on("focus.customSelect",function(){a.removeClass(b+"Changed").addClass(b+"Focus")}).on("blur.customSelect",function(){a.removeClass(b+"Focus "+(b+"Open"))}).on("mouseenter.customSelect",function(){a.addClass(b+
"Hover")}).on("mouseleave.customSelect",function(){a.removeClass(b+"Hover")}).trigger("render.customSelect")})}})})(jQuery);
