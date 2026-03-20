# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lawn Enforcement Band — a retro Windows 95-style desktop website for the band. The frontend simulates a Win95 desktop with draggable windows, a Winamp-style music player, a VHS/CRT video player, a boot sequence animation, and a Start menu.

## Development

```bash
# Setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run dev server (http://localhost:8000, hot reload enabled)
python main.py
```

No build step — frontend assets in `static/` are served as-is.

## Architecture

- **`main.py`** — FastAPI app that mounts `static/` as a static file system. Minimal server-side logic; also configures rotating log files and reads host/port/log-level from `.env`.
- **`static/index.html`** — Single HTML entry point; loads all JS/CSS modules.
- **`static/js/`** — Vanilla JS modules, each responsible for one UI component:
  - `boot.js` — Win95 boot sequence animation
  - `desktop.js` — Window management (drag, focus, open/close)
  - `music-player.js` — Winamp-style player
  - `start-menu.js` — Start menu
  - `video-player.js` — VHS/CRT video player
- **`static/css/`** — Per-component stylesheets; `crt.css` provides scanline effects used by the video player.
- **`vercel.json`** — SPA rewrites (all routes → `index.html`) and explicit `Content-Type` headers for audio/video assets.

## Adding Media Assets

- Drop MP3 files into `static/audio/` and register them in `music-player.js`.
- Drop MP4 files into `static/video/` and reference them in `video-player.js`.

## Deployment

Deployed on Vercel. The `vercel.json` config handles routing and media content-type headers — no additional config needed.
