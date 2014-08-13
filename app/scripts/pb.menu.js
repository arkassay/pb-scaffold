pb.namespace('menu');

pb.menu = (function() {

  function init() {
    handlers();
  };

  function toggleMenu() {
    var $menu = $('.menu-overlay');
    var $menuItems = $('.menu-overlay .cat-links li');

    if ($menu.hasClass('open')) {

      $menu.fadeOut(function() {
        $menu.removeClass('open');
        $('body').removeClass('scroll');
      });

      /*$menu
        .removeClass('fadeIn open')
        .addClass('fadeOut closed');*/
      $menuItems
        .removeClass('fadeInDown')
        .addClass('fadeOutUp');


    } else {
      $menu.fadeIn(function() {
        $(this).addClass('open');
        $('body').addClass('scroll');
      });

      window.setTimeout(function() {
        $menuItems
          .removeClass('fadeOutUp')
          .addClass('fadeInDown animated');
      }, 50);

      /*$menu
        .removeClass('fadeOut closed')
        .addClass('animated fadeIn open');*/


    }

  };

  function placeholder($input) {
    var default_val = $input.val();

    $input.focus(function() {
      if ($input.val() == default_val) {
        $input.val('');
      }
    });
    $input.blur(function() {
      if ($input.val().length == 0) {
        $input.val(default_val);
      }
    });
  };

  function handlers() {
    $('.icn-menu, .close').click(function(e) {
      e.preventDefault();
      toggleMenu();
    });

    $('input').each(function() {
      placeholder($(this));
    });
  }

  return {
    init: init
  };
})();
