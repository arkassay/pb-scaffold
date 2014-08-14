'use strict';

pb.namespace('header');

pb.header = (function() {

  function init() {
    var header = document.querySelector('header');
    var headroom = new Headroom(header);
    headroom.init();
  };

  return{
    init: init
  };
})();
