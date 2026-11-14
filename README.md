# pi-extension-verda

Pi provider extension for [Verda Inference](https://inference.verda.com), exposing `verda/kimi-k3-1-pro` through Pi's built-in OpenAI-completions streaming (tools, images, reasoning, usage, abort all handled by Pi).

Secure by default: **no tokens in code**. The key is read only from `$VERDA_INFERENCE_API_KEY` at request time.

## Install

```bash
pi install git:github.com/lamtonylam/pi-extension-verda
```

Or try once without installing:

```bash
pi -e git:github.com/lamtonylam/pi-extension-verda
```

Local dev:

```bash
git clone https://github.com/lamtonylam/pi-extension-verda
cd pi-extension-verda
pi -e ./extensions/verda.ts
```

## Auth

```bash
export VERDA_INFERENCE_API_KEY="<your-key-here>"
```

Then in Pi:

```
/model
# pick verda/kimi-k3-1-pro
```

No `auth.json` entry, no key in `models.json`, no key in logs. If the env var is missing the model shows as unavailable and the extension posts a one-line hint on `session_start`.

## Why an extension instead of `models.json`?

`models.json` works fine for one machine, but an extension is shareable: teammates install the package and bring their own key via env. Same endpoint, same model, zero secret sharing.

## Contents

- `extensions/verda.ts` — registers `verda` provider (`openai-completions`, `authHeader: true`, `compat.supportsDeveloperRole=false`, `supportsReasoningEffort=false`)
- `package.json` — `pi-package` with `pi.extensions` manifest, host packages in `peerDependencies`

## Security

- `grep -r VERDA_INFERENCE_API_KEY` only ever matches the `$VAR` reference, never a real key value.
- `.gitignore` blocks `.env`, `auth.json`, `models.json`, and local Pi state.
- Never paste real keys into issues, PRs, or chat logs.

## License

MIT
