'use strict';

pb.namespace('home');

pb.home = (function() {
  var currStory = 0;

  function init() {
    handlers();
  };

  //for modern browsers use pushState()
  function goToCategory(pagename, content) {
    history.pushState(null, null, pagename + '.html');
    var requestContent = getCategoryContent(content);

    if (requestContent !== false) {
      $('article[data-url=' + pagename + ']').html(requestContent);
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
            //var pagename = data.toSlide.attr('data-url');
            //var storycontent = data.toSlide.attr('data-content');
            //changeStory(pagename, storycontent);
          });

      $('.welcome a').click(function(e) {
        e.preventDefault();
        var category = $(this).attr('class');
        category = parseInt(category.split('-')[1]);
        goToCategory(pagename, content);
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
    currStory: currStory,
    goToStory: goToStory
  };
})();
