/**
 * Verda provider for Pi.
 *
 * Secure by design:
 * - No tokens in code, logs, or git history.
 * - Auth resolves only from `$VERDA_INFERENCE_API_KEY` at request time.
 * - If the env var is missing, the model simply shows as unavailable in `/model`.
 *
 * Verda exposes an OpenAI-compatible endpoint, so we delegate streaming,
 * tool-calling, usage accounting, and cancellation to Pi's built-in
 * `openai-completions` implementation.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerProvider("verda", {
    name: "Verda",
    baseUrl: "https://inference.verda.com/v1",
    api: "openai-completions",
    apiKey: "$VERDA_INFERENCE_API_KEY",
    authHeader: true,
    models: [
      {
        id: "kimi-k3-1-pro",
        name: "kimi-k3-1-pro",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 16384,
        compat: {
          supportsDeveloperRole: false,
          supportsReasoningEffort: false,
        },
      },
    ],
  });

  // Gentle, token-safe hint. Never prints the key value.
  pi.on("session_start", async (_event, ctx) => {
    if (!process.env.VERDA_INFERENCE_API_KEY) {
      ctx.ui.notify(
        "Verda: set VERDA_INFERENCE_API_KEY to enable verda/kimi-k3-1-pro (/model)",
        "info",
      );
    }
  });
}
