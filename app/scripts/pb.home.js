pb.namespace('home');

pb.home = (function() {

  var powerPercentage;
  var homeScreen = '.group.default';
  var activeLinks = false;

  function init() {
    //removed because removed snappish from this page
    //$('#wrapper').snappish();
    //animateHeading();
    animateCategoryLinks();
    animateDownArrow();
    switchBG();
    handlers();
  };


  function animateHeading(activeLinks) {

    // fade homescreen out  ==========================
    if (activeLinks == true && !$(homeScreen).hasClass('visible-xs')) {
      $(homeScreen).fadeOut('fast', function() {
        $(homeScreen)
          .addClass('visible-xs');
      });
    }

    // fade homescreen in  ==========================
    if (activeLinks == false && $(homeScreen).hasClass('visible-xs')) {
      $(homeScreen).fadeOut(function() {
        $(homeScreen)
        .removeClass('visible-xs');
        $(homeScreen).fadeIn();
      });
    }
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

    pb.home.powerPercentage = new pb.animatedvalues();
    pb.home.powerPercentage
      .init('#power-percentage', {afterText: '<span>%</span>'});
    //pb.home.powerPercentage.changeTo(0);

    pb.home.sendValue = new pb.animatedvalues();
    pb.home.sendValue
      .init('#send-value', {afterText: ''});
    pb.home.sendValue.changeTo(0);

    pb.home.retailerValue = new pb.animatedvalues();
    pb.home.retailerValue
      .init('#retailer-value', {afterText: ''});
    pb.home.retailerValue.changeTo(0);

    pb.home.retailerValue2 = new pb.animatedvalues();
    pb.home.retailerValue2
      .init('#retailer-value-2', {afterText: ''});
    pb.home.retailerValue2.changeTo(0);


    $('.links a').mouseenter(function() {
      var category = $(this).attr('class');
      var currentCategoryContainer = '.group.' + category;
      $(this).parent().siblings().addClass('inactive');

      // fade homescreen out  ==========================
      animateHeading(true);

      // fade current section in ==========================
      $(currentCategoryContainer).fadeOut(function() {
        $(currentCategoryContainer).fadeIn(function() {
          $(currentCategoryContainer)
            .toggleClass('visible-xs');
        });
      });

      // initiate number animations ==========================
      if (category == 'category-1') {
        pb.home.powerPercentage.animateTo('90');
      }else if (category == 'category-4') {
        pb.home.sendValue.animateTo('38');
      }else if (category == 'category-5') {
        pb.home.retailerValue.animateTo('45');
        pb.home.retailerValue2.animateTo('100');
      }

    });


    $('.links a').mouseout(function() {
      var category = $(this).attr('class');
      var currentCategoryContainer = '.group.' + category;
      $(this).parent().siblings().removeClass('inactive');

      // fade current section out  ==========================
      $(currentCategoryContainer).fadeOut(function() {
        $(currentCategoryContainer)
          .toggleClass('visible-xs');
      });

      animateHeading(false);

      // reset number animations ===================================
      if (category == 'category-1') {
        /* for some reason changeTo caused the 2nd
        rollover of this not to animate */
        pb.home.powerPercentage.animateTo('0');
      }else if (category == 'category-4') {
        pb.home.sendValue.changeTo('0');
      }else if (category == 'category-5') {
        pb.home.retailerValue.changeTo('0');
        pb.home.retailerValue2.changeTo('0');
      }
    });
  };

  function handlers() {
    $('.links a[data-cat=location-intelligence]').click(function(e) {
      e.preventDefault();
      pb.category.loadCategory('category', $('#home-area'));
    });
    //handle back button press - should load previous pages content
    /*window.addEventListener('popstate', function(e) {
      pb.category.loadCategory(location.pathname);
    });*/
  }
  return {
    init: init,
    powerPercentage: powerPercentage
  };
})();

$(function() {
  pb.home.init();
});
