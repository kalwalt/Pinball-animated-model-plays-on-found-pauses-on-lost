Pinball · animated model, plays on found, pauses on lost
========================================================

Exported from WebARKit Studio on 2026-11-07 (graph format v5).
Renderer: Three.js Renderer

Run it
------
Serve this folder with any static web server and open index.html, e.g.:

    npx serve .
    python3 -m http.server 8080

Requirements:
- Camera access needs a secure context: http://localhost works; on a phone use HTTPS
  (or "adb reverse tcp:8080 tcp:8080" on Android).
- The server must answer 404 for missing files. Trackers probe for optional files and
  treat any HTTP 200 (e.g. an SPA fallback page) as that file.

Contents
--------
index.html   player page (reads graph.json)
graph.json   the node graph; import it in WebARKit Studio to edit it
assets/      player, 3D engine and tracker code
data/        the data files the graph's nodes read
.nojekyll    keeps paths starting with "_" if you publish this folder on GitHub Pages from a branch
