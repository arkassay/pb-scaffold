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
  };

  function onPlayerStateChange(event) {

    var newState = event.data;
    var currentPlayer = event.target.d.id;

    switch (newState) {
      case -1:
        //unstarted
        break;
      case 1:
        //playing

        $.each(videoPlayers, function(i, val) {

          if (currentPlayer == videoPlayers[i].d.id) {
            console.log('currently playing');
          }else {
            videoPlayers[i].pauseVideo();
          }

        });

        break;
    }
  };

  function handlers() {

    $('.video-play').click(function(e) {
      e.preventDefault();
      //$(this).parent().hide();
      $(this).parents('.hidden-video-content').hide();

      if ($(this).parents().find('.video-container').hasClass('video-full')) {
        $(this).parents('.module').addClass('no-padding')
          .find('.video-container').toggleClass('hide');
      }else {
        $(this).parents('.video-container')
          .addClass('no-padding').toggleClass('hide');
      }

      var videoId = $(this).parents('.module')
        .find('.video-container').attr('data-video-id'),
          playerId = 'player-' + videoIndex;
      //$(this).parent().prev().attr('id', playerId);
      $(this).parents('.module')
        .find('.video-container > div').attr('id', playerId);

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
