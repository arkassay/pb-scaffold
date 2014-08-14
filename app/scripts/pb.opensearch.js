'use strict';

pb.namespace('opensearch');

pb.opensearch = (function() {
  var $searchOverlay = $('.search-overlay');
  var $searchBg = $('.search-bg');

  function reset() {
    $searchOverlay.css('visibility', 'hidden');
    TweenMax.set($searchOverlay, {
      top: 0, opacity: 1, rotationX: 0, scale: 1
    });
    TweenMax.set($searchBg, { top: '100%' });
    TweenMax.set($searchBg, { rotationX: 15, scale: .72, opacity: 0 });
  };

  function animateIn() {

    $searchOverlay.css('visibility', 'visible');
    TweenMax.to($searchBg, .3, { autoAlpha: 1, top: '0%' });
    TweenMax.to($searchBg, .5, { scale: 1, rotationX: 0, opacity: 1 });

    var time = .5,
        delay = .5;

    var easing = Quad.easeOut;
    var delay2 = delay + time - .2;
    delay2 -= .3;
  };

  function animateOut() {

    TweenMax.to($searchBg, .4, { opacity: .4 });
    TweenMax.to($searchOverlay, .4, {
      transformOrigin: 'center bottom', scale: .8
    });
    TweenMax.to($searchOverlay, .5, { delay: .1, top: '120%' });
    TweenMax.to($searchOverlay, .9, { rotationX: 10, onComplete: function() {
      reset();}
    });
  };

  function animateOut() {
    TweenMax.to($searchOverlay, .4, {
      rotationX: 2, transformOrigin: 'center bottom', scale: .8
    });
    TweenMax.to($searchOverlay, .5, { delay: .2, top: '-120%', rotationX: 10 });
  };

  function handlers() {
    $('#sf-exit').click(function(e) {
      animateOut();
    });

    $('.icn-search').click(function(e) {
      setTimeout(function() {
        animateIn();
      }, 140);
    });
  };

  function init() {
    TweenMax.set($searchOverlay, { transformPerspective: 600 });
    TweenMax.set($searchBg, {
      transformPerspective: 600, rotationX: 15, scale: .72, opacity: 0
    });
    handlers();
  };

  return {
    init: init,
    animateIn: animateIn
  };
})();
