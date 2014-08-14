'use strict';

pb.namespace('category');

pb.category = (function() {

  function init() {
    var pagename = location.pathname;
    var categoryContent = pb.category.content.getContent(pagename);
    pb.category.content.setContent(categoryContent);
  };

  return {
    init: init
  };
})();
