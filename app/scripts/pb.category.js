'use strict';

pb.namespace('category');

pb.category = (function() {

  function init() {
    /*var pagename = location.pathname;
    var categoryContent = pb.category.content.getContent(pagename);
    pb.category.content.setContent(categoryContent);*/

    handlers();
  };

  function loadCategory(pagename) {
    var pageContent = pb.category.content.getContent(pagename);
    pb.category.content.pushUrl(pagename);

    $('.page-content').addClass('animated fadeOutLeft').fadeOut();

    $('.page-container')
      .append('<div class="page-content next animated fadeInRight"></div>');
    $('.page-content.next').html(pageContent);
  }

  function handlers() {
    $('.categorychange').click(function(e) {
      e.preventDefault();
      loadCategory('story-1-content.html');
    });

    //handle back button press - should load previous pages content
    window.addEventListener('popstate', function(e) {
      //loadCategory(location.pathname);
    });
  }

  return {
    init: init,
    loadCategory: loadCategory
  };
})();

$(function() {
  pb.category.init();
});
