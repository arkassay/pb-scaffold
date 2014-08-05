pb.namespace('story1');

pb.story1 = (function() {

  function init() {
    window.setTimeout(function() {
      animateHeading();
      animateP();
    }, 200);
  };

  function animateHeading() {
    $('#story-1 .story-title h3').addClass('animated fadeInUp');
  };

  function animateP() {
    $('#story-1 .story-title p').addClass('animated fadeInUp');
  };

  function clearAnimations() {
    $('#story-1 .story-title h3').removeClass('animated fadeInUp');
    $('#story-1 .story-title p').removeClass('animated fadeInUp');
  }

  return {
    init: init,
    clearAnimations: clearAnimations
  };
})();
