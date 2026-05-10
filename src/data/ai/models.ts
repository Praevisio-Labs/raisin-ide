import type { Model } from '@/types/index'

export const DEMO_MODELS: Model[] = [
    {
        name: 'GPT 5.5',
        modelId: 'gpt-5.5-2026-04-23',
        description: {
            short: 'Coding and pro work',
            medium: 'Best for coding and professional work',
            long: 'Supports a 1,050,000 token context window, 128K max output tokens, text and image input, and reasoning effort levels from none through xhigh. Pricing is $5.00 per 1M input tokens, $0.50 per 1M cached input tokens, and $30.00 per 1M output tokens; prompts over 272K input tokens are charged at higher long-context rates.',
        },
    },
    {
        name: 'GPT 5.4 Mini',
        modelId: 'gpt-5.4-mini-2026-03-17',
        description: {
            short: 'Coding, tools, subagents',
            medium: 'Best for coding, computer use, and subagents',
            long: 'Supports a 400K token context window, 128K max output tokens, text and image input, and hosted tools including web search, file search, code interpreter, hosted shell, computer use, and MCP. Pricing is $0.75 per 1M input tokens, $0.075 per 1M cached input tokens, and $4.50 per 1M output tokens.',
        },
    },
    {
        name: 'GPT 5.4 Nano',
        modelId: 'gpt-5.4-nano-2026-03-17',
        description: {
            short: 'Cheapest high-volume',
            medium: 'Cheapest for simple high-volume tasks',
            long: 'Supports a 400K token context window, 128K max output tokens, text and image input, and reasoning tokens. Pricing is $0.20 per 1M input tokens, $0.02 per 1M cached input tokens, and $1.25 per 1M output tokens; regional processing endpoints add a 10% uplift.',
        },
    },
]

