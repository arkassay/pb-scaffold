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

  return {
    init: init,
    fixedTabs: fixedTabs
  };
})();

/*$(function() {
  $('a').click(function(e) {
    e.preventDefault();
  });
});*/
