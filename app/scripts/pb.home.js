pb.namespace('home');

pb.home = (function() {

  var homeScreen = '.group.default',
      activeLinks = false,
      animatedValuesArr = [];

  function init() {
    generateAnimatedValuesArr();
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
    if (activeLinks == false &&
        $(homeScreen).hasClass('visible-xs')) {
      $(homeScreen).fadeOut(function() {
        $(homeScreen).removeClass('visible-xs');
        $(homeScreen).fadeIn();
      });
    }
  };

  function animateCategoryLinks() {
    $('.welcome .links').addClass('animated fadeInUp');
  };


  function animateCategoryBgIn(currentCategoryContainer) {
    $(currentCategoryContainer).fadeOut(function() {
      $(currentCategoryContainer).fadeIn(function() {
        $(currentCategoryContainer)
          .toggleClass('visible-xs');
        checkForAnimatedValues(currentCategoryContainer);
      });
    });
  };

  function animateCategoryBgOut(currentCategoryContainer) {
    $(currentCategoryContainer).fadeOut(function() {
      $(currentCategoryContainer)
      .toggleClass('visible-xs');
      if (!$('.links .cat').hasClass('inactive')) {
        animateHeading(false);
      }
    });
  }

  function generateAnimatedValuesArr() {
    // animated numbers
    $('.animatedValue').each(function(index, value) {
      var id = $(value).attr('id'),
          percent = $(value).hasClass('percent');

      animatedValuesArr[index] = new pb.animatedvalues();

      if (percent) {
        animatedValuesArr[index].init(id, {afterText: '<span>%</span>'});
      } else {
        animatedValuesArr[index].init(id, {afterText: ''});
      }
      animatedValuesArr[index].changeTo(0);
    });
  }


  function checkForAnimatedValues(currCategoryContainer) {
    //get animated value(s) within a visible category
    //on hover and animate it
    var animatedVal = $(currCategoryContainer).find('.animatedValue'),
        animateId = '';

    $.each(animatedVal, function() {
      animateId = $(this).attr('id');
      $.each(animatedValuesArr, function(i, val) {
        if (animatedValuesArr[i].$el.selector == animateId) {
          animatedValuesArr[i].animateTo();
        }
      });
    });
  }

  function handlers() {
    //category page transition event
    $('.cat-transition').click(function(e) {
      e.preventDefault();
      var catPage = $(this).attr('data-cat');
      if (catPage) {
        $('footer').css('position' , 'static');
        var transitionOptions = {
          replaceElement: $('#home-area'),
          pagename: catPage,
          callback: function() {
            pb.category.fixedTabs();
          }
        };
        var pageTransition = new pb.utils.pagetransition();
        pageTransition.init(transitionOptions);
      }
    });

    //product category link hover events
    $('.links a').mouseenter(function() {
      var category = $(this).attr('data-catshow');
      var currentCategoryContainer = '.group.' + category;
      $(this).parent().siblings().addClass('inactive');

      // fade homescreen out  ==========================
      animateHeading(true);
      animateCategoryBgIn(currentCategoryContainer);

    });

    $('.links a').mouseout(function() {
      var category = $(this).attr('data-catshow');
      var currentCategoryContainer = '.group.' + category;
      $(this).parent().siblings().removeClass('inactive');

      // fade current section out  ==========================
      animateCategoryBgOut(currentCategoryContainer);

    });
  }
  return {
    init: init
  };
})();

$(function() {
  pb.home.init();
});
