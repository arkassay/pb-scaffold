'use strict';

pb.namespace('opensearch');

pb.opensearch = (function() {
  var $searchOverlay = $('.search-overlay');
  var $searchBg = $('.search-bg');

  function reset() {
    $searchOverlay.css({
      'visibility': 'hidden',
      'display': 'none'
    });
    TweenMax.set($searchOverlay, {
      bottom: 0, opacity: 1, rotationX: -20, scale: 1
    });
    TweenMax.set($searchBg, { top: '100%' });
    TweenMax.set($searchBg, { rotationX: 0, scale: .9, opacity: 0 });
  };

  function animateIn() {
    $searchOverlay.css({
      'visibility': 'visible',
      'display': 'block'
    });

    TweenMax.to($searchBg, 2, { opacity: 1 });
    TweenMax.to($searchBg, .3, { autoAlpha: 1, bottom: '0%' });
    TweenMax.to($searchBg, .5, { scale: 1, rotationX: 0, opacity: 1 });
    TweenMax.to($searchOverlay, 3, { rotationX: 0, ease: Elastic.easeOut});
  };

  function animateOut() {

    TweenMax.to($searchBg, 2, { opacity: 0 });
    TweenMax.to($searchOverlay, 2, { opacity: 0 });
    TweenMax.to($searchOverlay, .1, {
      transformOrigin: '50% 0', scale: 1
    });
    TweenMax.to($searchOverlay, .2, { delay: 0, bottom: '180%' });
    TweenMax.to($searchOverlay, 3, {
      opacity: 1, rotationX: -180, ease: Elastic.easeOut,
      onComplete: function() {
        reset();
      }
    });
  };


  function handlers() {
    $('.close.close-search').click(function(e) {
      animateOut();
    });

    $('.icn-search').click(function(e) {
      setTimeout(function() {
        animateIn();
      }, 140);
    });
  };

  function init() {
    TweenMax.set($searchOverlay, { transformPerspective: 400 });
    TweenMax.set($searchBg, {
      transformPerspective: 400, rotationX: -20, scale: .9, opacity: 0
    });
    TweenMax.to($searchOverlay, .1, {
      transformOrigin: '50% 0', scale: 1
    });
    handlers();
    reset();
  };

  return {
    init: init,
    animateIn: animateIn
  };
})();
