<div align="center">

<img src="assets/readme/hero-banner.svg" alt="AnimaSync" width="800">

<br><br>

**Real-time audio-to-blendshape lip sync for the browser.**

Rust/WASM engine that converts speech into ARKit-compatible facial animations at 30fps — entirely client-side.

<br>

[![npm V1](https://img.shields.io/npm/v/@goodganglabs/lipsync-wasm-v1?label=V1%20%E2%80%A2%20Phoneme&color=f59e0b&style=for-the-badge)](https://www.npmjs.com/package/@goodganglabs/lipsync-wasm-v1)
&nbsp;
[![npm V2](https://img.shields.io/npm/v/@goodganglabs/lipsync-wasm-v2?label=V2%20%E2%80%A2%20Student&color=10b981&style=for-the-badge)](https://www.npmjs.com/package/@goodganglabs/lipsync-wasm-v2)

[Live Demo (V1)](https://lipsync-wasm.quasar.ggls.dev/v1/demo/)
&ensp;·&ensp;
[Live Demo (V2)](https://lipsync-wasm.quasar.ggls.dev/v2/demo/)
&ensp;·&ensp;
[Side-by-side](https://lipsync-wasm.quasar.ggls.dev/demo/)
&ensp;·&ensp;
[npm V1](https://www.npmjs.com/package/@goodganglabs/lipsync-wasm-v1)
&ensp;·&ensp;
[npm V2](https://www.npmjs.com/package/@goodganglabs/lipsync-wasm-v2)

</div>

<br>

---

## Features

<table>
<tr>
<td width="50%">

**Browser-native WASM**<br>
<sub>No server needed. Entire pipeline runs in the browser with near-native performance via Rust → WebAssembly compilation.</sub>

**ARKit-compatible Output**<br>
<sub>Standard 52-dim or 111-dim blendshape weight arrays. Works with any 3D framework — Three.js, Babylon.js, Unity WebGL.</sub>

**Built-in Bone Animation**<br>
<sub>Embedded VRMA idle/speaking pose clips with automatic crossfade. Natural body movement out of the box.</sub>

</td>
<td width="50%">

**Real-time Streaming**<br>
<sub>AudioWorklet-based microphone capture with ~300ms latency. Stream TTS audio or process recorded files.</sub>

**30-day Free Trial**<br>
<sub>No signup, no API key. Call `init()` and start building. Internet required for license validation only.</sub>

**Three.js + VRM Ready**<br>
<sub>First-class integration with @pixiv/three-vrm. Drop a VRM avatar and it just works.</sub>

</td>
</tr>
</table>

---

## Quick Start

### Install

```bash
# V2 recommended for most use cases
npm install @goodganglabs/lipsync-wasm-v2

# V1 for full 111-dim expression control
npm install @goodganglabs/lipsync-wasm-v1
```

> Peer dependency: [`onnxruntime-web`](https://www.npmjs.com/package/onnxruntime-web) >= 1.17.0

### Minimal Example

```javascript
import { LipSyncWasmWrapper } from '@goodganglabs/lipsync-wasm-v2';

const lipsync = new LipSyncWasmWrapper();
await lipsync.init(); // 30-day free trial — no key needed

const result = await lipsync.processFile(audioFile);
for (let i = 0; i < result.frame_count; i++) {
  const frame = lipsync.getFrame(result, i); // number[52] — ARKit blendshapes
  applyToYourAvatar(frame);
}
```

### CDN (No Bundler)

```html
<script src="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.17.0/dist/ort.min.js"></script>
<script type="module">
  const CDN = 'https://cdn.jsdelivr.net/npm/@goodganglabs/lipsync-wasm-v2@latest';
  const { LipSyncWasmWrapper } = await import(`${CDN}/lipsync-wasm-wrapper.js`);

  const lipsync = new LipSyncWasmWrapper({ wasmPath: `${CDN}/lipsync_wasm_v2.js` });
  await lipsync.init();
  // Ready to process audio
</script>
```

---

## Examples

Working examples you can run locally — zero npm install, all loaded from CDN.

| Example | Description | Source |
|---------|-------------|--------|
| **[Basic](examples/vanilla-basic/)** | Audio file → blendshape bar chart. No 3D, pure API demo. | [index.html](examples/vanilla-basic/index.html) |
| **[VRM Avatar](examples/vanilla-avatar/)** | Full 3D avatar with mic, file upload, bone animation. | [index.html](examples/vanilla-avatar/index.html) |
| **[V1 vs V2](examples/vanilla-comparison/)** | Side-by-side dual avatar comparison. Same audio, two engines. | [index.html](examples/vanilla-comparison/index.html) |

**Run any example:**

```bash
cd examples/vanilla-basic   # or vanilla-avatar, vanilla-comparison
npx serve .                  # or: python3 -m http.server 8080
```

---

## V1 vs V2

| | V2 (Recommended) | V1 (Full Control) |
|---|---|---|
| **npm** | `@goodganglabs/lipsync-wasm-v2` | `@goodganglabs/lipsync-wasm-v1` |
| **Output** | 52-dim ARKit blendshapes | 111-dim ARKit blendshapes |
| **Model** | Student distillation (direct prediction) | Phoneme classification → viseme mapping |
| **Post-processing** | crisp_mouth + fade + auto-blink | OneEuroFilter + anatomical constraints |
| **Idle expressions** | Not included | Built-in `IdleExpressionGenerator` |
| **Voice activity** | Not included | Built-in `VoiceActivityDetector` |
| **ONNX fallback** | None (ONNX required) | Heuristic mode (energy-based) |
| **Best for** | Most projects, quick integration | Full expression control, custom avatars |

---

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│  Browser                                                    │
│                                                             │
│  Audio Source (File / Mic / TTS)                            │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────┐    ┌────────────┐    ┌─────────────────────┐ │
│  │   WASM   │    │    ONNX    │    │        WASM         │ │
│  │ Feature  │───▶│ Inference  │───▶│  Post-processing    │ │
│  │ Extract  │    │   (JS)     │    │  + Blendshape map   │ │
│  └──────────┘    └────────────┘    └─────────┬───────────┘ │
│                                               │             │
│                                               ▼             │
│                                    52 / 111-dim ARKit       │
│                                    Blendshapes @30fps       │
│                                               │             │
│                                               ▼             │
│                                     3D Avatar (Three.js,    │
│                                     Babylon, Unity WebGL)   │
└────────────────────────────────────────────────────────────┘
```

### V2 Pipeline

```
Audio 16kHz PCM
  → [WASM] librosa-compatible features: 141-dim @30fps
  → [JS]   ONNX student model: 52-dim direct output
  → [WASM] crisp_mouth → fade_in_out → add_blinks
  → [Optional] Preset blending
```

### V1 Pipeline

```
Audio 16kHz PCM
  → [WASM] MFCC extraction: 13-dim @100fps
  → [JS]   ONNX inference: 61 phoneme probabilities
  → [WASM] Phoneme → 22 visemes → 111-dim ARKit blendshapes
  → [WASM] FPS conversion: 100fps → 30fps
  → [WASM] Anatomical constraints + OneEuroFilter
  → [Optional] Preset blending (face 40% + mouth 60%)
```

---

## API Reference

Both V1 and V2 expose the same `LipSyncWasmWrapper` class:

```typescript
class LipSyncWasmWrapper {
  constructor(options?: { wasmPath?: string });

  readonly ready: boolean;
  readonly modelVersion: 'v1' | 'v2';
  readonly blendshapeDim: 111 | 52;

  // Initialize — validates license + loads ONNX model
  init(options?: {
    licenseKey?: string;
    onProgress?: (stage: string, percent: number) => void;
    preset?: boolean | string;
  }): Promise<{ mode: string }>;

  // Batch processing
  processFile(file: File): Promise<ProcessResult>;
  processAudio(pcm16k: Float32Array): Promise<ProcessResult>;
  processAudioBuffer(buf: AudioBuffer): Promise<ProcessResult>;

  // Real-time streaming
  processAudioChunk(chunk: Float32Array, isLast?: boolean): Promise<ProcessResult | null>;

  // Extract single frame
  getFrame(result: ProcessResult, index: number): number[];

  // Bone animations
  getVrmaBytes(): { idle: Uint8Array; speaking: Uint8Array };

  // Cleanup
  reset(): void;
  dispose(): void;
}

interface ProcessResult {
  blendshapes: number[];  // flat array: frame_count × dim
  frame_count: number;
  fps: number;            // always 30
  mode: string;
}
```

### Method Quick Reference

| Method | Use Case |
|--------|----------|
| `processFile(file)` | File upload UI |
| `processAudio(float32)` | Pre-loaded audio (fetched from API) |
| `processAudioChunk(chunk)` | Real-time mic / TTS streaming |
| `getVrmaBytes()` | Bone animations for idle & speaking poses |
| `reset()` | Clear streaming state between utterances |

### Loading Progress Stages

```javascript
await lipsync.init({
  onProgress: (stage, percent) => {
    // stage: 'wasm' → 'license' → 'decrypt' → 'onnx'
    updateProgressBar(stage, percent);
  }
});
```

### Real-time Streaming Pattern

```javascript
// 1. Capture mic audio at 16kHz via AudioWorklet
const ctx = new AudioContext({ sampleRate: 16000 });
// ... setup AudioWorklet (see examples/vanilla-avatar)

// 2. Feed chunks → get blendshape frames back
worklet.port.onmessage = async (e) => {
  const result = await lipsync.processAudioChunk(e.data);
  if (result) {
    for (let i = 0; i < result.frame_count; i++) {
      frameQueue.push(lipsync.getFrame(result, i));
    }
  }
};

// 3. Consume at 30fps in render loop
function render() {
  requestAnimationFrame(render);
  if (frameQueue.length > 0) {
    applyToAvatar(frameQueue.shift());
  }
}
```

---

## Licensing

### 30-Day Free Trial

Call `init()` without a license key. All features available, no signup needed.

```javascript
await lipsync.init();                                    // free trial
await lipsync.init({ licenseKey: 'ggl_your_key' });     // paid license
```

| | Free Trial | Paid License |
|---|---|---|
| **Duration** | 30 days from first use | Unlimited |
| **Setup** | None (automatic) | Pass `licenseKey` to `init()` |
| **Domain** | Any | Configurable per key |
| **Features** | Full access | Full access |

Contact [GoodGang Labs](https://goodganglabs.com) for license inquiries.

---

## Security

- ONNX models are **AES-256-GCM encrypted** and embedded into the WASM binary
- No separate model files are served — decryption happens at runtime
- License tokens are **Ed25519 signed** with 24-hour TTL
- Tokens cached in `sessionStorage` to minimize server requests

---

<div align="center">

Built by [GoodGang Labs](https://goodganglabs.com)

</div>
