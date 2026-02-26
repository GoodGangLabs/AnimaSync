# Vanilla Comparison

V1 and V2 animation engines running side-by-side on the same voice input. Two VRM avatars, two engines, one shared microphone — compare how each generates lip sync, expressions, and body motion differently.

## What it demonstrates

- Loading **both** `@goodganglabs/lipsync-wasm-v1` and `v2` from CDN simultaneously
- Parallel initialization and inference
- Comparing animation quality: V1's phoneme-based expressions vs V2's direct prediction
- Dual Three.js canvases with independent body pose animation
- Performance comparison (WASM time, frame count, realtime factor)

## Run locally

```bash
npx serve .
# or
python3 -m http.server 8080
```

## How it works

1. Both V1 and V2 engines initialize from CDN in parallel
2. Drop a `.vrm` file on either canvas — it loads into **both** scenes
3. Select audio or click Mic — the same PCM data feeds both engines via `Promise.all`
4. Each engine outputs frames independently into separate queues
5. Render loop consumes both queues at 30fps, applying to respective VRM avatars

## V1 vs V2 differences you'll notice

| | V1 | V2 |
|---|---|---|
| Output | 111-dim (more channels) | 52-dim (standard ARKit) |
| Mouth crispness | Smoother (OneEuroFilter) | Snappier (crisp_mouth) |
| Eye blinks | IdleExpressionGenerator (2.5–4.5s cycle) | Injected by post-processing |
| Expression depth | Full 111-dim (brows, cheeks, tongue, etc.) | Standard 52-dim ARKit |
| Body motion | VAD auto-switches idle ↔ speaking pose | Same VRMA crossfade |
| Processing speed | Slightly slower (phoneme → viseme) | Faster (direct output) |
