'use strict';

pb.namespace('home');

pb.home = (function() {

  var init = function init() {
    handlers();
  };

  function handlers() {
    //insert initial controller event handlers here.
    $(window).load(function() {

      $('#wrapper').snappish()
        .on('scrollbegin.snappish', function(e, data) {
            data.toSlide.css('background-color', 'rgba(0,0,0,0.2)');
          })
        .on('scrollend.snappish', function(e, data) {
            data.toSlide.css('background-color', 'transparent');
          });

      $('button.up').on('click', function() {
        $('#wrapper').trigger('scrollup.snappish');
      });

      $('button.down').on('click', function() {
        $('#wrapper').trigger('scrolldown.snappish');
      });

      $('button.top').on('click', function() {
        $('#wrapper').trigger('scrollto.snappish', 0);
      });

      $('button.bottom').on('click', function() {
        $('#wrapper').trigger('scrollto.snappish', 4);
      });
    });
  }

  return {
    init: init
  };
})();
