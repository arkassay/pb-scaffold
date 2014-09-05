pb.namespace('utils');
console.log('utils!');

pb.utils = (function() {
  function init() {
    handlers();
    console.log('utils init');
    $('.additional-content').slideUp();
  };

  function handlers() {
    $('.view-all').click(function(e) {
      e.preventDefault();
      $('.additional-content').slideToggle();
      $(this).children().toggleClass('hide show');
    });

  }

  return {
    init: init
  };

})();

$(function() {
  pb.utils.init();
});
