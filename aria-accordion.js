(function(exports) {
  
  var EXPANDED = 'aria-expanded';
  var HIDDEN = 'aria-hidden';
  var TOGGLE_EVENTS = ['click', 'touchstart'];

  exports.ARIAAccordion = document.registerElement('aria-accordion', {
    prototype: Object.create(
      HTMLElement.prototype,
      {
        attachedCallback: {value: function() {
          var controller = this.__controller = getController(this);
          if (!controller) return;

          var controlled = this.__controlled = getControlled(this, controller);
          if (!controlled) return;

          // set role="button" on the controller element if it's not a <button>
          if (controller.nodeName !== 'BUTTON' && !controller.hasAttribute('role')) {
            controller.setAttribute('role', 'button');
          }

          // reflect the aria-expanded attribute of the accordion to the
          // controller (button) if the attribute is unset
          if (!controller.hasAttribute(EXPANDED)) {
            controller.setAttribute(EXPANDED, getAriaBoolean(this, EXPANDED));
          }

          var toggle = this.toggle.bind(this);
          var toggleAndCancel = this.__toggleAndCancel = function(e) {
            toggle();
            e.preventDefault();
            return false;
          };

          TOGGLE_EVENTS.forEach(function(event) {
            controller.addEventListener(event, toggleAndCancel);
          });

          this.update();
        }},

        detachedCallback: {value: function() {
          var controller = this.__controller;
          if (!controller) return;
          var toggleAndCancel = this.__toggleAndCancel;
          TOGGLE_EVENTS.forEach(function(event) {
            controller.removeEventListener(event, toggleAndCancel);
          });
        }},

        update: {value: function() {
          var expanded = this.expanded;
          this.setAttribute(EXPANDED, expanded);
          this.__controller.setAttribute(EXPANDED, expanded);
          this.__controlled.setAttribute(HIDDEN, !expanded);
        }},

        expanded: {
          get: function() {
            return getAriaBoolean(this.__controller, EXPANDED);
          },
          set: function(value) {
            value = !!value;
            if (value !== this.expanded && this.__controller) {
              this.__controller.setAttribute(EXPANDED, value);
              this.update();
            }
          }
        },

        open: {value: function() {
          this.expanded = true;
        }},

        close: {value: function() {
          this.expanded = false;
        }},

        toggle: {value: function() {
          this.expanded = !this.expanded;
        }}
      }
    )
  });

  function getController(root) {
    var controlsSelector = root.getAttribute('controller') || '[aria-controls]';
    var controller = root.querySelector(controlsSelector);
    if (!controller || !controller.hasAttribute('aria-controls')) {
      console.warn('no controller found for selector: "' + controlsSelector + '"');
      return;
    }
    return controller;
  }

  function getControlled(root, controller) {
    var controlledId = controller.getAttribute('aria-controls');
    var controlled = document.getElementById(controlledId);
    if (!controlled) {
      console.warn('no controlled element found with id: "' + controlledId + '"');
      return;
    }
    return controlled;
  }

  function getAriaBoolean(el, attr) {
    return el && el.hasAttribute(attr) && el.getAttribute(attr) !== 'false';
  }

})(this);
