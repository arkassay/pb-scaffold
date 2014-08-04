pb.namespace('welcome');

pb.welcome = (function() {

  function init() {
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
    $('.down-arrow').addClass('animated infinite pulse');

    window.setTimeout(function() {
      $('.down-arrow').removeClass('animated infinite pulse');
    }, 3000);

  };

  function switchBG() {

    $('.links a').mouseenter(function() {
      var category = $(this).attr('class');
      $('.welcome').attr('id', category);

      $('h1.init').addClass('hidden');

      $('.welcome .catbg')
        .removeClass('animated fadeOut')
        .addClass('animated fadeIn');

      $('h2.' + category)
        .removeClass('hidden')
        .addClass('animated fadeInUp');

    });


    $('.links a').mouseout(function() {
      var category = $(this).attr('class');
      $('.welcome .catbg')
        .removeClass('animated fadeIn')
        .addClass('animated fadeOut');

      $('h2.' + category).addClass('hidden')
        .removeClass('animated fadeInUp');

      $('h1.init').removeClass('hidden');

    });
  };


  return {
    init: init
  };
})();
