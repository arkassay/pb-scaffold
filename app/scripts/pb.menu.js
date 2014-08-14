pb.namespace('menu');

pb.menu = (function() {

  function init() {
    handlers();
  };

  function searchClear() {
    var $input = $('.search-overlay input');

    $input.val('Search');
  };

  function toggleSearchMenu() {
    var $searchMenu = $('.search-overlay');

    $($searchMenu).toggleClass('open animated flipInX');
    $('body').toggleClass('scroll');
  };

  function toggleMenu() {
    var $menu = $('.menu-overlay');
    var $menuItems = $('.menu-overlay .cat-links li');

    if ($menu.hasClass('open')) {

      $menu.fadeOut('fast', function() {
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
      $menu.fadeIn('fast', function() {
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
    $('.icn-menu, .close.close-menu').click(function(e) {
      e.preventDefault();
      toggleMenu();
    });

    /*$('.icn-search, .close.close-search').click(function(e) {
      e.preventDefault();
      toggleSearchMenu();
    });*/

    $('input').each(function() {
      placeholder($(this));
    });

    $('.search-clear').click(function(e) {
      e.preventDefault();
      searchClear();
    });

  }

  return {
    init: init
  };
})();
