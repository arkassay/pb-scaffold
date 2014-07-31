'use strict';

pb.namespace('home');

pb.home = (function() {
  var currStory = 0;

  function init() {
    handlers();
  };

  function story1() {

  };

  function story2() {

  };

  function story3() {

  };

  function story4() {

  };

  function goToStory(num) {
    $('#wrapper').trigger('scrollto.snappish', num);
  };

  function updateStoryRef(data) {
    pb.home.currStory = data.toSlideNum;
  }

  function handlers() {
    var home = pb.home;
    //insert initial controller event handlers here.
    $(window).load(function() {

      $('#wrapper').snappish()
        .on('scrollbegin.snappish', function(e, data) {
            //data.toSlide.css('background-color', 'rgba(0,0,0,0.2)');
          })
        .on('scrollend.snappish', function(e, data) {
            updateStoryRef(data);
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
