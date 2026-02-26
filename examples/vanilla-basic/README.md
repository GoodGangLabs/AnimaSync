# Vanilla Basic (V1)

Full 3D VRM avatar driven by AnimaSync V1 — the 111-dim phoneme-based engine. Lip sync, facial expressions (brows, cheeks, tongue), natural eye blinks, and body motion generated from voice via ONNX phoneme classification + viseme mapping.

## What it demonstrates

- **111-dim blendshape output**: Full ARKit channels including tongue, cheeks, and brows
- **Phoneme-based pipeline**: Voice → MFCC → Phoneme → Viseme → Blendshape
- **Dual mode**: ONNX inference with heuristic fallback if ONNX fails
- **IdleExpressionGenerator**: Natural eye blinks (2.5–4.5s cycle, double-blink 15%)
- **VoiceActivityDetector**: Auto-switches idle ↔ speaking body pose
- **OneEuroFilter**: Time-domain smoothing for natural motion
- Real-time mic streaming + batch file processing + TTS
- Three.js + `@pixiv/three-vrm` integration

## Run locally

```bash
npx serve .
# or
python3 -m http.server 8080
```

## VRM Avatar

Drop any `.vrm` file onto the canvas. Free CC0 avatars are available at:

- [VRoid Hub](https://hub.vroid.com/en/models?characterization=allow) — filter by "OK to use as-is"

## How it works

1. Page loads → WASM + ONNX model initialized from CDN
2. Drop a `.vrm` file → Three.js scene renders the avatar with idle breathing animation
3. Upload audio or click Microphone → V1 engine generates phoneme-based lip sync + expressions + blinks
4. All animation layers (face + body) applied to VRM at 30fps via frame queue
5. Body pose auto-transitions between idle and speaking based on voice activity detection
