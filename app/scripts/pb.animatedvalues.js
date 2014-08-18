'use strict';

pb.namespace('animatedvalues');

pb.animatedvalues = function() {

  var $el, value, options;

  function init(el, setOptions) {
    options = {};
    if (setOptions) this.options = setOptions;
    this.$el = $(el);
    //console.log($el);
    value = 0;
  };

  /*this.powerPercentage =
      new AnimatedValue('#power-percentage', {afterText: '<span>%</span>'});
  this.powerPercentage.changeTo(0);*/

  function changeTo(val) {
    var s = '';
    if (this.options.beforeText) s += this.options.beforeText;
    s += val;
    if (this.options.afterText) s += this.options.afterText;
    console.log(this.$el);
    this.$el.html(s);
    value = val;
  };

  function animateTo(val) {
    var selfRef = this;
    this.$el.css({ value: pb.animatedvalues.value });

    this.$el.animate({
      value: val, left: this.percent * this.width
    }, {
      duration: 1400, step: function(now, tween)
      {
        if (tween.prop == 'value') {
          var v =
              Math.floor(tween.now).
              toString().
              replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
          console.log(v);
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
