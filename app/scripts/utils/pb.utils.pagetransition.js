'use strict';

pb.namespace('utils.pagetransition');

pb.utils.pagetransition = function() {

  var options;

  function init(setOptions) {
    if (setOptions) {
      options = setOptions;
      controlTransition();
    } else {
      //if the options aren't included can't run the transition
      return false;
    }
  }

  function controlTransition() {
    if (window.history && window.history.pushState) {
      getContent({
        success: function(content) {
          history.pushState(null, null, options.pagename + '.html');
          animateContentIn(content);
          handleBrowserBack();
        },
        failure: function() {
          //do nothing??
          console.log('FAILED');
        }
      });
    } else {
      location.href = pagename + '.html';
    }
  }

  function animateContentIn(content) {
    if (!pb.model.touch) {
      runDesktopAnimation(content);
    } else {
      runMobileAnimation(content);
    }
  }

  function runDesktopAnimation(content) {
    var $replace = options.replaceElement;

    $replace
      .after('<div class="page-content next"></div>');

    $('.page-content.next').html(content).css({
      'top' : '100%',
      'position' : 'relative' }).animate({
      'top': 0
    }, 1000);

    $replace.animate({
      top: '-100%'
    },1000, function() {
      $replace.remove();
      if (options.callback) {
        options.callback();
      }
    });
  }

  function runMobileAnimation(content) {
    var $replace = options.replaceElement;

    $replace
      .after('<div class="page-content next"></div>');

    $('.page-content.next').html(content);
    $replace.slideUp(1000, function() {
      $(this).remove();
    });
    $('html, body').scrollTop(0);
  }

  function getContent(response) {

    var req = new XMLHttpRequest(),
        path = location.pathname,
        lastIndex = path.lastIndexOf('/');

    path = path.slice(0, lastIndex);
    req.open('GET', path +
        '/content/' + options.pagename + '-content.html', false);
    req.send(null);
    if (req.status == 200) {
      if (content != false) {
        var content = req.responseText;
        response.success(content);
      } else {
        response.failure();
      }
    }
    return false;
  }

  function handleBrowserBack() {
    window.addEventListener('popstate', function(e) {
      location.href = location.href;
    });
  }

  return {
    init: init
  };

};
