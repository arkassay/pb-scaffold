'use strict';

pb.namespace('category.content');

pb.category.content = (function() {

  function setContent(content) {

    if (content !== false) {
      //$('article[data-url=' + pagename + ']').html(requestContent);
      //fill content area and animate category page show
      //start category page animations
    } else {
      console.log('page content not found');
    }
  }

  function pushUrl(pagename) {
    history.pushState(null, null, pagename);
  }

  //for legacy support use location.href
  function refreshUrl(pagename) {
    location.href(pagename);
  }

  function getContent(pagename) {

    var req = new XMLHttpRequest();
    req.open('GET', '/content/' + pagename, false);
    req.send(null);
    if (req.status == 200) {
      return req.responseText;
    }
    return false;
  }

  return {
    getContent: getContent,
    setContent: setContent,
    pushUrl: pushUrl,
    refreshUrl: refreshUrl
  };
})();
