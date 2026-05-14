import type { Project } from '@/types/index'

export const saasStarter: Project = {
    id: 'saas-starter',
    name: 'AI Chat Starter',
    description:
        'Build a streaming AI chat app with the Vercel AI SDK, custom personas, and a polished chat UI.',
    overview: `## Overview

You'll build a streaming AI chat application: a chat interface where users can send messages, see the AI's response stream in token by token, and switch between different AI personas that change the model's behavior. The stack is Next.js, the Vercel AI SDK, and OpenAI.

This is the foundational project for AI application development. The patterns you'll implement here — streaming responses, managing message history, system prompt injection — appear in every AI product, from simple chatbots to complex agents. Understanding them at this level of detail, rather than just dropping in a pre-built chat component, is what lets you customize and extend AI features confidently.

The persona system is what makes this project particularly instructive. Implementing it forces you to understand how system prompts work and how they shape model behavior — which is the most important lever you have when building AI products. By the time you've built three personas and seen how they change the model's responses, you'll have a much more concrete mental model of prompt engineering than any tutorial can give you.`,
    instructions: `## Your Exercise

The starter files give you the chat UI and the route handler shell. The streaming logic and persona system are left for you to implement.

**\`app/layout.tsx\`, \`app/page.tsx\`, and \`app/globals.css\`** are complete — read them to see how the chat component is wired into the route.

**\`lib/personas.ts\`** defines the persona data. It's complete — read it to understand the shape of a persona object and the system prompts that are already written.

**\`app/api/chat/route.ts\`** is the API route that the client calls. You'll need to:
1. Parse the request body to get \`messages\` and \`personaId\`.
2. Look up the persona by ID from \`lib/personas.ts\` and get its system prompt.
3. Call \`streamText\` from the Vercel AI SDK with the OpenAI model, the system prompt, and the messages.
4. Return \`result.toDataStreamResponse()\` — this is what the client-side \`useChat\` hook expects.

**\`components/Chat.tsx\`** is the client component. The \`useChat\` hook is imported but not configured. You'll need to:
1. Call \`useChat\` with \`api: '/api/chat'\` and pass the current \`personaId\` in the \`body\` option so the route handler receives it.
2. Wire the \`messages\` array to the \`<MessageList>\` component.
3. Wire the form's submit to \`handleSubmit\` and the input to \`input\` / \`handleInputChange\` from \`useChat\`.
4. Show a loading indicator when \`isLoading\` is true.

**\`components/PersonaSelect.tsx\`** is complete — it renders the persona switcher. Read it to understand how the selected persona ID is passed up to \`Chat.tsx\`.

Build in this order: get the route handler streaming first (test it with curl or a REST client), then wire up the \`useChat\` hook, then add the persona selector.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a streaming AI chat endpoint with the Vercel AI SDK and wire it to a React client using \`useChat\` — including message history, loading state, and error handling.
- **Understand** how system prompts shape model behavior and why they're injected server-side rather than sent from the client.
- **Recognize** the data stream protocol that \`toDataStreamResponse()\` produces and why \`useChat\` on the client needs to match it — which will help you debug streaming issues and integrate other AI providers.`,
    skills: ['next', 'ai-sdk', 'open-ai'],
    domains: ['full-stack', 'ai'],
    level: 'Intermediate',
    duration: '8 hrs',
    teachers: ['confucius', 'kant'],
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
    title: 'AI Chat Starter',
    description: 'Streaming AI chat with custom personas',
}

// Root layout — complete, no TODOs. Read it to see how the app is structured.
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
            content: `import { Chat } from '@/components/Chat'

// Entry point — renders the Chat component. Complete, no TODOs.
export default function HomePage() {
    return <Chat />
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
            name: 'app/api/chat/route.ts',
            fileType: 'typescript',
            content: `import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { personas } from '@/lib/personas'

export const runtime = 'edge'

export async function POST(req: Request) {
    // TODO: Parse the request body.
    // The Vercel AI SDK's useChat hook sends { messages, ...body }
    // where body contains any extra fields you pass in the body option.
    // You're passing personaId in the body, so destructure it here.

    // TODO: Look up the persona by personaId.
    // Fall back to the first persona if the ID isn't found.
    // Get the system prompt from the persona object.

    // TODO: Call streamText with:
    //   model: openai('gpt-4o-mini')
    //   system: the persona's system prompt
    //   messages: the messages array from the request
    //
    // Then return result.toDataStreamResponse().
    // This format is what the useChat hook on the client expects.

    return new Response('Not implemented', { status: 501 })
}
`,
        },
        {
            name: 'components/MessageList.tsx',
            fileType: 'typescript',
            content: `'use client'

