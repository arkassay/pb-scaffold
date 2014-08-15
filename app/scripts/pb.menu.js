pb.namespace('menu');

pb.menu = (function() {
  function init() {
    handlers();
  };

  var $menu = $('.menu-overlay');
  var $searchMenu = $('.search-overlay');

  function resetMenu($overlayAnimated) {
    TweenMax.set($overlayAnimated, { transformPerspective: 1100 });
    TweenMax.to($overlayAnimated, .1, {
      transformOrigin: '50% 0%', scale: 1
    });
    $menu.css({
      'visibility': 'hidden',
      'display': 'none'
    });
    TweenMax.set($overlayAnimated, {
      bottom: 0, opacity: 0, rotationX: -10, scale: 1
    });
    openMenu($overlayAnimated);
  };

  function openMenu($overlayAnimated) {
    $('body').addClass('scroll');

    $overlayAnimated.css({
      'visibility': 'visible',
      'display': 'block'
    });

    TweenMax.to($overlayAnimated, .35, {
      rotationX: 0, opacity: 1, ease: Ease.easeOut
    });
  }

  function closeMenu($overlayAnimated) {
    $overlayAnimated.fadeOut('fast', function() {
      $('body').removeClass('scroll');
    });
  }

  function searchClear() {
    var $input = $('.search-overlay input');

    $input.val('Search');
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

    $('.icn-menu').click(function(e) {
      e.preventDefault();
      resetMenu($menu);
    });

    $('.close.close-menu').click(function(e) {
      e.preventDefault();
      closeMenu($menu);
    });

    $('.icn-search').click(function(e) {
      e.preventDefault();
      resetMenu($searchMenu);
    });

    $('.close.close-search').click(function(e) {
      e.preventDefault();
      closeMenu($searchMenu);
    });

    $('.search-clear').click(function(e) {
      e.preventDefault();
      searchClear();
    });

    /*$('input').each(function() {
      placeholder($(this));
    });*/

  }

  return {
    init: init
  };
})();
