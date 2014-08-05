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
      });
    } else {
      $menu.fadeIn(function() {
        $(this).addClass('open');
      });
    }

  };

  return {
    init: init
  };
})();
