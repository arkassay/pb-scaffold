'use strict';

pb.namespace('header');

pb.header = (function() {
  var headerpin;
  function init(options) {
    var header = document.querySelector('header');
    var headroom;
    if (options) {
      headroom = new Headroom(header, options);
    } else {
      headroom = new Headroom(header);
    }
    this.headerpin = headroom.init();
  };

  return{
    init: init,
    headerpin: headerpin
  };
})();
