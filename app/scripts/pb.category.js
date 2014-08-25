'use strict';

pb.namespace('category');

pb.category = (function() {

  function init() {
    /*var pagename = location.pathname;
    var categoryContent = pb.category.content.getContent(pagename);
    pb.category.content.setContent(categoryContent);*/

    handlers();
  };

  function loadCategory(pagename, $replace) {
    var pageContent = pb.category.content.getContent(pagename);
    pb.category.content.pushUrl(pagename);

    $replace.addClass('animated fadeOutUp').fadeOut();

    $('header')
      .append('<div class="page-content next animated fadeInUp"></div>');
    $('.page-content.next').html(pageContent);
  }

  function handlers() {
  }

  return {
    init: init,
    loadCategory: loadCategory
  };
})();

$(function() {
  pb.category.init();
});
