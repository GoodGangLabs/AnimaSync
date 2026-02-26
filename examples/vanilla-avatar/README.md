# Vanilla Avatar

Full 3D VRM avatar that lip-syncs to audio using AnimaSync V2. Supports file upload and real-time microphone streaming.

## What it demonstrates

- Three.js + `@pixiv/three-vrm` avatar rendering
- VRMA bone animation (idle pose crossfade)
- Real-time mic streaming via `processAudioChunk()` + AudioWorklet
- Batch file processing via `processFile()`
- 52-dim ARKit blendshape application to VRM expressions

## Run locally

```bash
npx serve .
# or
python3 -m http.server 8080
```

## VRM Avatar

Drop any `.vrm` file onto the canvas. Free CC0 avatars are available at:

- [VRoid Hub](https://hub.vroid.com/en/models?characterization=allow) — filter by "OK to use as-is"
- [Mixamo](https://www.mixamo.com/) — for reference animations

## How it works

1. Page loads → WASM + ONNX model initialized from CDN
2. Drop a `.vrm` file → Three.js scene renders the avatar with idle bone animation
3. Upload audio or click Microphone → blendshapes applied to VRM at 30fps
4. Frame queue pattern: audio processing pushes frames, render loop consumes at 30fps
