# Custom Select Box CSS Style Plugin: jQuery + CSS

## Getting started
### [See Basic Demo](http://jsfiddle.net/adamco/hysHB/)
### Initiate the plugin
```javascript
$(document).ready(function(){
	$('#someSelectBox').customSelect();
});
```
### Style using CSS however you like
```CSS
.customSelect { 
/* This is the default class that is used */
/* Put whatever custom styles you want here */
}

.customSelect.customSelectHover {
/* Styles for when the select box is hovered */
}

.customSelect.customSelectOpen {
/* Styles for when the select box is open */
}

.customSelect.customSelectFocus {
/* Styles for when the select box is in focus */
}

.customSelect.customSelectDisabledOption {
/* Styles for when the selected item is a disabled one */
}

.customSelect.customSelectDisabled {
/* Styles for when the select box itself is disabled */
}

.customSelectInner {
/* You can style the inner box too */
}
```

## More Examples
 * [Example making use of the different states/classes](http://jsfiddle.net/adamco/7ttWj/)

## Cookbook
### Trigger an update on the select box
Useful if any modifications are made to the select box after customSelect() has been applied
```javascript
$('#someSelectBox').customSelect();

// as an example....
$('#someSelectBox').width(500).append('<option>New!</option>');

// Trigger an refresh on the select box. Good as new!
$('#someSelectBox').trigger('render');
```

### Making customSelect responsive
In a responsive layout, you may need to change the size / style of the select box.
The best way to do this is with `matchMedia`. Consider using a [matchMedia polyfill](https://github.com/paulirish/matchMedia.js) for better browser support. The `addListener` extension makes it very easy to update the customSelect:
```javascript
// add a media query listener and trigger a customSelect update whenever the query gets matched or unmatched
matchMedia('only screen and (max-width: 480px)').addListener(function(list){
    $('#mySelectBox').trigger('render');
});
```

## Options
There are a few extra options if you need them
```javascript
$('#someSelectBox').customSelect({
    customClass: "mySexySelect", // Specify a different class name (default is 'customSelect')
    mapClass:    true, // Copy any existing classes from the given select element (defaults to true)
    mapStyle:    true // Copy the value of the style attribute from the given select element (defaults to true)
});
```


## Changelog
Version 0.5.1 (19/03/2013)
 * Merge fix for #60 by gu3st (Fixes issue when select box moves from display:none; to display:block;)

Version 0.5.0 (19/03/2013)
 * Namespaced events
 * API Change: 'update' event changed to 'render' to fix some compatibility issues

Version 0.4.1 (26/05/2013)
 * Fixed multiple `customSelectOpen` handling in FF
 * `Esc` & `Enter` key support

Version 0.4.0 (26/04/2013)
 * Some optimizations for better compression/minification
 * If you specify a `customClass`, that classname will be used for all states.
 * eg. `{customClass:'mySexySelect'}` will produce class names like `mySexySelectOpen`, `mySexySelectFocus`, `mySexySelectHover`
 * The only exception is the `hasCustomSelect` class, which will maintain the plugin's default namespace since it is applied to the select box to distinguish it from an unstyled select.

Version 0.3.7 (26/04/2013)
 * Support for `disabled` `<option>` via `customSelectDisabledOption` class

Version 0.3.6 (16/04/2013)
 * Calls change function instead of invoking change event to fix double-fire

Version 0.3.5 (16/04/2013)
 * Much improved logic for `customSelectOpen`
 * Bug fix for Firefox keyboard selection

Version 0.3.4 (15/04/2013)
 * Toggle `customSelectOpen` class on mouseup to resolve issue #29 (http://git.io/jztAlQ)

Version 0.3.3 (04/03/2013)
 * Pass original `customSelectSpan` reference to changed() function

Version 0.3.2 (28/02/2013)
 * Patch for incorrect select height caused by 0.3.0
 * Support for `disabled` select boxes via `customSelectDisabled` class
 
Version 0.3.0 (12/02/2013)
 * Refactored coding style
 * Changed filenames to standard jQuery plugin naming conventions
 * Fixed IE6 Filtering
 * Added component.json for bower
 * Moved method 'changed' to local scope
 * Update to Dual GPL/MIT license

Version 0.2.5 (04/02/2013)
 * Updates/fixes to .customSelectChanged class usage
 * customSelectChanged class is added to span when select value changes
 * customSelectChanged class is removed on mousedown or on blur

Version 0.2.4 (03/02/2013)
 * Supports hover via .customSelectHover class on customSelect span

Version 0.2.3 (30/01/2013)
 * Fixes change event not firing for Firefox keyboard users
 * customSelect no longer triggers the change event on initiation

Version 0.2.1 (17/12/2012)
 * Select box listens for 'update' event which can be triggered to update the size and content if needed
 * Removed dependency on $.browser

Version 0.2.0

CHANGES IN 0.2.0
 * Streamlined creation/selection of span elements
 * Renamed span classes to "customSelect" and "customSelectInner" to coinside with plugin name
 * You can now have styles for when select box is open or focused via the classes .customSelectOpen and .customSelectFocus
 * ability to set a custom class by passing in {customClass:'myClassName'}

Copyright 2013 Adam Coulombe

Dual licensed under the MIT and GPL licenses:
 *    http://www.gnu.org/licenses/gpl.html
 *    http://www.opensource.org/licenses/mit-license.php
   

This lightweight, unintrusive technique uses the native select box functionality of the web browser, and overlays a stylable <span> element in order to acheive your desired look. Since it makes use of default browser functionality,it can be treated just like any ordinary HTML select box.