export const PROD_MODELS: Model[] = [
    {
        name: 'Opus 4.7',
        modelId: 'us.anthropic.claude-opus-4-7-v1:0',
        description: {
            short: 'Most capable for complex work',
            medium: 'Most capable for complex work',
            long: 'Bedrock lists a 1M token context window, 128K max output tokens, reasoning support, and a January 2026 knowledge cutoff. The model supports text and image input with text output, exposes Messages, Converse, and Invoke APIs, and has default quotas of 10M TPM on bedrock-mantle and 15M TPM on bedrock-runtime per supported region.',
        },
    },
    {
        name: 'Sonnet 4.6',
        modelId: 'us.anthropic.claude-sonnet-4-6-v1:0',
        description: {
            short: 'Best for everyday tasks',
            medium: 'Best for everyday tasks',
            long: 'Bedrock lists a 1M token context window, 64K max output tokens, reasoning support, and an August 2025 knowledge cutoff. It supports prompt caching with 1,024 minimum tokens, up to 4 cache checkpoints, 5-minute or 1-hour TTLs, and cache checkpoints in system, messages, and tools.',
        },
    },
    {
        name: 'Haiku 4.5',
        modelId: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',
        description: {
            short: 'Fastest for quick answers',
            medium: 'Fastest for quick answers',
            long: 'Bedrock lists a 200K token context window, 64K max output tokens, reasoning support, and a February 2025 knowledge cutoff. It supports text and image input with text output through Invoke and Converse, with response streaming, guardrails, structured outputs, client-side tool calling, and Bedrock Agents available.',
        },
    },
    {
        name: 'Gemma 3 27B',
        modelId: 'google.gemma-3-27b-it-v1:0',
        description: {
            short: 'Largest Gemma 3',
            medium: 'Largest Gemma 3 model for text and image tasks',
            long: 'Bedrock lists a 128K token context window and 8K max output tokens for this 27B parameter model, with text and image input and text output. AWS pricing starts at $0.23 per 1M input tokens and $0.38 per 1M output tokens in US regions, while Google reports 14T training tokens and an August 2024 knowledge cutoff for Gemma 3.',
        },
    },
    {
        name: 'Gemma 3 12B',
        modelId: 'google.gemma-3-12b-it-v1:0',
        description: {
            short: 'Balanced Gemma 3',
            medium: 'Balanced Gemma 3 model for text and image tasks',
            long: 'Bedrock lists a 128K token context window and 8K max output tokens for this 12B parameter instruction-tuned model, with text and image input and text output. AWS pricing starts at $0.09 per 1M input tokens and $0.29 per 1M output tokens in US regions, while Google reports 12T training tokens and an August 2024 knowledge cutoff for Gemma 3.',
        },
    },
    {
        name: 'Gemma 3 4B',
        modelId: 'google.gemma-3-4b-it-v1:0',
        description: {
            short: 'Lightweight Gemma 3',
            medium: 'Lightweight Gemma 3 model for text and image tasks',
            long: 'Bedrock lists a 128K token context window and 8K max output tokens for this 4B parameter instruction-tuned model, with text and image input and text output. AWS pricing starts at $0.04 per 1M input tokens and $0.08 per 1M output tokens in US regions, while Google reports 4T training tokens and an August 2024 knowledge cutoff for Gemma 3.',
        },
    },
    {
        name: 'Nova Premier',
        modelId: 'us.amazon.nova-premier-v1:0',
        description: {
            short: 'Most capable',
            medium: 'Most capable for complex tasks',
            long: 'Bedrock lists a 1M token context window, 25K max output tokens, reasoning support, and an October 2024 knowledge cutoff. It accepts text, image, and video input, outputs text, supports prompt caching for up to 20K tokens, and is marked Legacy with an EOL date of September 14, 2026.',
        },
    },
    {
        name: 'Nova Pro',
        modelId: 'us.amazon.nova-pro-v1:0',
        description: {
            short: 'Best balance',
            medium: 'Best balance of accuracy, speed, and cost',
            long: 'Bedrock lists a 300K token context window, 5K max output tokens, and an October 2024 knowledge cutoff. It accepts text, image, and video input, outputs text, supports prompt caching for up to 20K tokens, and has Intelligent Prompt Routing enabled but Structured Outputs unsupported.',
        },
    },
    {
        name: 'Nova Lite',
        modelId: 'us.amazon.nova-lite-v1:0',
        description: {
            short: 'Fast, low-cost',
            medium: 'Fast low-cost multimodal model',
            long: 'Bedrock lists a 300K token context window, 5K max output tokens, and an October 2024 knowledge cutoff. It accepts text, image, and video input, outputs text, supports prompt caching for up to 20K tokens, and is available in Standard tier but not Priority, Flex, or Reserved.',
        },
    },
]

export const ALL_MODELS = {
    bedrock: {
        opus: 'us.anthropic.claude-opus-4-7-v1:0',
        sonnet: 'us.anthropic.claude-sonnet-4-6-v1:0',
        haiku: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',

        gemma4_27b: 'google.gemma-4-31b-it-v1:0',
        gemma4_12b: 'google.gemma-4-12b-it-v1:0',
        gemma3_27b: 'google.gemma-3-27b-it-v1:0',
        gemma3_12b: 'google.gemma-3-12b-it-v1:0',
        gemma3_4b: 'google.gemma-3-4b-it-v1:0',

        novaPremier: 'us.amazon.nova-premier-v1:0',
        novaPro: 'us.amazon.nova-pro-v1:0',
        novaLite: 'us.amazon.nova-lite-v1:0',
        novaMicro: 'us.amazon.nova-micro-v1:0',
    },
    openai: {
        fast: 'gpt-5-nano-2025-08-07',
        nano: 'gpt-5.4-nano-2026-03-17',
        mini: 'gpt-5.4-mini-2026-03-17',
        frontier: 'gpt-5.5-2026-04-23',
        pro: 'gpt-5.5-pro-2026-04-23',
    },
}
