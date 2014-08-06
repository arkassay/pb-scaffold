'use strict';

pb.namespace('brandstory');

pb.brandstory = (function() {
  var currStory = 0;

  function init() {
    handlers();
  };

  //for modern browsers use pushState()
  function goToCategory(pagename) {
    history.pushState(null, null, pagename + '.html');
    var requestContent = getCategoryContent(pagename);

    if (requestContent !== false) {
      //$('article[data-url=' + pagename + ']').html(requestContent);
      //fill content area and animate category page show
      //start category page animations
    }
  }

  //for legacy support use location.href
  function legacyChangeUrl(pagename) {
    location.href(pagename);
  }

  function getStoryContent(content) {
    var req = new XMLHttpRequest();
    req.open('GET', '/content/' + content + '.html', false);
    req.send(null);
    if (req.status == 200) {
      return req.responseText;
    }
    return false;
  }

  function goToStory(num) {
    $('#wrapper').trigger('scrollto.snappish', num);
  };

  function animateArea(prevArea, storyArea) {
    if (storyArea === 'welcome') {
      pb.welcome.init();
    } else if (storyArea === 'story-1') {
      pb.brandstory.story1.init();
    }

    if (prevArea === 'story-1') {
      pb.brandstory.story1.clearAnimations();
    }
  };

  function handlers() {
    var home = pb.home;
    $(window).load(function() {
      pb.brandstory.story1.init();
      $('#wrapper').snappish()
        .on('scrollbegin.snappish', function(e, data) {
            var prevArea = data.fromSlide.attr('id');
            var storyArea = data.toSlide.attr('id');
            //clearPrevArea(prevArea);
            animateArea(prevArea, storyArea);
          })
        .on('scrollend.snappish', function(e, data) {
            pb.brandstory.currStory = data.toSlideNum;

          });

      $('.welcome a').click(function(e) {
        e.preventDefault();
        var category = $(this).attr('id');
        //goToCategory(category);
      });

      $('.down-arrow').on('click', function() {
        $('#wrapper').trigger('scrolldown.snappish');
      });
    });
  }

  return {
    init: init,
    currStory: currStory,
    goToStory: goToStory
  };
})();

$(function() {
  pb.brandstory.init();
});
