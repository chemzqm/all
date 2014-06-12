var assert = require('assert');
var all = require('all');

var container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

beforeEach(function() {
  for(var i = 1; i <= 5; i++) {
    var el = document.createElement('div');
    el.className = 'item item' + i;
    container.appendChild(el);
  }
})

afterEach(function() {
  var els = container.querySelectorAll('.item');
  for (var i = 0, len = els.length; i < len; i++) {
    var el = els[i];
    el.parentNode.removeChild(el);
  }
})

describe('all', function() {

  it('should addClass to all elements', function() {
    var els = all('.item', container).addClass('black');
    for (var i = 0, len = els.length; i < len; i++) {
      assert(els[i].classList.contains('black'));
    }
  })

  it('shold be removed', function () {
    var els = all('.item', container).remove();
    for (var i = 0, len = els.length; i < len; i++) {
      assert(els[i].parentNode === null);
    }
  })

  it('should show elements', function() {
    var els = all('.item', container).show();
    for (var i = 0, len = els.length; i < len; i++) {
      assert(els[i].style.display == 'block');
    }
  })

  it('should hide elements', function() {
    var els = all('.item', container).hide();
    for (var i = 0, len = els.length; i < len; i++) {
      assert(els[i].style.display === 'none');
    }
  })

  it('should toggle elements', function() {
    var els = all('.item', container);
    els[0].style.display = 'none';
    els.toggle();
    assert(els[0].style.display = 'block');
    assert(els[1].style.display = 'none');
  })

  it('should have array methods', function () {
    var els = all('.item', container);
    assert(typeof els.unshift === 'function');
    assert(typeof els.forEach === 'function');
    assert(typeof els.map === 'function');
    assert(typeof els.filter === 'function');
  })

  it('should works with array notation', function () {
    var els = all('.item', container);
    assert(els[0] !== null);
  })
})
