pb.namespace('controller');

pb.controller = (function() {

  function init() {
    pb.menu.init();
    pb.header.init();
    //set touch boolean for global access
    pb.model.touch = $('html').hasClass('touch');

  };

  return {
    init: init
  };
})();


$(function() {
  pb.controller.init();
});
