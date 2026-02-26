# Vanilla Basic

Minimal AnimaSync example — no 3D avatar, no Three.js. Drop an audio file and watch blendshape values animate in real time.

## What it demonstrates

- Loading `@goodganglabs/lipsync-wasm-v2` from CDN (zero `npm install`)
- `processFile()` batch API
- Extracting frames with `getFrame()` and visualizing 23 key ARKit channels

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
2. Drop/select an audio file → `processFile()` returns all frames at once
3. `requestAnimationFrame` loop plays frames at 30fps, updating bar widths

No bundler, no framework, single HTML file.
