pb.namespace('menu');

pb.menu = (function() {

  function init() {
    $('.icn-menu, .close').click(function(e) {
      e.preventDefault();
      toggleMenu();
    });

  };

  function toggleMenu() {
    var $menu = $('.menu-overlay');

    if ($menu.hasClass('open')) {
      $menu.fadeOut(function() {
        $menu.removeClass('open');
        $('body').removeClass('scroll');
      });
    } else {
      $menu.fadeIn(function() {
        $(this).addClass('open');
        $('body').addClass('scroll');
      });
    }

  };

  return {
    init: init
  };
})();
