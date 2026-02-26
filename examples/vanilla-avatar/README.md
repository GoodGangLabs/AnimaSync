# Vanilla Avatar (V2)

Full 3D VRM avatar driven by AnimaSync V2 — the 52-dim student model engine. Lip sync, facial expressions, natural eye blinks, and body motion — all generated from a single audio stream via direct blendshape prediction.

## What it demonstrates

- **52-dim ARKit output**: Standard blendshape channels via student model direct prediction
- **Lip sync**: Crisp mouth shapes with threshold-based sharpening
- **Facial expressions**: Brows and eye area respond to vocal characteristics
- **Eye animation**: Natural stochastic blinks injected by post-processing
- **Body motion**: VRMA bone animation (idle breathing ↔ speaking pose crossfade)
- **Post-processing**: crisp_mouth + fade_in_out + add_blinks pipeline
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
3. Upload audio or click Microphone → V2 engine generates direct lip sync + expressions + blinks
4. All animation layers (face + body) applied to VRM at 30fps via frame queue
