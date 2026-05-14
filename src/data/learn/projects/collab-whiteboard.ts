import type { Project } from '@/types/index'

export const collabWhiteboard: Project = {
    id: 'collab-whiteboard',
    name: 'Real-Time Chat',
    description:
        'Build a real-time group chat app using Supabase Realtime — messages appear instantly across all connected clients.',
    overview: `## Overview

You'll build a real-time group chat room: users enter a display name, join a shared channel, and see messages from all participants appear instantly without refreshing the page. Supabase Realtime handles the WebSocket connection and message broadcasting — you're building the UI and the subscription logic.

Real-time features are one of the most requested skills in web development and one of the least well-understood. Most developers have used real-time apps (Slack, Figma, Google Docs) but haven't built one. The gap between "I know WebSockets exist" and "I can implement a real-time feature" is larger than it looks, and this project closes it.

What makes this project particularly instructive is that Supabase Realtime gives you two distinct mechanisms — Broadcast (ephemeral, no persistence) and Postgres Changes (persisted, triggers on DB writes) — and you'll use both. Understanding when to use each, and why, is a decision you'll face on every real-time feature you build.`,
    instructions: `## Your Exercise

The starter files give you the chat UI and the Supabase client setup. The real-time subscription and message persistence are left for you to implement.

**\`app/layout.tsx\`, \`app/page.tsx\`, and \`app/globals.css\`** are complete — read them to see how the app is structured.

**\`lib/supabase.ts\`** is complete — it exports the Supabase browser client. Read it before starting.

**\`supabase-schema.sql\`** shows the database schema. Run this in the Supabase SQL editor to set up the \`messages\` table.

**\`components/Chat.tsx\`** is where all the work happens. The component structure and state are in place. You'll need to:

1. **Load message history** — in a \`useEffect\` that runs once on mount, query the \`messages\` table (columns: \`id\`, \`username\`, \`content\`, \`created_at\`) ordered by \`created_at\` ascending. Set the result into the \`messages\` state.

2. **Subscribe to new messages** — after loading history, subscribe to Postgres Changes on the \`messages\` table for \`INSERT\` events. When a new row arrives, append it to the \`messages\` state. This is what makes messages appear in real time for all connected clients.

3. **Send a message** — implement \`handleSend\`. It should insert a new row into the \`messages\` table with the current \`username\` and the input text. The Postgres Changes subscription will pick it up and broadcast it to all clients — you don't need to update local state manually.

4. **Clean up** — return a cleanup function from the \`useEffect\` that calls \`supabase.removeChannel(channel)\` to unsubscribe when the component unmounts.

The \`username\` state is already wired to a name entry form that shows before the chat. You don't need to change that part.

Build in this order: load history first (so you can see the query working), then add the subscription, then implement send.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a Supabase Realtime subscription that listens for database changes and updates React state in real time — including cleanup on unmount.
- **Understand** the difference between Supabase Broadcast (ephemeral peer-to-peer) and Postgres Changes (triggered by actual database writes) — and why persistence matters for a chat app.
- **Recognize** the subscription lifecycle pattern — subscribe, handle events, unsubscribe — and apply it to other real-time providers like Ably, Pusher, or native WebSockets.`,
    skills: ['next', 'supabase', 'tailwind'],
    domains: ['full-stack'],
    level: 'Intermediate',
    duration: '8 hrs',
    teachers: ['montessori', 'feynman', 'nietzsche'],
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
    title: 'Real-Time Chat',
    description: 'Group chat powered by Supabase Realtime',
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
            name: 'components/Chat.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'

type Message = {
    id: string
    username: string
    content: string
    created_at: string
}

export function Chat() {
    const [username, setUsername] = useState('')
    const [joined, setJoined] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        if (!joined) return

        // TODO: Step 1 — Load message history.
        // Query the 'messages' table, select all columns, order by created_at ascending.
        // Set the result into the messages state.
        // Handle the error case (log it or show a UI error).

        // TODO: Step 2 — Subscribe to new messages.
        // Use supabase.channel('room') to create a channel.
        // Call .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, ...)
        // In the callback, append the new record (payload.new as Message) to messages state.
        // Call .subscribe() to activate the subscription.
        //
        // Store the channel in a variable so you can clean it up.

        // TODO: Step 4 — Return a cleanup function.
        // Call supabase.removeChannel(channel) to unsubscribe when the component unmounts
        // or when 'joined' changes.
    }, [joined])

    async function handleSend(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim()) return

        // TODO: Step 3 — Insert a new message into the 'messages' table.
        // Insert { username, content: input.trim() }.
        // Clear the input after inserting.
        // You do NOT need to update messages state here — the Postgres Changes
        // subscription will receive the new row and update state automatically.

        setInput('')
    }

    // Name entry screen — shown before joining
    if (!joined) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (username.trim()) setJoined(true)
                    }}
                    className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm"
                >
                    <h1 className="mb-4 text-xl font-bold">Join the chat</h1>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your display name"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        type="submit"
                        className="mt-3 w-full rounded-lg bg-violet-600 py-2 text-sm font-medium text-white hover:bg-violet-700"
                    >
                        Join
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <header className="border-b bg-white px-4 py-3">
                <h1 className="font-semibold text-gray-900">Group Chat</h1>
                <p className="text-xs text-gray-500">Signed in as {username}</p>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="mx-auto max-w-2xl space-y-3">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={[
                                'flex flex-col rounded-xl px-4 py-2 text-sm',
                                m.username === username
                                    ? 'ml-auto max-w-sm items-end bg-violet-600 text-white'
                                    : 'max-w-sm bg-white text-gray-800 shadow-sm',
                            ].join(' ')}
                        >
                            {m.username !== username && (
                                <span className="mb-1 text-xs font-medium text-gray-500">
                                    {m.username}
                                </span>
                            )}
                            <span>{m.content}</span>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            </div>

            <form
                onSubmit={handleSend}
                className="border-t bg-white px-4 py-3"
            >
                <div className="mx-auto flex max-w-2xl gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
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
        {
            name: 'lib/supabase.ts',
            fileType: 'typescript',
            content: `import { createBrowserClient } from '@supabase/ssr'

// A single browser client instance for use in Client Components.
// The anon key is safe to expose — Supabase's Row Level Security
// policies control what each user can read and write.
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
}
`,
        },
        {
            name: 'supabase-schema.sql',
            fileType: 'sql',
            content: `-- Run this in the Supabase SQL editor to set up the messages table.

create table if not exists messages (
    id          uuid primary key default gen_random_uuid(),
    username    text not null,
    content     text not null,
    created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table messages enable row level security;

-- Allow anyone to read messages (public chat room)
create policy "Anyone can read messages"
    on messages for select
    using (true);

-- Allow anyone to insert messages
-- In a real app you'd require authentication here
create policy "Anyone can insert messages"
    on messages for insert
    with check (true);

-- Enable Realtime for this table
-- (also needs to be enabled in the Supabase dashboard under Database > Replication)
alter publication supabase_realtime add table messages;
`,
        },
    ],
}
