/*!
 * jquery.customSelect() - v0.3.3
 * http://adam.co/lab/jquery/customselect/
 * 2013-03-04
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License 
 */

(function ($) {
    'use strict';

    $.fn.extend({
        customSelect: function (options) {
            var defaults = {
                    customClass: null,
                    mapClass:    true,
                    mapStyle:    true
                },
                changed = function ($select,customSelectSpan) {
                    var currentSelected = $select.find(':selected'),
                    customSelectSpanInner = customSelectSpan.children(':first'),
                    html = currentSelected.html() || '&nbsp;';

                    customSelectSpanInner.html(html);

                    setTimeout(function () {
                        customSelectSpan.removeClass('customSelectOpen');
                    }, 60);
                };

            if (typeof document.body.style.maxHeight === 'undefined') {
                /* filter out <= IE6 */
                return this;
            }

            options = $.extend(defaults, options);

            return this.each(function () {
                var $select = $(this),
                    customSelectInnerSpan = $('<span class="customSelectInner" />'),
                    customSelectSpan = $('<span class="customSelect" />');

                customSelectSpan.append(customSelectInnerSpan);
                $select.after(customSelectSpan);

                if (options.customClass) {
                    customSelectSpan.addClass(options.customClass);
                }
                if (options.mapClass) {
                    customSelectSpan.addClass($select.attr('class'));
                }
                if (options.mapStyle) {
                    customSelectSpan.attr('style', $select.attr('style'));
                }

                $select
                    .addClass('hasCustomSelect')
                    .on('update', function () {
						changed($select,customSelectSpan);
						
                        var selectBoxWidth = parseInt($select.outerWidth(), 10) -
                                (parseInt(customSelectSpan.outerWidth(), 10) -
                                    parseInt(customSelectSpan.width(), 10));
						
						// Set to inline-block before calculating outerHeight
						customSelectSpan.css({
                            display: 'inline-block'
                        });
						
                        var selectBoxHeight = customSelectSpan.outerHeight();

                        if ($select.attr('disabled')) {
                            customSelectSpan.addClass('customSelectDisabled');
                        } else {
                            customSelectSpan.removeClass('customSelectDisabled');
                        }

                        customSelectInnerSpan.css({
                            width:   selectBoxWidth,
                            display: 'inline-block'
                        });

                        $select.css({
                            '-webkit-appearance': 'menulist-button',
                            width:                customSelectSpan.outerWidth(),
                            position:             'absolute',
                            opacity:              0,
                            height:               selectBoxHeight,
                            fontSize:             customSelectSpan.css('font-size')
                        });
                    })
                    .on('change', function () {
                        customSelectSpan.addClass('customSelectChanged');

                        changed($select,customSelectSpan);
                    })
                    .on('keyup', function () {
                        $select.blur();
                        $select.focus();
                    })
                    .on('mousedown', function () {
                        customSelectSpan.removeClass('customSelectChanged').addClass('customSelectOpen');
                    })
                    .focus(function () {
                        customSelectSpan.removeClass('customSelectChanged').addClass('customSelectFocus');
                    })
                    .blur(function () {
                        customSelectSpan.removeClass('customSelectFocus customSelectOpen');
                    })
                    .hover(function () {
                        customSelectSpan.addClass('customSelectHover');
                    }, function () {
                        customSelectSpan.removeClass('customSelectHover');
                    })
                    .trigger('update');
            });
        }
    });
})(jQuery);
