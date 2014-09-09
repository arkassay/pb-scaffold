pb.namespace('video');

pb.video = (function() {
  var ytPlayersArray = [];

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

  function saveYtPlayerToArray(youTubePlayer) {
    ytPlayersArray.push(youTubePlayer);
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

        $.each(ytPlayersArray, function(i, val) {

          if (currentPlayer == ytPlayersArray[i].d.id) {
            // currently playing
          }else {
            ytPlayersArray[i].pauseVideo();
          }

        });

        break;
    }
  };

  function injectNewVideoPlayer(playButton) {
    var videoId = $(playButton).parents('.module')
          .find('.video-container').attr('data-video-id'),
        playerId = 'player-' + videoId,
        playerContainer = $(playButton).parents('.module')
          .find('.video-container');

    $(playerContainer).html('<div></div>');
    $(playerContainer).children(':first-child').attr('id', playerId);

    var youTubePlayer = initVideoPlayer(playerId, videoId);
    saveYtPlayerToArray(youTubePlayer);

    showVideoContainerRemoveParentPadding(playButton);
  };

  function showVideoContainerRemoveParentPadding(playButton) {
    if ($(playButton).parents().
        find('.video-container').hasClass('video-full')) {
      $(playButton).parents('.module').addClass('no-padding')
        .find('.video-container').toggleClass('hide');
    }else {
      $(playButton).parents('.video-container')
        .addClass('no-padding').toggleClass('hide');
    }

    hideStaticVideoContent(playButton);
  };

  function hideStaticVideoContent(playButton) {
    $(playButton).parents('.hidden-video-content').hide();
  };

  function handlers() {

    $('.video-play').click(function(e) {
      e.preventDefault();
      var playButton = $(this);
      injectNewVideoPlayer(playButton);
    });

  }


  return {
    init: init,
    //initVideoPlayer: initVideoPlayer,
    ytPlayersArray: ytPlayersArray,
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