import type { Message } from 'ai'

type MessageListProps = {
    messages: Message[]
    isLoading: boolean
}

// Renders the chat message list. The empty state is complete.
// The message rendering is a TODO for you to implement.
export function MessageList({ messages, isLoading }: MessageListProps) {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto max-w-2xl space-y-4">
                {messages.length === 0 && (
                    <p className="text-center text-sm text-gray-400">
                        Start a conversation.
                    </p>
                )}
                {/* TODO: Map over messages and render each one.
                    Each message has a role ('user' | 'assistant') and content (string).
                    Style user messages differently from assistant messages.
                    User messages: right-aligned, violet background, white text, max-w-sm
                    Assistant messages: left-aligned, gray background, gray text, max-w-prose */}
                {/* TODO: Show a loading indicator when isLoading is true.
                    A simple "Assistant is thinking..." text works well. */}
            </div>
        </div>
    )
}
`,
        },
        {
            name: 'components/Chat.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { personas } from '@/lib/personas'
import { PersonaSelect } from './PersonaSelect'
import { MessageList } from './MessageList'

export function Chat() {
    const [personaId, setPersonaId] = useState(personas[0].id)

    // TODO: Configure useChat.
    // - api: '/api/chat' (the route handler you implemented)
    // - body: { personaId } — this gets merged into every request body,
    //   so the route handler can read it alongside messages.
    //
    // Destructure: messages, input, handleInputChange, handleSubmit, isLoading
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        // TODO: configure the hook here
    })

    return (
        <div className="flex h-screen flex-col">
            {/* Persona selector */}
            <PersonaSelect selectedId={personaId} onSelect={setPersonaId} />

            {/* Message list */}
            <MessageList messages={messages} isLoading={isLoading} />

            {/* Input form */}
            <div className="border-t bg-white px-4 py-4">
                <form
                    onSubmit={handleSubmit}
                    className="mx-auto flex max-w-2xl gap-3"
                >
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Send a message..."
                        className="flex-1 rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}
`,
        },
        {
            name: 'components/PersonaSelect.tsx',
            fileType: 'typescript',
            content: `'use client'

import { personas, type Persona } from '@/lib/personas'

type PersonaSelectProps = {
    selectedId: string
    onSelect: (id: string) => void
}

// This component is complete — no TODOs. Read it to understand how the
// selected persona ID is passed up to the parent Chat component.
export function PersonaSelect({ selectedId, onSelect }: PersonaSelectProps) {
    return (
        <div className="border-b bg-white px-4 py-3">
            <div className="mx-auto flex max-w-2xl items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Persona:</span>
                {personas.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => onSelect(p.id)}
                        className={[
                            'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                            selectedId === p.id
                                ? 'bg-violet-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                        ].join(' ')}
                    >
                        {p.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
`,
        },
        {
            name: 'lib/personas.ts',
            fileType: 'typescript',
            content: `export type Persona = {
    id: string
    name: string
    description: string
    systemPrompt: string
}

// Each persona has a distinct system prompt that shapes how the model responds.
// The same user message will produce very different responses depending on which
// persona is active — this is the core mechanic of prompt engineering.
export const personas: Persona[] = [
    {
        id: 'concise',
        name: 'Concise',
        description: 'Direct answers, no fluff.',
        systemPrompt:
            'You are a direct, efficient assistant. Give the shortest accurate answer possible. ' +
            'No preamble, no filler phrases like "Great question!", no unnecessary elaboration. ' +
            'If a one-sentence answer is sufficient, give one sentence.',
    },
    {
        id: 'teacher',
        name: 'Teacher',
        description: 'Explains concepts step by step.',
        systemPrompt:
            'You are a patient, thorough teacher. When answering questions, explain the underlying ' +
            'concepts before giving the answer. Use analogies and examples. Break complex topics ' +
            'into numbered steps. Check for understanding by ending with a follow-up question.',
    },
    {
        id: 'socratic',
        name: 'Socratic',
        description: 'Guides with questions instead of answers.',
        systemPrompt:
            'You are a Socratic tutor. Never give direct answers. Instead, ask questions that ' +
            'guide the user to discover the answer themselves. Start with what they already know, ' +
            'then ask questions that reveal the gaps. Only confirm correct reasoning — never supply ' +
            'the answer directly.',
    },
]
`,
        },
    ],
}
