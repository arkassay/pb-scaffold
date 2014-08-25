'use strict';

var pb = pb || {};

(function() {
  pb.namespace = function(nsString) {
    var parts = nsString.split('.'),
        parent = pb,
        i;
    if (parts[0] === 'pb') {
      parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }
    return parent;
  };
}());

pb.version = '0.0.0';
pb.namespace('controller');

pb.controller = (function() {

  function init() {
    pb.menu.init();
    pb.header.init();
    handlers();
    //set touch boolean for global access
    pb.model.touch = $('html').hasClass('touch');

  };

  function handlers() {
    //insert initial controller event handlers here.
    $(window).load(function() {

    });
  }

  return {
    init: init
  };
})();


$(function() {
  pb.controller.init();
});

//Global (mobile): Handles viewport resizing bug on fluid layout
(function(doc) {

  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ?
             doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] +
                   ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }

}(document));
