import type { Skill } from '@/types/index'

export const aiSdk: Skill = {
    id: 'ai-sdk',
    name: 'Vercel AI SDK',
    content: `## Vercel AI SDK Refresher

The Vercel AI SDK is an open-source TypeScript toolkit for building AI-powered applications. It gives you a unified API across providers (OpenAI, Anthropic, Google, etc.), streaming primitives, React hooks for chat UIs, tool calling, and structured output — all with first-class Next.js support.

The current version is **AI SDK 6**, which shifted from REST API routes to React Server Actions as the primary pattern.

---

### Installation

Install the core package and the provider(s) you need:

\`\`\`bash
npm install ai @ai-sdk/openai
# Other providers:
# npm install @ai-sdk/anthropic
# npm install @ai-sdk/google
\`\`\`

Configure your API key in \`.env.local\`:

\`\`\`
OPENAI_API_KEY=sk-...
\`\`\`

---

### Package structure

The SDK is split into three layers:

| Package | What it does |
|---------|-------------|
| \`ai\` | Core functions: \`generateText\`, \`streamText\`, hooks |
| \`@ai-sdk/openai\` | OpenAI provider (GPT-4o, embeddings, etc.) |
| \`@ai-sdk/anthropic\` | Anthropic provider (Claude) |
| \`@ai-sdk/google\` | Google provider (Gemini) |

Swapping providers is a one-line change — the rest of your code stays the same.

---

### Generating text (server-side)

\`generateText\` is for non-streaming, one-shot completions. Use it in Server Components, Server Actions, or Route Handlers.

\`\`\`ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'Explain closures in JavaScript in two sentences.',
})

console.log(text)
\`\`\`

For multi-turn conversations, use \`messages\` instead of \`prompt\`:

\`\`\`ts
const { text } = await generateText({
    model: openai('gpt-4o'),
    system: 'You are a helpful coding assistant.',
    messages: [
        { role: 'user', content: 'What is a closure?' },
        { role: 'assistant', content: 'A closure is...' },
        { role: 'user', content: 'Can you give me an example?' },
    ],
})
\`\`\`

---

### Streaming text (server-side)

\`streamText\` returns a stream you can pipe to the client. This is the foundation of chat UIs.

\`\`\`ts
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

const result = streamText({
    model: openai('gpt-4o'),
    prompt: 'Write a haiku about TypeScript.',
})

// In a Route Handler:
return result.toDataStreamResponse()

// Consume the stream directly (e.g. in a script):
for await (const chunk of result.textStream) {
    process.stdout.write(chunk)
}
\`\`\`

---

### Building a chat UI with \`useChat\`

In AI SDK 6, \`useChat\` is transport-based. The current idiom is:

- configure the endpoint with \`DefaultChatTransport\`
- keep static request settings at the transport level
- pass dynamic request data, like file context and cursor position, when you call \`sendMessage\`

**Client component:**

\`\`\`tsx
'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

export default function ChatUI({ file, cursorLine }: {
    file: { name: string; content: string }
    cursorLine: number
}) {
    const [input, setInput] = useState('')

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({ api: '/api/chat' }),
    })

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()

                if (!input.trim()) return

                sendMessage(
                    { text: input },
                    {
                        body: {
                            fileName: file.name,
                            fileContent: file.content,
                            cursorLine,
                        },
                    },
                )

                setInput('')
            }}
        >
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.role}:</strong> {message.parts
                            .filter((part) => part.type === 'text')
                            .map((part) => part.text)
                            .join('')}
                    </li>
                ))}
            </ul>

            <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask something..."
                disabled={status !== 'ready'}
            />
            <button type="submit" disabled={status !== 'ready'}>
                Send
            </button>
        </form>
    )
}
\`\`\`

**Route handler:**

\`\`\`ts
// app/api/chat/route.ts
import { getStreamingResponse } from '@/app/lib/ai'

export async function POST(request: Request) {
    const body = await request.json()

    const streamResponse = await getStreamingResponse({
        messages: body.messages,
        system: body.system,
    })

    return streamResponse.toUIMessageStreamResponse()
}
\`\`\`

\`useChat\` still manages the message array and streaming updates, but the request payload should come from \`sendMessage\` when the values are dynamic.

---

### Structured output

Use \`generateText\` with the \`output\` option and a Zod schema to get typed, validated JSON back from the model. (\`generateObject\` is deprecated as of v6 — use this pattern instead.)

\`\`\`ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

const { object } = await generateText({
    model: openai('gpt-4o'),
    output: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    }),
    prompt: 'Classify this article: "An intro to React hooks"',
})

console.log(object.title)      // typed as string
console.log(object.difficulty) // typed as 'beginner' | 'intermediate' | 'advanced'
\`\`\`

---

### Tool calling

Tools let the model call your functions to fetch data or take actions. Define them with \`tool()\` from the \`ai\` package:

\`\`\`ts
import { generateText, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: 'What is the weather in Tokyo?',
    tools: {
        getWeather: tool({
            description: 'Get the current weather for a city.',
            parameters: z.object({
                city: z.string().describe('The city name'),
            }),
            execute: async ({ city }) => {
                // call your weather API here
                return { city, temperature: 22, condition: 'Sunny' }
            },
        }),
    },
    maxSteps: 3,  // allow the model to call tools and continue reasoning
})
\`\`\`

\`maxSteps\` controls how many tool call + response cycles the model can make before returning. Without it, the model stops after the first tool call.

---

### Switching providers

Because all providers implement the same interface, swapping is a one-line change:

\`\`\`ts
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'

// Pick one:
const model = openai('gpt-4o')
const model = anthropic('claude-3-5-sonnet-20241022')
const model = google('gemini-2.0-flash')

// The rest of your code is identical
const { text } = await generateText({ model, prompt: '...' })
\`\`\`

---

### Embeddings

\`\`\`ts
import { embed, embedMany } from 'ai'
import { openai } from '@ai-sdk/openai'

// Single embedding
const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: 'The quick brown fox',
})

// Batch embeddings
const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-3-small'),
    values: ['First document', 'Second document', 'Third document'],
})
\`\`\`

---

### Error handling

\`\`\`ts
import { generateText, APICallError } from 'ai'

try {
    const { text } = await generateText({ model, prompt })
} catch (error) {
    if (APICallError.isInstance(error)) {
        console.error(error.statusCode)  // 429, 500, etc.
        console.error(error.message)
    }
}
\`\`\`

---

### Common gotchas

- **\`generateObject\` is deprecated in v6.** Use \`generateText\` with the \`output\` option and a Zod schema instead.
- **\`StreamingTextResponse\` is removed in v6.** Use \`result.toDataStreamResponse()\` in Route Handlers, or pass a Server Action directly to \`useChat\`.
- **\`maxSteps\` is required for multi-step tool use.** Without it, the model stops after the first tool call and returns the tool call result rather than a final text response.
- **Provider packages are separate.** You must install \`@ai-sdk/openai\` (or whichever provider) in addition to \`ai\` — the core package ships with no providers bundled.
- **Server Actions must be \`async\` and marked \`'use server'\`.** Forgetting either will cause a runtime error when \`useChat\` tries to call them.`,
}
