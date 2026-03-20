(function () {
  var zCounter = 10;
  var activeWindow = null;

  document.addEventListener("DOMContentLoaded", function () {
    initIcons();
    initWindowControls();
    initTaskbarClock();
    initGuestbook();
    initRecycleBin();
  });

  /* ===== DESKTOP ICONS ===== */
  function initIcons() {
    var icons = document.querySelectorAll(".desktop-icon[data-window]");
    icons.forEach(function (icon) {
      icon.addEventListener("dblclick", function () {
        var winId = icon.getAttribute("data-window");
        openWindow(winId);
      });
    });
  }

  /* ===== WINDOW MANAGEMENT ===== */
  function openWindow(winId) {
    var win = document.getElementById(winId);
    if (!win) return;
    win.classList.remove("hidden");
    bringToFront(win);
    addTaskbarButton(winId, win);
  }

  function closeWindow(winId) {
    var win = document.getElementById(winId);
    if (!win) return;
    win.classList.add("hidden");
    win.classList.remove("maximized");
    removeTaskbarButton(winId);
  }

  function minimizeWindow(winId) {
    var win = document.getElementById(winId);
    if (!win) return;
    win.classList.add("hidden");
    var btn = document.querySelector('.taskbar-window-btn[data-window="' + winId + '"]');
    if (btn) btn.classList.remove("active");
  }

  function maximizeWindow(winId) {
    var win = document.getElementById(winId);
    if (!win) return;
    if (win.classList.contains("maximized")) {
      win.classList.remove("maximized");
      if (win._savedStyle) {
        win.style.left = win._savedStyle.left;
        win.style.top = win._savedStyle.top;
        win.style.width = win._savedStyle.width;
        win.style.height = win._savedStyle.height;
      }
    } else {
      win._savedStyle = {
        left: win.style.left,
        top: win.style.top,
        width: win.style.width,
        height: win.style.height,
      };
      win.classList.add("maximized");
    }
  }

  function bringToFront(win) {
    zCounter++;
    win.style.zIndex = zCounter;
    document.querySelectorAll(".desktop-window").forEach(function (w) {
      w.classList.remove("window-active");
    });
    win.classList.add("window-active");
    activeWindow = win;

    var btn = document.querySelector(
      '.taskbar-window-btn[data-window="' + win.id + '"]'
    );
    document.querySelectorAll(".taskbar-window-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    if (btn) btn.classList.add("active");
  }

  /* ===== WINDOW CONTROLS (min/max/close buttons) ===== */
  function initWindowControls() {
    document.querySelectorAll(".desktop-window").forEach(function (win) {
      win.addEventListener("mousedown", function () {
        bringToFront(win);
      });

      var titleBar = win.querySelector(".title-bar");
      if (titleBar) {
        initDrag(win, titleBar);
      }

      win.querySelectorAll(".title-bar-controls button").forEach(function (btn) {
        btn.addEventListener("mousedown", function (e) {
          e.stopPropagation();
        });

        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          var action = btn.getAttribute("data-action") || btn.getAttribute("aria-label").toLowerCase();
          if (action === "close") closeWindow(win.id);
          else if (action === "minimize") minimizeWindow(win.id);
          else if (action === "maximize") maximizeWindow(win.id);
        });
      });
    });
  }

  /* ===== DRAGGING ===== */
  function initDrag(win, handle) {
    var offsetX = 0;
    var offsetY = 0;
    var dragging = false;

    handle.addEventListener("mousedown", function (e) {
      if (e.target.tagName === "BUTTON") return;
      if (win.classList.contains("maximized")) return;
      dragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      bringToFront(win);
      e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var newLeft = e.clientX - offsetX;
      var newTop = e.clientY - offsetY;
      newTop = Math.max(0, newTop);
      newTop = Math.min(window.innerHeight - 40, newTop);
      win.style.left = newLeft + "px";
      win.style.top = newTop + "px";
    });

    document.addEventListener("mouseup", function () {
      dragging = false;
    });
  }

  /* ===== TASKBAR BUTTONS ===== */
  function addTaskbarButton(winId, win) {
    var container = document.getElementById("taskbar-windows");
    if (container.querySelector('[data-window="' + winId + '"]')) {
      var existing = container.querySelector('[data-window="' + winId + '"]');
      existing.classList.add("active");
      return;
    }
    var titleText = win.querySelector(".title-bar-text");
    var btn = document.createElement("button");
    btn.className = "taskbar-window-btn active";
    btn.setAttribute("data-window", winId);
    btn.textContent = titleText ? titleText.textContent : winId;
    btn.addEventListener("click", function () {
      if (win.classList.contains("hidden")) {
        win.classList.remove("hidden");
        bringToFront(win);
        btn.classList.add("active");
      } else if (activeWindow === win) {
        minimizeWindow(winId);
      } else {
        bringToFront(win);
      }
    });
    container.appendChild(btn);
  }

  function removeTaskbarButton(winId) {
    var btn = document.querySelector('.taskbar-window-btn[data-window="' + winId + '"]');
    if (btn) btn.remove();
  }

  /* ===== TASKBAR CLOCK ===== */
  function initTaskbarClock() {
    var clock = document.getElementById("taskbar-clock");
    function update() {
      var now = new Date();
      var h = now.getHours();
      var m = now.getMinutes();
      var ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      clock.textContent = h + ":" + (m < 10 ? "0" : "") + m + " " + ampm;
    }
    update();
    setInterval(update, 10000);
  }

  /* ===== GUESTBOOK ===== */
  function initGuestbook() {
    var submitBtn = document.getElementById("gb-submit");
    if (!submitBtn) return;
    submitBtn.addEventListener("click", function () {
      var nameInput = document.getElementById("gb-name");
      var msgInput = document.getElementById("gb-message");
      var name = nameInput.value.trim();
      var msg = msgInput.value.trim();
      if (!name || !msg) return;

      var entries = document.getElementById("guestbook-entries");
      var entry = document.createElement("div");
      entry.className = "guestbook-entry";

      var now = new Date();
      var dateStr =
        (now.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        now.getDate().toString().padStart(2, "0") +
        "/" +
        now.getFullYear();

      entry.innerHTML =
        '<div class="entry-meta"><strong>' +
        escapeHtml(name) +
        "</strong> | " +
        dateStr +
        " | Netscape</div><p>" +
        escapeHtml(msg) +
        "</p>";
      entries.insertBefore(entry, entries.firstChild);
      nameInput.value = "";
      msgInput.value = "";

      var counter = document.getElementById("visitor-counter");
      if (counter) {
        var val = parseInt(counter.textContent, 10) + 1;
        counter.textContent = val.toString().padStart(6, "0");
      }
    });
  }

  /* ===== RECYCLE BIN ===== */
  function initRecycleBin() {
    var emptyBtn = document.getElementById("empty-recycle-btn");
    if (!emptyBtn) return;

    emptyBtn.addEventListener("click", function () {
      var fileList = document.getElementById("recycle-file-list");
      var emptyMsg = document.getElementById("recycle-empty-msg");
      var status = document.getElementById("recycle-status");

      var files = fileList.querySelectorAll(".recycle-file");
      if (files.length === 0) return;

      files.forEach(function (f) { f.remove(); });
      fileList.classList.add("hidden");
      emptyMsg.classList.remove("hidden");
      emptyBtn.disabled = true;
      status.textContent = "All items permanently deleted.";
    });
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  window.DesktopManager = {
    openWindow: openWindow,
    closeWindow: closeWindow,
    bringToFront: bringToFront,
    initWindow: function (win) {
      win.addEventListener("mousedown", function () {
        bringToFront(win);
      });
      var titleBar = win.querySelector(".title-bar");
      if (titleBar) initDrag(win, titleBar);
      win.querySelectorAll(".title-bar-controls button").forEach(function (btn) {
        btn.addEventListener("mousedown", function (e) { e.stopPropagation(); });
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          var action = btn.getAttribute("data-action") || btn.getAttribute("aria-label").toLowerCase();
          if (action === "close") closeWindow(win.id);
          else if (action === "minimize") minimizeWindow(win.id);
          else if (action === "maximize") maximizeWindow(win.id);
        });
      });
      addTaskbarButton(win.id, win);
    },
  };
})();
