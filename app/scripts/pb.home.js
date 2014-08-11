pb.namespace('home');

pb.home = (function() {

  function init() {
    //removed because removed snappish from this page
    //$('#wrapper').snappish();
    animateHeading();
    animateCategoryLinks();
    animateDownArrow();
    switchBG();
  };

  function animateHeading() {
    $('.page-title h1').addClass('animated fadeInUp');
  };

  function animateCategoryLinks() {
    $('.welcome .links').addClass('animated fadeInUp');
  };

  function animateDownArrow() {
    $('.down-arrow').click(function() {
      var nextScreen = $('article.category-1').offset();
      $('html, body').animate({ scrollTop: nextScreen.top });
    });

    $('.down-arrow').addClass('animated infinite pulse');

    window.setTimeout(function() {
      $('.down-arrow').removeClass('animated infinite pulse');
    }, 3000);

  };

  function switchBG() {

    $('.links a').mouseenter(function() {
      var category = $(this).attr('class');
      $('.welcome').attr('id', category);

      var headlineText = $('.group.' + category + ' .row').html();
      $('.page-title').fadeOut(function() {
        $(this).html(headlineText);
        $('.page-title h2, .page-title p').addClass('animated fadeInUp');
        $('.page-title').fadeIn();
      });

      $('.welcome .catbg')
        .removeClass('animated fadeOut')
        .addClass('animated fadeIn');


    });


    $('.links a').mouseout(function() {
      var category = $(this).attr('class');
      $('.welcome .catbg')
        .removeClass('animated fadeIn')
        .addClass('animated fadeOut');

      var defaultText = $('.group.default .row').html();
      $('.page-title').fadeOut(function() {
        $(this).html(defaultText);
        $('.page-title h2, .page-title p').addClass('animated fadeInUp');
        $('.page-title').fadeIn();
      });


    });
  };


  return {
    init: init
  };
})();

$(function() {
  pb.home.init();
});
