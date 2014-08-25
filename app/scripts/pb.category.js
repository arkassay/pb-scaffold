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


    if (!pb.model.touch) {
      $('.page-content.next').html(pageContent).css({
        'top' : '100%',
        'position' : 'relative' }).animate({
        'top': 0
      }, 1000);

      $replace.animate({
        top: '-100%'
      },1000, function() {
        $replace.remove();
      });
    } else {
      $('.page-content.next').html(pageContent);
      $replace.slideUp(1000, function() {
        $(this).remove();
      });
      //$('html, body').animate({ 'scrollTop' : '0px' });
      $('html, body').scrollTop(0);
    }

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
