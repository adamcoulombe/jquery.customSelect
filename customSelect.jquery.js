/*!
 * jQuery.customSelect() - v0.3.0
 * https://github.com/bmatzner/jquery.customSelect
 * 2013-02-11
 *
 * Original Copyright 2021 Adam Coulombe
 * http://adam.co/lab/jquery/customselect/
 * @license http://www.apache.org/licenses/LICENSE-2.0
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
                changed = function (el) {
                    var $select = $(el),
                        currentSelected = $select.find(':selected'),
                        customSelectSpan = $select.next(),
                        customSelectSpanInner = customSelectSpan.children(':first'),
                        html = currentSelected.html() || '&nbsp;';

                    customSelectSpanInner.html(html);

                    setTimeout(function () {
                        customSelectSpan.removeClass('customSelectOpen');
                    }, 60);
                };

            if (typeof document.body.style.maxHeight !== "undefined") {
                /* filter out <= IE6 */
                return this;
            }

            options = $.extend(defaults, options);

            return this.each(function () {
                var $select = $(this),
                    customSelectInnerSpan = $('<span class="customSelectInner" />'),
                    customSelectExtraSpan = $('<span class="customSelectExtra" />'),
                    customSelectSpan = $('<span class="customSelect" />');

                customSelectSpan.append(customSelectInnerSpan, customSelectExtraSpan);
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
                        var selectBoxWidth = parseInt($select.outerWidth(), 10) -
                                (parseInt(customSelectSpan.outerWidth(), 10) -
                                    parseInt(customSelectSpan.width(), 10)),
                            selectBoxHeight = customSelectSpan.outerHeight();

                        changed(this);

                        customSelectSpan.css({
                            display: 'inline-block'
                        });

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

                        changed(this);
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
