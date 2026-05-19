# Sentence Reading Game

Browser-based reading assessment for simple sentences. Companion to
[Phrase Reading Game](https://github.com/Grace-Clark/phrases-reading-game)
and [CVC Reading Game](https://github.com/Grace-Clark/cvc-reading-game).

- **2 practice items** first (point to the car / ball).
- **15 questions**, each shown in three steps:
  1. Listen to 6 pictures (tap each or hear all)
  2. See the target sentence alone
  3. Pick the picture that matches

Audio uses recordings in `assets/audio/<phrase>.mp3` or `.m4a` when available,
falling back to the browser's built-in text-to-speech for missing phrases.

## Run locally

Open `index.html` in a browser, or run the included static server:

```
powershell -NoProfile -ExecutionPolicy Bypass -File server.ps1
```
