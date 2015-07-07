# `<aria-accordion>`
This package uses [document.registerElement()] to implement a custom `<aria-accordion>` HTML element that handles all of the necessary attribute settings to produce an interactive, accessible accordion. The implementation is heavily inspired by [Heydon's Practical ARIA Examples](http://heydonworks.com/practical_aria_examples/#progressive-collapsibles).

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

[document.registerElement()]: https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement
[document-register-element polyfill]: https://github.com/WebReflection/document-register-element
[valid id]: http://www.w3.org/TR/html5/dom.html#the-id-attribute
