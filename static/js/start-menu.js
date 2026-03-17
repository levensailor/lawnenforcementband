(function () {
  var startButton = null;
  var startMenu = null;
  var isOpen = false;

  document.addEventListener("DOMContentLoaded", function () {
    startButton = document.getElementById("start-button");
    startMenu = document.getElementById("start-menu");
    if (!startButton || !startMenu) return;

    startButton.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener("click", function (e) {
      if (isOpen && !startMenu.contains(e.target) && e.target !== startButton) {
        closeMenu();
      }
    });

    initMenuItems();
    initShutdown();
  });

  function toggleMenu() {
    if (isOpen) closeMenu();
    else openMenu();
  }

  function openMenu() {
    startMenu.classList.remove("hidden");
    isOpen = true;
    startButton.classList.add("active");
  }

  function closeMenu() {
    startMenu.classList.add("hidden");
    isOpen = false;
    startButton.classList.remove("active");
  }

  function initMenuItems() {
    var items = startMenu.querySelectorAll(".start-menu-item[data-window]");
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var winId = item.getAttribute("data-window");
        if (window.DesktopManager) {
          window.DesktopManager.openWindow(winId);
        }
        closeMenu();
      });
    });
  }

  function initShutdown() {
    var shutdownBtn = document.getElementById("menu-shut-down");
    if (!shutdownBtn) return;

    shutdownBtn.addEventListener("click", function () {
      closeMenu();
      var desktop = document.getElementById("desktop");
      var taskbar = document.getElementById("taskbar");
      var shutdownScreen = document.getElementById("shutdown-screen");
      var crtOverlay = document.getElementById("crt-overlay");

      if (desktop) desktop.classList.add("hidden");
      if (taskbar) taskbar.style.display = "none";
      if (crtOverlay) crtOverlay.style.display = "none";
      if (shutdownScreen) shutdownScreen.classList.remove("hidden");
    });
  }
})();
