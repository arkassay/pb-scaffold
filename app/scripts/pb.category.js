'use strict';

pb.namespace('category');

pb.category = (function() {
  function init() {
    fixedTabs();
  };

  function fixedTabs() {
    $('.tabs-placehold').height($('.tabs').height());
    var tabsTop = $('.tabs').offset().top;
    $(window).scroll(function() {
      if ($(window).scrollTop() >= tabsTop) {
        $('.tabs, .tabs-placehold').addClass('fixed');
      } else {
        $('.tabs, .tabs-placehold').removeClass('fixed pinned');
      }
    });

    $(window).resize(function() {
      tabsTop = $('.tabs').offset().top;
      $('.tabs-placehold').height($('.tabs').height());
    });

    pb.header.headerpin.onPin = function() {
      $('.tabs.fixed').addClass('pinned');
    };
    pb.header.headerpin.onUnpin = function() {
      $('.tabs.fixed').removeClass('pinned');
    };
  }

  function transition(pagename, $replace) {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, pagename + '.html');
      getContent(pagename, $replace);

    } else {
      location.href = pagename + '.html';
    }
  }

  function setContent(content, $replace) {
    $replace
      .after('<div class="page-content next"></div>');

    if (!pb.model.touch) {
      $('.page-content.next').html(content).css({
        'top' : '100%',
        'position' : 'relative' }).animate({
        'top': 0
      }, 1000);

      $replace.animate({
        top: '-100%'
      },1000, function() {
        $replace.remove();
        fixedTabs();
      });
    } else {
      $('.page-content.next').html(content);
      $replace.slideUp(1000, function() {
        $(this).remove();
      });
      //$('html, body').animate({ 'scrollTop' : '0px' });
      $('html, body').scrollTop(0);
    }
  }

  function getContent(pagename, $replace) {

    var req = new XMLHttpRequest(),
        path = location.pathname,
        lastIndex = path.lastIndexOf('/');

    path = path.slice(0, lastIndex);
    req.open('GET', path +
        '/content/' + pagename + '-content.html', false);
    req.send(null);
    if (req.status == 200) {
      if (content != false) {
        var content = req.responseText;
        setContent(content, $replace);
      } else {
        return false;
      }
      //return req.responseText;
    }
    return false;
  }

  return {
    transition: transition,
    init: init
  };
})();

/*$(function() {
  $('a').click(function(e) {
    e.preventDefault();
  });
});*/
