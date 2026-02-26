# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in AnimaSync or the `@goodganglabs/lipsync-wasm-*` packages, please report it responsibly.

**Email**: security@goodganglabs.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Scope

This policy covers:
- The AnimaSync demo site (goodganglabs.github.io/AnimaSync)
- npm packages `@goodganglabs/lipsync-wasm-v1` and `@goodganglabs/lipsync-wasm-v2`
- The WASM binary and JavaScript wrapper code

## Security Measures

- **Model Protection**: ONNX models are AES-256-GCM encrypted and compiled into the WASM binary. No separate model files are served.
- **License Tokens**: Ed25519 signed with 24-hour TTL, cached in `sessionStorage`.
- **CDN Integrity**: External scripts use Subresource Integrity (SRI) hashes.
- **No Server-side Code**: All demo pages are static HTML running entirely client-side.

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.3.x   | Yes       |
| < 0.3   | No        |
