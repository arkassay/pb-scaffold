'use strict';

pb.namespace('home');

pb.home = (function() {
  var currStory = 0;

  function init() {
    handlers();
  };

  function animateStory1() {
    console.log('animating story 1');
  };

  function animateStory2() {

  };

  function animateStory3() {

  };

  function animateStory4() {

  };

  //for modern browsers use pushState()
  function changeStory(pagename, storycontent) {
    history.pushState(null, null, pagename + '.html');
    var requestContent = getStoryContent(storycontent);

    if (requestContent !== false) {
      $('article[data-url=' + pagename + ']').html(requestContent);
      //start correct animation
      if (pagename === 'brand-story-1') {
        animateStory1();
      } else if (pagename === 'brand-story-2') {
        animateStory2();
      } else if (pagename === 'brand-story-3') {
        animateStory3();
      } else if (pagename === 'brand-story-4') {
        animateStory4();
      }
    }
  }

  //for legacy support use location.href
  function legacyChangeUrl(pagename) {
    location.href(pagename);
  }

  function getStoryContent(storycontent) {
    var req = new XMLHttpRequest();
    req.open('GET', '/content/' + storycontent + '.html', false);
    req.send(null);
    if (req.status == 200) {
      return req.responseText;
    }
    return false;
  }

  function goToStory(num) {
    $('#wrapper').trigger('scrollto.snappish', num);
  };

  function handlers() {
    var home = pb.home;
    //insert initial controller event handlers here.
    $(window).load(function() {

      $('#wrapper').snappish()
        .on('scrollbegin.snappish', function(e, data) {
            //data.toSlide.css('background-color', 'rgba(0,0,0,0.2)');
          })
        .on('scrollend.snappish', function(e, data) {
            pb.home.currStory = data.toSlideNum;
            var pagename = data.toSlide.attr('data-url');
            var storycontent = data.toSlide.attr('data-content');
            changeStory(pagename, storycontent);
          });

      $('.welcome a').click(function(e) {
        e.preventDefault();
        var story = $(this).attr('class');
        story = parseInt(story.split('-')[1]);
        goToStory(story);
      });

      /*$('button.up').on('click', function() {
        $('#wrapper').trigger('scrollup.snappish');
      });*/

      $('.down-arrow').on('click', function() {
        $('#wrapper').trigger('scrolldown.snappish');
      });
    });
  }

  return {
    init: init,
    currStory: currStory
  };
})();
