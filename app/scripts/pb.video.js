pb.namespace('video');

pb.video = (function() {
  function init() {
    // initiate something
    handlers();

    //Loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $('.video-container').each(function(index, obj) {
      this.$obj = $(obj);
      this.$index = $(index);
      playerId = 'player' + $(index);
      videoId = this.$obj.data('video-id');
      // need the next this to be the init object not the video container object
      this.videoIdPlayerName = new initVideoPlayer(videoIdPlayerName);
    });
  };

  function initVideoPlayer(playerId, videoId) {
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var currentPlayerName = this.playerId,
        currentVideoId = this.videoId;

    this.playerId = new YT.Player(currentPlayerName, {
      videoId: currentVideoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();

    // actually need this to be siblings clearly below won't work as is :)
    var videosPlaying = event.target.siblings('.video-container');
    videosPlaying.addEventListener('click', function() {
      event.target.pauseVideo();
    });

  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }


  function handlers() {//insert initial controller event handlers here.
    $('.video-container').click(function(e) {
      currentVideo =
          '<iframe id="player" ' +
          'type="text/html" ' +
          'src="http://www.youtube.com/embed/' +
          $(this).data('video-id') +
          '?enablejsapi=1&origin=http://example.com?' +
          'rel=0&autoplay=1" frameborder="0"></iframe>';
      $(this).html(currentVideo);
    });
  }

  return {
    init: init,
    initVideoPlayer: initVideoPlayer
  };

})();

//reference: https://developers.google.com/youtube/iframe_api_reference
function onYouTubeIframeAPIReady() {
  pb.video.initVideoPlayer();
}
