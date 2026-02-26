# Vanilla Avatar

Full 3D VRM avatar that comes alive from voice alone. Lip sync, emotional facial expressions, natural eye blinks, and body motion — all generated from a single audio stream via AnimaSync V2.

## What it demonstrates

- **Lip sync**: Mouth shapes driven by voice phonemes
- **Facial expressions**: Brows, cheeks, and eye area respond to vocal characteristics
- **Eye animation**: Natural stochastic blinks injected automatically
- **Body motion**: VRMA bone animation (idle breathing ↔ speaking pose crossfade)
- Real-time mic streaming + batch file processing
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
- [Mixamo](https://www.mixamo.com/) — for reference animations

## How it works

1. Page loads → WASM + ONNX model initialized from CDN
2. Drop a `.vrm` file → Three.js scene renders the avatar with idle breathing animation
3. Upload audio or click Microphone → engine generates lip sync + expressions + blinks
4. All animation layers (face + body) applied to VRM at 30fps via frame queue
