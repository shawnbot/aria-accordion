# `<aria-accordion>`
This package uses [document.registerElement()] to implement an `<aria-accordion>` [custom element] that handles all of the necessary attribute settings to produce an interactive, accessible accordion. The implementation is heavily inspired by [Heydon's Practical ARIA Examples](http://heydonworks.com/practical_aria_examples/#progressive-collapsibles).

## Usage
1. Download [aria-accordion.js](aria-accordion.js) and add include the appropriate `<script>` tag.
2. Download the [document-register-element polyfill] and add it with another `<script>` tag.
3. Optionally include the [aria-accordion.css](css/aria-accordion.css) to get some basic styles.

Next, structure your HTML like this:

```html
<aria-accordion>
  <h1><button aria-controls="content">Some Heading</button></h1>
  <div id="content" aria-hidden="true">
    <p>Some content, hidden by default.</p>
  </div>
</aria-accordion>
```
  
The important bits are:

* The `<aria-accordion>`, obviously. You can place this anywhere in your document, and you can put whatever you want in it, including other 
* The `<button aria-controls="content">` is the "switch" that toggles the visibility of the content.
* The `<div id="content">` is the content to be shown and hidden when the switch is clicked (or tapped).
* The `aria-controls` and `id` attributes can be any [valid id], but they **must match**.

## How It Works
The `<aria-accordion>` [custom element] registers an [attached callback] that's called for each element on the page and whenever an element with that name is added to the document via JavaScript. The attached callback does the following:

1. It looks for the "controller" element, which is determined either by
  1. the CSS selector specified in the element's `controller` attribute, or
  2. the first element with an `aria-controls` attribute.
2. It finds the element with the corresponding ID of the controller's `aria-controls` attribute.
3. It attaches `click` and `touchstart` event handlers to the controller that toggle the element's expanded state.
4. Whenever the expanded flag is changed (either via event handlers or by setting the element's `expanded` property directly), the elements are updated.
5. The elements are updated initially:
  1. The `<aria-accordion>` has its `aria-expanded` attribute set to `true` or `false`.
  2. The controller element has its `aria-expanded` attribute set to `true` or `false`.
  3. The content element has its `aria-hidden` attribute set to `true` (if expanded is `false`) or `false` (if expanded is `true`).

## API
`<aria-accordion>` elements have the following JavaScript API:

* `element.expanded` is a boolean attribute that can be set to change its state, and updates the attributes accordingly.
* `element.open()` sets `element.expanded = true`.
* `element.close()` sets `element.expanded = false`.
* `element.toggle()` toggles the expanded state, setting it to `false` if it's `true` and vice-versa.

### Events
`<aria-accordion>` elements also dispatch `open` and `close` events, which you can listen for with:

```js
var element = document.querySelector('aria-accordion');
element.addEventListener('open', function() {
  console.log('open!');
});
element.addEventListener('close', function() {
  console.log('closed!');
});
```

[document.registerElement()]: https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement
[document-register-element polyfill]: https://github.com/WebReflection/document-register-element
[valid id]: http://www.w3.org/TR/html5/dom.html#the-id-attribute
[custom element]: http://www.w3.org/TR/custom-elements/
[attached callback]: http://www.w3.org/TR/custom-elements/#dfn-attached-callback
