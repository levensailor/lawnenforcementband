(function () {
  var video = null;
  var indicator = null;
  var timestamp = null;
  var seekSlider = null;
  var indicatorTimeout = null;

  document.addEventListener("DOMContentLoaded", function () {
    video = document.getElementById("vhs-video");
    indicator = document.getElementById("vhs-indicator");
    timestamp = document.getElementById("vhs-timestamp");
    seekSlider = document.getElementById("vcr-seek");

    if (!video) return;

    initVCRControls();
    initTimestamp();
    initSeek();
  });

  function initVCRControls() {
    var btnPlay = document.getElementById("vcr-play");
    var btnPause = document.getElementById("vcr-pause");
    var btnStop = document.getElementById("vcr-stop");
    var btnRew = document.getElementById("vcr-rew");
    var btnFF = document.getElementById("vcr-ff");

    if (btnPlay) btnPlay.addEventListener("click", function () {
      video.play().catch(function () {});
      showIndicator("PLAY ▶");
    });

    if (btnPause) btnPause.addEventListener("click", function () {
      video.pause();
      showIndicator("PAUSE ❚❚");
    });

    if (btnStop) btnStop.addEventListener("click", function () {
      video.pause();
      video.currentTime = 0;
      showIndicator("STOP ■");
    });

    if (btnRew) {
      var rewInterval = null;
      btnRew.addEventListener("mousedown", function () {
        showIndicator("◀◀ REW");
        rewInterval = setInterval(function () {
          video.currentTime = Math.max(0, video.currentTime - 2);
        }, 100);
      });
      var clearRew = function () {
        if (rewInterval) { clearInterval(rewInterval); rewInterval = null; }
        hideIndicator();
      };
      btnRew.addEventListener("mouseup", clearRew);
      btnRew.addEventListener("mouseleave", clearRew);

      btnRew.addEventListener("click", function () {
        video.currentTime = Math.max(0, video.currentTime - 10);
        showIndicator("◀◀ REW");
      });
    }

    if (btnFF) {
      var ffInterval = null;
      btnFF.addEventListener("mousedown", function () {
        showIndicator("FF ▶▶");
        ffInterval = setInterval(function () {
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 2);
        }, 100);
      });
      var clearFF = function () {
        if (ffInterval) { clearInterval(ffInterval); ffInterval = null; }
        hideIndicator();
      };
      btnFF.addEventListener("mouseup", clearFF);
      btnFF.addEventListener("mouseleave", clearFF);

      btnFF.addEventListener("click", function () {
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        showIndicator("FF ▶▶");
      });
    }
  }

  function showIndicator(text) {
    if (!indicator) return;
    indicator.textContent = text;
    indicator.classList.add("visible");
    if (indicatorTimeout) clearTimeout(indicatorTimeout);
    indicatorTimeout = setTimeout(function () {
      if (text.indexOf("PLAY") !== -1 && !video.paused) return;
      hideIndicator();
    }, 2000);
  }

  function hideIndicator() {
    if (indicator) indicator.classList.remove("visible");
  }

  function initTimestamp() {
    if (!video || !timestamp) return;
    video.addEventListener("timeupdate", function () {
      timestamp.textContent = formatVHSTime(video.currentTime);
      if (seekSlider && video.duration) {
        seekSlider.value = (video.currentTime / video.duration) * 100;
      }
    });
  }

  function initSeek() {
    if (!seekSlider || !video) return;
    seekSlider.addEventListener("input", function () {
      if (video.duration) {
        video.currentTime = (seekSlider.value / 100) * video.duration;
      }
    });
  }

  function formatVHSTime(seconds) {
    if (isNaN(seconds)) return "00:00:00";
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    return (
      (h < 10 ? "0" : "") + h + ":" +
      (m < 10 ? "0" : "") + m + ":" +
      (s < 10 ? "0" : "") + s
    );
  }
})();
