import type { Project } from '@/types/index'

export const bedrockAiApp: Project = {
    id: 'bedrock-ai-app',
    name: 'Bedrock AI App',
    description:
        'Build a Next.js app backed by AWS Bedrock — integrate Claude via the Bedrock API, manage IAM credentials, and stream responses.',
    overview: `## Overview

You'll build a Next.js application that calls Claude through AWS Bedrock instead of the Anthropic API directly. The app streams responses to the client using the Vercel AI SDK's Bedrock provider, and you'll configure the IAM credentials and region settings needed to authenticate with AWS.

Bedrock is how enterprises use foundation models — it keeps data inside AWS, enables VPC isolation, and integrates with IAM for access control. If you're building AI features for a company that's already on AWS, Bedrock is often the required path. Understanding how it differs from calling OpenAI or Anthropic directly — and specifically how AWS credential management works — is a practical skill that most AI tutorials skip entirely.

What makes this project specifically instructive is the credential layer. AWS authentication is more complex than an API key: you need to understand IAM roles, access keys, and how the AWS SDK resolves credentials from the environment. Working through that setup, and understanding why it's designed the way it is, gives you a foundation for working with any AWS service — not just Bedrock.`,
    instructions: `## Your Exercise

The starter files give you the chat UI and the route handler shell. The Bedrock integration and credential setup are left for you to implement.

**\`app/layout.tsx\`, \`app/page.tsx\`, and \`app/globals.css\`** are complete — read them to see how the app is structured.

**\`lib/bedrock.ts\`** initializes the Bedrock provider. You'll need to:
1. Import \`createAmazonBedrock\` from \`@ai-sdk/amazon-bedrock\`.
2. Configure it with your AWS region and credentials from environment variables (\`AWS_REGION\`, \`AWS_ACCESS_KEY_ID\`, \`AWS_SECRET_ACCESS_KEY\`).
3. Export a \`bedrock\` instance and a \`CLAUDE_MODEL_ID\` constant for the model you want to use (e.g. \`anthropic.claude-3-5-sonnet-20241022-v2:0\`).

**\`app/api/chat/route.ts\`** is the streaming route handler. You'll need to:
1. Parse the request body for \`messages\`.
2. Call \`streamText\` with the Bedrock model from \`lib/bedrock.ts\`.
3. Add error handling — Bedrock returns specific error types for credential failures, throttling, and model access issues. Catch them and return appropriate HTTP status codes.
4. Return \`result.toDataStreamResponse()\`.

**\`components/Chat.tsx\`** is mostly complete — the \`useChat\` hook is wired. You'll need to:
1. Add a model selector that lets the user switch between two Bedrock-hosted models (Claude Sonnet and Claude Haiku, for example).
2. Pass the selected model ID in the \`body\` option of \`useChat\` so the route handler can use it.

**\`.env.local\`** (not in the starter files — you create this) needs:
\`\`\`
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
\`\`\`

Build in this order: set up credentials and test the route handler with curl first, then wire the UI.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a streaming AI chat endpoint backed by AWS Bedrock using the Vercel AI SDK — including credential configuration, model selection, and error handling for AWS-specific failure modes.
- **Understand** how AWS IAM credential resolution works (environment variables → shared credentials file → instance role) and why Bedrock requires different setup than API-key-based providers.
- **Recognize** the Bedrock model ID format and how to find available models in the AWS console — and apply the same Vercel AI SDK patterns to switch between Bedrock, OpenAI, and Anthropic providers with minimal code changes.`,
    skills: ['next', 'bedrock', 'ai-sdk'],
    domains: ['ai', 'full-stack'],
    level: 'Advanced',
    duration: '10 hrs',
    teachers: ['kant', 'lao-tzu', 'feynman'],
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
    title: 'Bedrock AI App',
    description: 'AI chat powered by AWS Bedrock',
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
            name: 'lib/bedrock.ts',
            fileType: 'typescript',
            content: `import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock'

// TODO: Initialize the Bedrock provider with your AWS credentials.
// createAmazonBedrock accepts: region, accessKeyId, secretAccessKey.
// Read these from environment variables — never hardcode credentials.
//
// The provider returns a function you call with a model ID to get a model instance:
//   const model = bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0')

export const bedrock = createAmazonBedrock({
    region: process.env.AWS_REGION ?? 'us-east-1',
    // TODO: add accessKeyId and secretAccessKey from environment variables
})

// Bedrock model IDs follow the pattern: {provider}.{model-name}-{version}
// You must have access enabled for these models in your AWS account
// (Bedrock console → Model access → Request access).
export const MODELS = {
    claudeSonnet: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    claudeHaiku: 'anthropic.claude-3-haiku-20240307-v1:0',
} as const

export type BedrockModelId = (typeof MODELS)[keyof typeof MODELS]
`,
        },
        {
            name: 'app/api/chat/route.ts',
            fileType: 'typescript',
            content: `import { streamText } from 'ai'
import { bedrock, MODELS, type BedrockModelId } from '@/lib/bedrock'

export const runtime = 'nodejs'
// Note: Bedrock requires the Node.js runtime (not Edge) because the AWS SDK
// uses Node.js-specific APIs for credential resolution and request signing.

export async function POST(req: Request) {
    const { messages, modelId } = await req.json()

    // Use the requested model, falling back to Claude Sonnet
    const model = (modelId as BedrockModelId) ?? MODELS.claudeSonnet

    try {
        // TODO: Call streamText with:
        //   model: bedrock(model)
        //   messages: the messages array
        //   system: a brief system prompt
        //
        // Return result.toDataStreamResponse()

        return new Response('Not implemented', { status: 501 })
    } catch (error) {
        // TODO: Handle Bedrock-specific errors.
        // Common ones to handle:
        //   - Credential errors (missing or invalid AWS keys) → 401
        //   - Throttling / rate limits → 429
        //   - Model access not enabled → 403
        //   - Unknown errors → 500
        //
        // The AWS SDK throws errors with a 'name' property you can check:
        //   'CredentialsProviderError', 'ThrottlingException', 'AccessDeniedException'

        console.error('Bedrock error:', error)
        return new Response(
            JSON.stringify({ error: 'Failed to call Bedrock' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        )
    }
}
`,
        },
        {
            name: 'components/Chat.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { MODELS, type BedrockModelId } from '@/lib/bedrock'

const MODEL_OPTIONS: { id: BedrockModelId; label: string }[] = [
    { id: MODELS.claudeSonnet, label: 'Claude 3.5 Sonnet' },
    { id: MODELS.claudeHaiku, label: 'Claude 3 Haiku' },
]

export function Chat() {
    const [modelId, setModelId] = useState<BedrockModelId>(MODELS.claudeSonnet)

    // useChat is configured to pass the selected modelId to the route handler.
    // The body option merges extra fields into every request alongside messages.
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/chat',
        body: { modelId },
    })

    return (
        <div className="flex h-screen flex-col">
            <header className="border-b bg-white px-4 py-3">
                <div className="mx-auto flex max-w-2xl items-center justify-between">
                    <h1 className="font-semibold">Bedrock Chat</h1>
                    {/* TODO: Render a model selector using MODEL_OPTIONS.
                        When the user selects a different model, call setModelId.
                        The next message will use the newly selected model. */}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-2xl space-y-4">
                    {messages.length === 0 && (
                        <p className="text-center text-sm text-gray-400">
                            Start a conversation with Claude via AWS Bedrock.
                        </p>
                    )}
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={[
                                'rounded-xl px-4 py-3 text-sm',
                                m.role === 'user'
                                    ? 'ml-auto max-w-sm bg-violet-600 text-white'
                                    : 'max-w-prose bg-gray-100 text-gray-800',
                            ].join(' ')}
                        >
                            {m.content}
                        </div>
                    ))}
                    {isLoading && (
                        <p className="text-sm text-gray-400">Claude is thinking...</p>
                    )}
                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            Error: {error.message}
                        </p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t bg-white px-4 py-3">
                <div className="mx-auto flex max-w-2xl gap-3">
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
                </div>
            </form>
        </div>
    )
}
`,
        },
    ],
}
