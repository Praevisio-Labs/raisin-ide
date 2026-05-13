import type { Skill } from '@/types/index'

export const openAi: Skill = {
    id: 'open-ai',
    name: 'OpenAI API',
    content: `## OpenAI API Refresher

The OpenAI API gives you programmatic access to models like \`gpt-4o\` and \`gpt-4o-mini\`. You send a request describing what you want, and the model returns a completion. The two main interfaces are the **Chat Completions API** (the long-standing standard) and the newer **Responses API** (introduced in 2025, designed for agentic workflows).

---

### Setup

Install the official Node.js SDK:

\`\`\`bash
npm install openai
\`\`\`

Initialize the client. The SDK automatically reads \`OPENAI_API_KEY\` from the environment:

\`\`\`ts
import OpenAI from 'openai'

const openai = new OpenAI()
// or explicitly: new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
\`\`\`

Never hardcode your API key or expose it to the browser. Keep it in \`.env.local\` and call the API from a server-side route.

---

### Chat Completions

The Chat Completions API is the foundation. You send an array of **messages**, each with a \`role\` and \`content\`, and get a response back.

\`\`\`ts
const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the capital of France?' },
    ],
})

console.log(completion.choices[0].message.content)
// → "The capital of France is Paris."
\`\`\`

**Roles:**
- \`system\` — sets the model's behavior and persona. Processed before user messages.
- \`user\` — the human's input.
- \`assistant\` — the model's previous replies (used to maintain conversation history).

**Multi-turn conversation** — the API is stateless, so you must send the full history on every request:

\`\`\`ts
const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'My name is Ada.' },
    { role: 'assistant', content: 'Nice to meet you, Ada!' },
    { role: 'user', content: 'What is my name?' },
]

const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
})
\`\`\`

---

### Key parameters

\`\`\`ts
await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [...],

    temperature: 0.7,      // 0 = deterministic, 2 = very random. Default: 1
    max_tokens: 500,       // cap the response length
    top_p: 1,              // nucleus sampling — alternative to temperature
    n: 1,                  // number of completions to generate
})
\`\`\`

For factual or structured tasks, lower \`temperature\` (0–0.3). For creative tasks, higher (0.7–1.2). Don't adjust both \`temperature\` and \`top_p\` at the same time.

---

### Streaming

For a better UX, stream the response token by token instead of waiting for the full completion:

\`\`\`ts
const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Tell me a short story.' }],
    stream: true,
})

for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content ?? ''
    process.stdout.write(delta)
}
\`\`\`

In a Next.js Route Handler, use \`ReadableStream\` or the Vercel AI SDK to pipe the stream to the client.

---

### Structured Outputs

When you need the model to return JSON that matches a specific shape, use Structured Outputs with \`response_format\`:

\`\`\`ts
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

const RecipeSchema = z.object({
    name: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
})

const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Give me a pasta recipe.' }],
    response_format: zodResponseFormat(RecipeSchema, 'recipe'),
})

const recipe = completion.choices[0].message.parsed
// recipe is fully typed as { name: string, ingredients: string[], steps: string[] }
\`\`\`

The model is guaranteed to return valid JSON matching the schema — no manual parsing or validation needed.

---

### Function calling (tool use)

Tools let the model request that your code run a function, then incorporate the result into its response. This is how you connect the model to live data or actions.

\`\`\`ts
const tools = [
    {
        type: 'function' as const,
        function: {
            name: 'get_weather',
            description: 'Get the current weather for a city.',
            parameters: {
                type: 'object',
                properties: {
                    city: { type: 'string', description: 'City name' },
                },
                required: ['city'],
            },
        },
    },
]

const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'What is the weather in Tokyo?' }],
    tools,
})

const toolCall = response.choices[0].message.tool_calls?.[0]
if (toolCall) {
    const args = JSON.parse(toolCall.function.arguments)
    const result = await getWeather(args.city)  // your function

    // Send the result back to the model
    const final = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'user', content: 'What is the weather in Tokyo?' },
            response.choices[0].message,
            {
                role: 'tool',
                tool_call_id: toolCall.id,
                content: JSON.stringify(result),
            },
        ],
        tools,
    })
}
\`\`\`

---

### The Responses API (2025+)

The Responses API is OpenAI's newer interface, designed for agentic workflows. It manages conversation state on the server, so you don't have to send the full message history on every request.

\`\`\`ts
// First turn
const response = await openai.responses.create({
    model: 'gpt-4o',
    input: 'My name is Ada.',
})

console.log(response.output_text)
// → "Nice to meet you, Ada!"

// Continue the conversation using the previous response ID
const followUp = await openai.responses.create({
    model: 'gpt-4o',
    previous_response_id: response.id,
    input: 'What is my name?',
})

console.log(followUp.output_text)
// → "Your name is Ada."
\`\`\`

Use Chat Completions when you need full control over message history or are building on an existing codebase. Use the Responses API for new agentic projects where server-managed state simplifies your architecture.

---

### Embeddings

Embeddings convert text into a vector of numbers that captures semantic meaning. Similar texts produce similar vectors — useful for search, clustering, and retrieval-augmented generation (RAG).

\`\`\`ts
const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: 'The quick brown fox',
})

const vector = embedding.data[0].embedding  // float[]
\`\`\`

To find similar texts, compute the **cosine similarity** between their vectors. Store vectors in a vector database (Supabase pgvector, Pinecone, etc.) for efficient similarity search at scale.

---

### Choosing a model

| Model | Best for |
|-------|---------|
| \`gpt-4o\` | Complex reasoning, structured outputs, tool use |
| \`gpt-4o-mini\` | Fast, cheap, good for most tasks |
| \`o3\` / \`o4-mini\` | Deep reasoning, math, code — slower and pricier |
| \`text-embedding-3-small\` | Embeddings — fast and cost-effective |
| \`text-embedding-3-large\` | Embeddings — higher accuracy |

Start with \`gpt-4o-mini\` for development. Switch to \`gpt-4o\` when you need better reasoning or structured output reliability.

---

### Error handling

\`\`\`ts
import OpenAI from 'openai'

try {
    const completion = await openai.chat.completions.create({ ... })
} catch (error) {
    if (error instanceof OpenAI.APIError) {
        console.error(error.status)   // 429, 500, etc.
        console.error(error.message)
        console.error(error.code)     // 'rate_limit_exceeded', etc.
    }
}
\`\`\`

Common errors:
- \`401\` — invalid API key
- \`429\` — rate limit or quota exceeded; implement exponential backoff
- \`500\` / \`503\` — OpenAI server error; retry with backoff

---

### Common gotchas

- **Never call the API from the browser.** Your API key would be exposed in the network tab. Always proxy through a server-side route.
- **Token limits apply to the full context** — system prompt + all messages + response. If you hit the limit, you need to truncate or summarize older messages.
- **Temperature 0 is not truly deterministic.** The model can still produce slightly different outputs on repeated calls.
- **Structured Outputs require \`gpt-4o\` or newer.** Older models don't support the \`response_format\` schema guarantee.
- **Tool call arguments are a JSON string**, not an object — always \`JSON.parse(toolCall.function.arguments)\` before using them.`,
}
