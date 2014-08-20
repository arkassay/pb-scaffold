pb.namespace('video');

pb.video = (function() {
  var videoPlayers = [];

  function init() {
    // initiate something

    //Loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  function initVideoPlayer(playerId, videoId) {

    var videoPlayer = new YT.Player(playerId, {
      /*height: '425',
      width: '356',*/
      videoId: videoId,
      origin: location.origin,
      playerVars: {
        wmode: 'transparent'
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    return videoPlayer;
  }

  function onPlayerReady() {
    console.log('player ready');
  };

  function onPlayerStateChange(event) {

    var newState = event.data;
    switch (newState) {
      case -1:
        //unstarted
        break;
      case 1:
        //playing
        $.each(pb.video.videoPlayers, function(i, val) {
          console.log(pb.video.videoPlayers[i]);
        });
        break;
    }
  };

  return {
    init: init,
    initVideoPlayer: initVideoPlayer,
    videoPlayers: videoPlayers
  };

})();

//reference: https://developers.google.com/youtube/iframe_api_reference
function onYouTubeIframeAPIReady() {
  /*pb.video.initVideoPlayer();*/
  $('.video-container').each(function(index, obj) {
    // need the next this to be the init object not the video container object
    var videoId = $(this).attr('data-video-id'),
        playerId = $(this).children('div').attr('id');

    pb.video.videoPlayers[index] = pb.video
            .initVideoPlayer(playerId, videoId);
  });
}

$(function() {
  pb.video.init();
});
