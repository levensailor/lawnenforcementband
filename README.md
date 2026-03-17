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

```bash
cd lawnenforcement
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

The site will be available at **http://localhost:8000**.

### Adding Your Own Media

- Drop MP3 files into `static/audio/` and update the playlist array in `static/js/music-player.js`
- Drop MP4 files into `static/video/` and update the `<source>` tag in `static/index.html`

## Public Assets

- **Local URL**: http://localhost:8000
- **Login**: No authentication required
