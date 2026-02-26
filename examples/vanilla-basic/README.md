# Vanilla Basic

Minimal AnimaSync example — no 3D avatar, no Three.js. Drop an audio file and see how voice drives lip sync, facial expression, and blink animation data in real time.

## What it demonstrates

- Loading `@goodganglabs/lipsync-wasm-v2` from CDN (zero `npm install`)
- `processFile()` batch API — returns lip sync + expressions + blinks in one call
- Visualizing 23 key ARKit channels: jaw, mouth, eyes, brows, cheeks

## Run locally

```bash
# Any static file server works
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:8080` (or the port your server shows).

## How it works

1. WASM + ONNX model load from jsdelivr CDN on page load
2. Drop/select an audio file → `processFile()` returns all animation frames (lip sync + expressions + blinks)
3. `requestAnimationFrame` loop plays frames at 30fps, showing how each facial channel responds to the voice

No bundler, no framework, single HTML file.
