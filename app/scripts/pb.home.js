pb.namespace('home');

pb.home = (function() {

  var powerPercentage;

  function init() {
    //removed because removed snappish from this page
    //$('#wrapper').snappish();
    //animateHeading();
    animateCategoryLinks();
    animateDownArrow();
    switchBG();
  };

  /* appears this is no longer needed
  /*function animateHeading() {
    var defaultText = $('.group.default .row').html();
    $('.page-title').fadeOut(function() {
      $(this).html(defaultText);
      $('.page-title').fadeIn();

    });
    $('.welcome .catbg').fadeOut(function() {
      $('.welcome').attr('id', 'welcome');
      $(this).fadeIn();
    });

  };*/

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

    pb.home.powerPercentage = new pb.animatedvalues();
    pb.home.powerPercentage
      .init('.power-percentage', {afterText: '<span>%</span>'});
    //pb.home.powerPercentage.changeTo(0);

    pb.home.sendValue = new pb.animatedvalues();
    pb.home.sendValue
      .init('#send-value', {afterText: ''});

    $('.links a').mouseenter(function() {
      var category = $(this).attr('class');
      var currentCategoryContainer = '.group.' + category;
      $(this).parent().siblings().addClass('inactive');
      // var headlineText = $('.group.' + category + ' .row').html();

      $('.group.default').fadeOut();
      $('.group.default').removeClass('active');

      $(currentCategoryContainer).fadeOut(function() {
        $(currentCategoryContainer).fadeIn(function() {
          $(currentCategoryContainer)
            .toggleClass('visible-xs desktop-group-styles');
        });
      });

      // initiate number animations ===================================
      if (category == 'category-1') {
        pb.home.powerPercentage.animateTo('90');
      }else if (category == 'category-4') {
        pb.home.sendValue.animateTo('38');
      }

    });


    $('.links a').mouseout(function() {
      var category = $(this).attr('class');
      var currentCategoryContainer = '.group.' + category;
      //animateHeading();
      $(this).parent().siblings().removeClass('inactive');

      $(currentCategoryContainer).fadeOut(function() {
        $(currentCategoryContainer)
          .toggleClass('visible-xs desktop-group-styles');
        $('.group.default.active').fadeIn();
      });

      window.setTimeout(function() {
        $('.group.default').addClass('active');
      }, 1500);

      // reset number animations ===================================
      if (category == 'category-1') {
        /* for some reason changeTo caused the 2nd
        rollover of this not to animate */
        pb.home.powerPercentage.animateTo('0');
      }else if (category == 'category-4') {
        //pb.home.sendValue.changeTo('0');
        //$('#send-value').html('0');
      }
    });
  };


  return {
    init: init,
    powerPercentage: powerPercentage
  };
})();

$(function() {
  pb.home.init();
});
