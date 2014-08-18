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
    var defaultText = $('.group.default .row').html();
    $('.page-title').fadeOut(function() {
      $(this).html(defaultText);
      $('.page-title').fadeIn();

    });
    $('.welcome .catbg').fadeOut(function() {
      $('.welcome').attr('id', 'welcome');
      $(this).fadeIn();
    });

  };

  function animateCategoryLinks() {
    //$('.welcome .links').addClass('animated fadeInUp');
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
    // animated numbers
    var powerPercentage = new pb.animatedvalues();
    powerPercentage.init('#power-percentage', {afterText: '<span>%</span>'});
    //powerPercentage.changeTo(0);

    $('.links a').mouseenter(function() {
      var category = $(this).attr('class');
      $(this).parent().siblings().addClass('inactive');
      var headlineText = $('.group.' + category + ' .row').html();
      $('.page-title').fadeOut(function() {
        $(this).html(headlineText);
        $('.page-title').fadeIn();
      });

      $('.welcome .catbg').fadeOut(function() {
        $('.welcome').attr('id', category);
        $(this).fadeIn();
      });

      // initiate number animations
      if (category == 'category-1') {
        console.log(category + ' < rolled over');
        //  pb.animatedvalues.init.powerPercentage.animateTo('90');
        //powerPercentage.changeTo(0);
        powerPercentage.animateTo('90');
      }

    });


    $('.links a').mouseout(function() {
      animateHeading();
      //$(body).find('.links .cat').removeClass('inactive');
      $(this).parent().siblings().removeClass('inactive');
      //powerPercentage.changeTo(0);
    });
  };


  return {
    init: init
  };
})();

$(function() {
  pb.home.init();
});
