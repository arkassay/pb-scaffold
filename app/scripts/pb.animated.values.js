pb.namespace('animatedvalues');

pb.animatedvalues = (function() {
  console.log('asdfsadf');
  function init() {
    console.log('init');
    AnimatedValue();
    // SettingValues.init();
    this.powerPercentage =
        new AnimatedValue('#power-percentage', {afterText: '<span>%</span>'});
    this.powerPercentage.changeTo(0);
  };

  function AnimatedValue(el, options) {
    console.log('animated value running');
    this.options = {};
    if (options) this.options = options;
    this.$el = $(el);
    this.value = 0;

    this.changeTo = function(val) {
      conosole.log('change To');
      var s = '';

      if (this.options.beforeText) s += this.options.beforeText;
      s += val;
      if (this.options.afterText) s += this.options.afterText;
      this.$el.html(s);
      this.value = val;
    };

    this.animateTo = function(val) {
      var selfRef = this;

      this.$el.css({ value: this.value });

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

            selfRef.changeTo(v);
          }
        } // duration
      }, 'easeOutQuad');
    };
  }; // AnimatedValue

  var SettingValues = {

    animate: true,
    transitioning: false,
    $el: null,
    powerPercentage: null,
    ready: false,

    //------------------------------------------- PUBLIC
    init: function() {

      this.powerPercentage =
          new AnimatedValue('#power-percentage', {afterText: '<span>%</span>'});
      this.powerPercentage.changeTo(0);

      //

      this.ready = true;

    },

    reset: function() {
      SettingValues.powerPercentage.changeTo(0);
    }
  };

  return {
    init: init
  };
})();
