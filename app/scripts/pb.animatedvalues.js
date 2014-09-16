'use strict';

pb.namespace('animatedvalues');

pb.animatedvalues = function() {

  var $el, value, options;

  function init(el, setOptions) {
    options = {};
    if (setOptions) this.options = setOptions;
    this.$el = $(el);
    this.value = 0;
  };

  function changeTo(val) {
    var s = '';
    if (this.options.beforeText) s += this.options.beforeText;
    s += val;
    if (this.options.afterText) s += this.options.afterText;
    var currEl = this.$el.selector;
    var $currEl = $('#' + currEl);
    $currEl.html(s);
  };

  function animateTo() {
    var selfRef = this;

    var currEl = this.$el.selector;
    var $currEl = $('#' + currEl);
    var val = $currEl.attr('data-val');

    $currEl.css({ value: pb.animatedvalues.value });

    $currEl.animate({
      value: val, left: this.percent * this.width
    }, {
      duration: 1400, step: function(now, tween)
      {
        if (tween.prop == 'value') {
          var v =
              Math.floor(tween.now).
              toString().
              replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
          selfRef.changeTo(v);
        }
      } // duration
    }, 'easeOutQuad');
  };


  return {
    init: init,
    changeTo: changeTo,
    animateTo: animateTo,
    $el: $el
  };
};
