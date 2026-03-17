(function () {
  var audioCtx = null;
  var analyser = null;
  var sourceNode = null;
  var audioElement = null;
  var currentTrack = 0;
  var isPlaying = false;
  var canvasCtx = null;
  var animFrameId = null;

  var playlist = [
    { title: "Suburban Static", artist: "Lawn Enforcement", src: "/audio/track1.mp3" },
    { title: "Cul-de-Sac Anthem", artist: "Lawn Enforcement", src: "/audio/track2.mp3" },
    { title: "Sprinkler Head", artist: "Lawn Enforcement", src: "/audio/track3.mp3" },
    { title: "Dial Tone Lullaby", artist: "Lawn Enforcement", src: "/audio/track4.mp3" },
    { title: "Mow The Line", artist: "Lawn Enforcement", src: "/audio/track5.mp3" },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    renderPlaylist();
    initControls();
    initVisualizer();
  });

  function initAudioContext() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;

    audioElement = new Audio();
    audioElement.crossOrigin = "anonymous";
    audioElement.volume = 0.8;

    sourceNode = audioCtx.createMediaElementSource(audioElement);
    sourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);

    audioElement.addEventListener("ended", function () {
      nextTrack();
    });

    audioElement.addEventListener("timeupdate", updateTime);
    audioElement.addEventListener("loadedmetadata", updateTime);
  }

  function renderPlaylist() {
    var list = document.getElementById("winamp-playlist-list");
    if (!list) return;
    list.innerHTML = "";
    playlist.forEach(function (track, i) {
      var li = document.createElement("li");
      li.textContent = (i + 1) + ". " + track.artist + " - " + track.title;
      if (i === currentTrack) li.classList.add("active");
      li.addEventListener("dblclick", function () {
        currentTrack = i;
        loadAndPlay();
      });
      list.appendChild(li);
    });
  }

  function loadAndPlay() {
    initAudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();

    var track = playlist[currentTrack];
    audioElement.src = track.src;
    audioElement.play().catch(function () {});
    isPlaying = true;
    updateMarquee();
    highlightTrack();
    startVisualizer();
  }

  function updateMarquee() {
    var el = document.getElementById("winamp-track-title");
    if (!el) return;
    var track = playlist[currentTrack];
    el.textContent = track.artist + " - " + track.title + "   ***   ";
  }

  function highlightTrack() {
    var items = document.querySelectorAll("#winamp-playlist-list li");
    items.forEach(function (li, i) {
      li.classList.toggle("active", i === currentTrack);
    });
  }

  function updateTime() {
    var el = document.getElementById("winamp-time");
    if (!el || !audioElement) return;
    var cur = formatTime(audioElement.currentTime);
    var dur = formatTime(audioElement.duration || 0);
    el.textContent = cur + " / " + dur;

    var seek = document.getElementById("winamp-seek");
    if (seek && audioElement.duration) {
      seek.value = (audioElement.currentTime / audioElement.duration) * 100;
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    if (isPlaying) loadAndPlay();
    else {
      updateMarquee();
      highlightTrack();
    }
  }

  function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    if (isPlaying) loadAndPlay();
    else {
      updateMarquee();
      highlightTrack();
    }
  }

  function initControls() {
    var btnPlay = document.getElementById("btn-play");
    var btnPause = document.getElementById("btn-pause");
    var btnStop = document.getElementById("btn-stop");
    var btnNext = document.getElementById("btn-next");
    var btnPrev = document.getElementById("btn-prev");
    var volumeSlider = document.getElementById("winamp-volume");
    var seekSlider = document.getElementById("winamp-seek");

    if (btnPlay) btnPlay.addEventListener("click", function () { loadAndPlay(); });
    if (btnPause) btnPause.addEventListener("click", function () {
      if (audioElement) {
        if (audioElement.paused) {
          audioElement.play();
          isPlaying = true;
        } else {
          audioElement.pause();
          isPlaying = false;
        }
      }
    });
    if (btnStop) btnStop.addEventListener("click", function () {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        isPlaying = false;
        stopVisualizer();
      }
    });
    if (btnNext) btnNext.addEventListener("click", function () { nextTrack(); });
    if (btnPrev) btnPrev.addEventListener("click", function () { prevTrack(); });

    if (volumeSlider) volumeSlider.addEventListener("input", function () {
      if (audioElement) audioElement.volume = volumeSlider.value / 100;
    });

    if (seekSlider) seekSlider.addEventListener("input", function () {
      if (audioElement && audioElement.duration) {
        audioElement.currentTime = (seekSlider.value / 100) * audioElement.duration;
      }
    });
  }

  /* ===== SPECTRUM VISUALIZER ===== */
  function initVisualizer() {
    var canvas = document.getElementById("winamp-visualizer");
    if (!canvas) return;
    canvasCtx = canvas.getContext("2d");
  }

  function startVisualizer() {
    if (animFrameId) return;
    drawVisualizer();
  }

  function stopVisualizer() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (canvasCtx) {
      var canvas = document.getElementById("winamp-visualizer");
      canvasCtx.fillStyle = "#000";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function drawVisualizer() {
    animFrameId = requestAnimationFrame(drawVisualizer);
    if (!analyser || !canvasCtx) return;

    var canvas = document.getElementById("winamp-visualizer");
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "#0a0a0a";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    var barWidth = Math.floor(canvas.width / bufferLength);
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var barHeight = (dataArray[i] / 255) * canvas.height;

      var green = Math.floor(100 + (dataArray[i] / 255) * 155);
      canvasCtx.fillStyle = "rgb(0, " + green + ", 0)";

      var pixelSize = 2;
      for (var py = canvas.height; py > canvas.height - barHeight; py -= pixelSize + 1) {
        canvasCtx.fillRect(x, py - pixelSize, barWidth - 1, pixelSize);
      }

      x += barWidth;
    }
  }
})();
