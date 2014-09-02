pb.namespace('video');

pb.video = (function() {
  var videoPlayers = [],
      videoIndex = 0;

  function init() {
    // initiate something
    handlers();

    //Loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  function initVideoPlayer(playerId, videoId) {

    var videoPlayer = new YT.Player(playerId, {
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

  function onPlayerReady(event) {
    event.target.playVideo();
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

  function handlers() {

    $('.video-play').click(function(e) {
      e.preventDefault();
      $(this).parent().hide();

      var videoId = $(this).parents('.video-container').attr('data-video-id'),
          playerId = 'player-' + videoIndex;
      $(this).parent().prev().attr('id', playerId);

      /*pb.video.videoPlayers[videoIdex] = pb.video.
        initVideoPlayer(playerId, videoId);*/
      pb.video.initVideoPlayer(playerId, videoId);
      videoIndex += 1;
    });

  }

  return {
    init: init,
    initVideoPlayer: initVideoPlayer,
    videoPlayers: videoPlayers
  };

})();

//reference: https://developers.google.com/youtube/iframe_api_reference
function onYouTubeIframeAPIReady() {
  /*pb.video.initVideoPlayer();*/
  /*$('.video-container').each(function(index, obj) {});*/
}
