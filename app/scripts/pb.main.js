pb.namespace('controller');

pb.controller = (function() {

  function init() {
    pb.menu.init();
    pb.header.init();
    handlers();
    //set touch boolean for global access
    pb.model.touch = $('html').hasClass('touch');

  };

  function handlers() {
    //insert initial controller event handlers here.
    $(window).load(function() {

    });
  }

  return {
    init: init
  };
})();


$(function() {
  pb.controller.init();
});
