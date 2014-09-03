pb.namespace('video');

pb.video = (function() {
  var videoPlayers = [],
      videoIndex = 0;

  function init() {
    // initiate somethin

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

  function savePlayer(player) {
    videoPlayers.push(player);
  }

  function onPlayerReady(event) {
    event.target.playVideo();

    /*console.log('videoPlayer >>  ' + videoPlayer);
    console.log('playerReady > ' + event.target);*/

    /*console.log(videoPlayers);

    //currentVideo = videoPlayers.length + 1;
    currentVideo = videoPlayers[videoPlayers.length][0];
    currentVideo.playVideo();*/
  };

  function onPlayerStateChange(event) {

    var newState = event.data;

    switch (newState) {
      case -1:
        //unstarted
        break;
      case 1:
        //playing
        //console.log('playing');

        $.each(videoPlayers, function(i, val) {
          /*console.log(i);
          console.log((videoPlayers.length) + ' length');*/

          if ((i + 1) != (videoPlayers.length)) {
            //video.stopVideo();
            console.log('will be stopped');
          }else {
            console.log('video should be playing!!!!!!! + video');
          }
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

      var player = initVideoPlayer(playerId, videoId);
      savePlayer(player);
      videoIndex += 1;
    });

  }

  return {
    init: init,
    //initVideoPlayer: initVideoPlayer,
    videoPlayers: videoPlayers,
    handlers: handlers
  };

})();

//reference: https://developers.google.com/youtube/iframe_api_reference
function onYouTubeIframeAPIReady() {
  pb.video.handlers();
}

$(function() {
  pb.video.init();
});
