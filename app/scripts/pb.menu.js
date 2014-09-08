pb.namespace('menu');

pb.menu = (function() {
  function init() {
    handlers();
    setMinMenuHeight();
  };

  var $menu = $('.menu-overlay');
  var $searchMenu = $('.search-overlay');
  var open = false;

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
    $('body').addClass('scroll open');

    $overlayAnimated.css({
      'visibility': 'visible',
      'display': 'block'
    });

    TweenMax.to($overlayAnimated, .35, {
      rotationX: 0, opacity: 1, ease: Ease.easeOut
    });

    open = true;
  }

  function closeMenu($overlayAnimated) {
    $overlayAnimated.fadeOut('fast', function() {
      $('body').removeClass('scroll open');
      open = false;
    });

  }

  function searchClear() {
    var $input = $('.mobile-search');

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

  function setMinMenuHeight() {
    $menu.css('min-height', $(window).height());
  };

  function handlers() {

    $('.icn-menu').click(function(e) {
      e.preventDefault();
      if (!open) {
        $(this).addClass('x');
        resetMenu($menu);
      } else {
        $(this).removeClass('x');
        closeMenu($menu);
      }

    });

    $(window).resize(function() {
      setMinMenuHeight();
    });

    /*$('.icn-search').click(function(e) {
      e.preventDefault();
      resetMenu($searchMenu);
    });*/

    $('.close.close-search').click(function(e) {
      e.preventDefault();
      closeMenu($searchMenu);
    });

    $('.search-clear').click(function(e) {
      e.preventDefault();
      searchClear();
    });

    $('input').each(function() {
      placeholder($(this));
    });

  }

  return {
    init: init
  };
})();
