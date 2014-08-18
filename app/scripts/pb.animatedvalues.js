'use strict';

pb.namespace('animatedvalues');

pb.animatedvalues = function() {
  function init(el, options) {
    this.options = {};
    if (options) this.options = options;
    this.$el = $(el);
    this.value = 0;
  };

  /*this.powerPercentage =
      new AnimatedValue('#power-percentage', {afterText: '<span>%</span>'});
  this.powerPercentage.changeTo(0);*/

  function changeTo(val) {
    var s = '';

    if (this.options.beforeText) s += this.options.beforeText;
    s += val;
    if (this.options.afterText) s += this.options.afterText;
    this.$el.html(s);
    this.value = val;
  };

  function animateTo(val) {
    var selfRef = this;
    console.log(val + ' < val  $el > ' + this.$el + '  selfRef >' + selfRef);
    this.$el.css({ value: this.value });

    this.$el.animate({
      value: val, left: this.percent * this.width
    }, {
      duration: 1400, step: function(now, tween)
      {
        console.log('+');
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
    animateTo: animateTo
  };
};
