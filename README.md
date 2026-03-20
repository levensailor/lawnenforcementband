# Lawn Enforcement

A retro Windows 95-style desktop website for the band **Lawn Enforcement**. The site is built as a single-page application that mimics a 1990s desktop environment complete with draggable windows, a Winamp-style music player, a VHS/CRT video player, and authentic scanline/tracking effects.

## Author

levensailor

## Features

- Windows 95 desktop metaphor with draggable, minimizable, maximizable windows
- Winamp 2.x-style music player with spectrum visualizer and playlist
- VHS/CRT video player with scanlines, tracking noise, and VCR controls
- Boot sequence animation
- Start menu with Programs submenu
- Guestbook, About page, and Tour Dates in Notepad-style windows
- CRT scanline overlay, VHS tracking, and screen flicker effects
- Pixelated grass wallpaper with band name watermark

## Deployment

### Prerequisites

- Python 3.8+
- pip

### Local Setup

A `Makefile` is included for convenience:

```bash
make install   # create virtualenv and install dependencies
make dev       # start dev server at http://localhost:8000 (hot reload enabled)
```

Override defaults with env vars:

```bash
make dev PORT=9000 LOG_LEVEL=debug
```

All available commands:

| Command | Description |
|---|---|
| `make install` | Create venv and install deps |
| `make dev` | Start dev server with hot reload |
| `make logs` | Tail `logs/app.log` |
| `make logs-clear` | Delete log files |
| `make freeze` | Update `requirements.txt` from current venv |
| `make clean` | Remove venv, logs, and cache |
| `make info` | Print env/config summary |

Run `make help` to see all commands with descriptions.

The site will be available at **http://localhost:8000**.

### Adding Your Own Media

- Drop MP3 files into `static/audio/` and update the playlist array in `static/js/music-player.js`
- Drop MP4 files into `static/video/` and update the `<source>` tag in `static/index.html`

## Public Assets

- **Local URL**: http://localhost:8000
- **Login**: No authentication required
