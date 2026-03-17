(function () {
  var bootScreen = document.getElementById("boot-screen");
  var desktop = document.getElementById("desktop");
  var progressBar = document.getElementById("boot-progress");
  var clickPrompt = document.getElementById("boot-click-prompt");
  var hasClicked = false;

  if (!bootScreen || !desktop) return;

  if (window.location.search.indexOf("skipboot") !== -1) {
    bootScreen.classList.add("hidden");
    desktop.classList.remove("hidden");
    return;
  }

  clickPrompt.style.display = "block";

  bootScreen.addEventListener("click", function startBoot(e) {
    e.stopPropagation();
    e.preventDefault();
    if (hasClicked) return;
    hasClicked = true;
    bootScreen.removeEventListener("click", startBoot);
    clickPrompt.style.display = "none";
    runBootSequence();
  });

  bootScreen.addEventListener("dblclick", function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  function runBootSequence() {
    var progress = 0;
    var bootInterval = setInterval(function () {
      progress += Math.random() * 8 + 2;
      if (progress > 100) progress = 100;
      progressBar.style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(bootInterval);
        setTimeout(function () {
          bootScreen.style.transition = "opacity 0.5s";
          bootScreen.style.opacity = "0";
          setTimeout(function () {
            bootScreen.classList.add("hidden");
            bootScreen.style.opacity = "";
            desktop.classList.remove("hidden");
          }, 500);
        }, 300);
      }
    }, 120);
  }
})();
