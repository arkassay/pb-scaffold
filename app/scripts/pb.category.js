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

    $replace
      .after('<div class="page-content next"></div>');
    $('.page-content.next').html(pageContent);
    //$replace.addClass('animated fadeOutUp');

    $('.page-content.next').addClass('animated fadeInUp');
    $replace.fadeOut(2000, function() {
      $(this).remove();
    });
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
