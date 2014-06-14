var styles = window.getComputedStyle;
var classes = require('classes');

function Collection(selector, root) {
  root = root || document;
  var els = (typeof selector !== 'string') ? selector
            : root.querySelectorAll(selector);

  var collection = Object.create(Array.prototype);
  collection = (Array.apply( collection, els ) || collection);

  mix(collection, methods);
  return collection;
}

function mix(o, methods) {
  Object.keys(methods).forEach(function(key) {
    var fn = methods[key];
    o[key] = function () {
      var args = arguments;
      this.forEach(function(el) {
        fn.apply(el, args);
      })
      return this;
    }
  })
}

var methods = {
  addClass: function (clz) {
    classes(this).add(clz);
  },
  removeClass: function (clz) {
    classes(this).remove(clz);
  },
  toggleClass: function (clz) {
    classes(this).toggle(clz);
  },
  show: function (display) {
    display = display || 'block';
    this.style.display = display;
  },
  hide: function () {
    this.style.display = 'none';
  },
  toggle: function (display) {
    display = display || 'block';
    if ( styles(this).display == 'none' ) {
      this.style.display = display;
    } else {
      this.style.display = 'none';
    }
  },
  remove: function () {
    this.parentNode.removeChild(this);
  }
}

module.exports = Collection;
