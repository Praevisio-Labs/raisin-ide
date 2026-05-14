import type { Project } from '@/types/index'

export const toolCallingAgent: Project = {
    id: 'tool-calling-agent',
    name: 'Tool-Calling Agent',
    description:
        'Build an AI agent that uses the Vercel AI SDK tool system to call real functions, validate results, and complete multi-step tasks.',
    overview: `## Overview

You'll build an AI agent that can use tools: a weather lookup, a calculator, and a web search stub. The agent decides which tools to call, calls them, incorporates the results, and continues reasoning until it has a complete answer. The interface is a Next.js chat UI backed by a streaming route handler.

Tool calling is what separates a chatbot from an agent. A chatbot generates text. An agent takes actions — it can look things up, run calculations, call APIs, and chain multiple steps together to complete a task that no single model response could handle. Understanding how tool calling works at the implementation level is essential for building anything more sophisticated than a simple Q&A interface.

This project is specifically well-suited to advanced learners because the interesting problems aren't in the UI — they're in the agent loop. How does the model decide when to call a tool vs. answer directly? What happens when a tool returns an error? How do you prevent the agent from looping indefinitely? Working through these questions with real code, rather than reading about them abstractly, builds the intuition you need to design reliable agents.`,
    instructions: `## Your Exercise

The starter files give you the chat UI and the tool definitions. The agent loop and tool execution are left for you to implement.

**\`app/layout.tsx\`, \`app/page.tsx\`, and \`app/globals.css\`** are complete — read them to see how the agent component is wired into the route.

**\`lib/tools.ts\`** defines the three tools using the Vercel AI SDK's \`tool()\` helper. The schemas are complete. You'll need to:
1. Implement the \`execute\` function for \`getWeather\` — it should return a mock weather object based on the city name (hardcode a few cities, return a default for unknown ones).
2. Implement the \`execute\` function for \`calculate\` — parse and evaluate the expression string safely. Use a simple approach: support +, -, *, / with \`Function\` or a safe eval alternative.
3. The \`searchWeb\` tool's execute is stubbed to return a placeholder — leave it as-is and note in a comment why a real implementation would need a search API key.

**\`app/api/agent/route.ts\`** is the route handler. You'll need to:
1. Call \`streamText\` with the tools from \`lib/tools.ts\` and set \`maxSteps: 5\` to allow multi-step reasoning.
2. Add a system prompt that tells the model it has access to tools and should use them when the question requires real data.
3. Return \`result.toDataStreamResponse()\`.

**\`components/AgentChat.tsx\`** is the client component. The \`useChat\` hook is configured. You'll need to:
1. Render tool call steps in the message list — when a message has \`toolInvocations\`, show which tool was called and what it returned.
2. Style tool calls differently from regular messages so the user can see the agent's reasoning process.

Build in this order: implement the tool execute functions first (test them in isolation), then the route handler, then the tool call rendering in the UI.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a multi-step tool-calling agent with the Vercel AI SDK — including tool definitions with Zod schemas, execute functions, and the \`maxSteps\` loop that allows the model to chain tool calls.
- **Understand** the tool call lifecycle: how the model decides to call a tool, how the result is fed back into the context, and how the model uses that result to continue reasoning or produce a final answer.
- **Recognize** the failure modes of agentic systems — infinite loops, tool errors, hallucinated tool arguments — and the design patterns (max steps, input validation, error returns) that make agents more reliable.`,
    skills: ['next', 'ai-sdk', 'open-ai'],
    domains: ['ai', 'agents'],
    level: 'Advanced',
    duration: '10 hrs',
    teachers: ['nietzsche', 'kant', 'lao-tzu'],
    isReleased: true,
    files: [
        {
            name: 'app/layout.tsx',
            fileType: 'typescript',
            content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Tool-Calling Agent',
    description: 'AI agent with tool use capabilities',
}

// Root layout — complete, no TODOs.
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
`,
        },
        {
            name: 'app/page.tsx',
            fileType: 'typescript',
            content: `import { AgentChat } from '@/components/AgentChat'

// Entry point — renders the AgentChat component. Complete, no TODOs.
export default function HomePage() {
    return <AgentChat />
}
`,
        },
        {
            name: 'app/globals.css',
            fileType: 'css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
        },
        {
            name: 'lib/tools.ts',
            fileType: 'typescript',
            content: `import { tool } from 'ai'
import { z } from 'zod'

// Tools are functions the model can call during its reasoning process.
// Each tool has a description (tells the model when to use it),
// a parameters schema (Zod, validated before execute runs),
// and an execute function (the actual implementation).

export const getWeather = tool({
    description:
        'Get the current weather for a city. Use this when the user asks about weather conditions.',
    parameters: z.object({
        city: z.string().describe('The city name, e.g. "Tokyo" or "New York"'),
    }),
    execute: async ({ city }) => {
        // TODO: Return a mock weather object for the given city.
        // Hardcode responses for a few cities (e.g. Tokyo, London, New York, Sydney).
        // For unknown cities, return a sensible default.
        // Shape: { city, temperature, unit, condition, humidity }
        // Example: { city: 'Tokyo', temperature: 22, unit: 'C', condition: 'Partly cloudy', humidity: 65 }
        throw new Error('Not implemented')
    },
})

export const calculate = tool({
    description:
        'Evaluate a mathematical expression. Use this for arithmetic, not for questions you can answer directly.',
    parameters: z.object({
        expression: z
            .string()
            .describe('A mathematical expression to evaluate, e.g. "42 * 1.08" or "(100 - 32) * 5/9"'),
    }),
    execute: async ({ expression }) => {
        // TODO: Safely evaluate the expression and return the result.
        // Approach: validate that the expression only contains numbers, operators,
        // parentheses, and whitespace before evaluating it.
        // Return { expression, result } on success, or { expression, error } on failure.
        //
        // Security note: never use eval() on unsanitized user input in production.
        // For this exercise, validate the input first with a regex whitelist.
        const safePattern = /^[0-9+\-*/().\s]+$/
        if (!safePattern.test(expression)) {
            return { expression, error: 'Expression contains invalid characters' }
        }
        // TODO: evaluate and return the result
        throw new Error('Not implemented')
    },
})

export const searchWeb = tool({
    description:
        'Search the web for current information. Use this when the user asks about recent events or facts you might not know.',
    parameters: z.object({
        query: z.string().describe('The search query'),
    }),
    execute: async ({ query }) => {
        // In a real implementation, this would call a search API (Brave, Serper, Tavily, etc.)
        // For this exercise, return a placeholder so the agent can still demonstrate
        // the tool-calling flow without requiring an API key.
        return {
            query,
            results: [
                {
                    title: 'Search result placeholder',
                    snippet: \`This is where real search results for "\${query}" would appear.\`,
                    url: 'https://example.com',
                },
            ],
            note: 'Connect a real search API to get live results.',
        }
    },
})

// Export all tools as a record for easy use in the route handler
export const agentTools = { getWeather, calculate, searchWeb }
`,
        },
        {
            name: 'app/api/agent/route.ts',
            fileType: 'typescript',
            content: `import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { agentTools } from '@/lib/tools'

export const runtime = 'edge'

export async function POST(req: Request) {
    const { messages } = await req.json()

    // TODO: Call streamText with:
    //   model: openai('gpt-4o')  — use gpt-4o for better tool-calling reliability
    //   tools: agentTools
    //   maxSteps: 5  — allows the model to chain up to 5 tool calls before giving a final answer
    //   system: a prompt that tells the model it has tools available and should use them
    //           when the question requires real data (weather, calculations, recent info)
    //   messages: the messages array from the request
    //
    // Return result.toDataStreamResponse().

    return new Response('Not implemented', { status: 501 })
}
`,
        },
        {
            name: 'components/AgentChat.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useChat } from 'ai/react'

export function AgentChat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/agent',
    })

    return (
        <div className="flex h-screen flex-col">
            <header className="border-b bg-white px-4 py-3">
                <h1 className="font-semibold">Tool-Calling Agent</h1>
                <p className="text-xs text-gray-500">
                    Try: "What's the weather in Tokyo?" or "What is 15% of 847?"
                </p>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-2xl space-y-4">
                    {messages.map((m) => (
                        <div key={m.id}>
                            {/* Regular text content */}
                            {m.content && (
                                <div
                                    className={[
                                        'rounded-xl px-4 py-3 text-sm',
                                        m.role === 'user'
                                            ? 'ml-auto max-w-sm bg-violet-600 text-white'
                                            : 'max-w-prose bg-gray-100 text-gray-800',
                                    ].join(' ')}
                                >
                                    {m.content}
                                </div>
                            )}

                            {/* TODO: Render tool invocations.
                                m.toolInvocations is an array of tool calls made during this message.
                                Each invocation has: toolName, args, state ('call' | 'result'), result.
                                Show a compact "tool call" block for each invocation:
                                - The tool name and args (so the user can see what was called)
                                - The result when state === 'result'
                                Style it differently from regular messages — a monospace font
                                and a distinct background color works well. */}
                        </div>
                    ))}
                    {isLoading && (
                        <p className="text-sm text-gray-400">Agent is thinking...</p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t bg-white px-4 py-3">
                <div className="mx-auto flex max-w-2xl gap-3">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask something that requires a tool..."
                        className="flex-1 rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}
`,
        },
    ],
}
