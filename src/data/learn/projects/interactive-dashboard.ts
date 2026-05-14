import type { Project } from '@/types/index'

export const interactiveDashboard: Project = {
    id: 'interactive-dashboard',
    name: 'Analytics Dashboard',
    description:
        'Build a data dashboard that reads from Supabase, renders live metrics, and responds to filter interactions.',
    overview: `## Overview

You'll build an analytics dashboard that fetches data from a Supabase database, displays key metrics in summary cards, and lets users filter the data by date range and category. The result is a page that feels like the kind of internal tool you'd find at any product company.

Dashboards are one of the most common things developers are asked to build, and they're a great forcing function for learning how data flows through a full-stack app. You'll touch every layer: the database query, the server-side data fetch, the client-side state for filters, and the rendering logic that ties it together.

What makes this project particularly instructive is the filter interaction. When a user changes a filter, you need to decide: do you re-fetch from the server, or filter client-side? Both approaches are valid in different situations, and working through that decision here — with real data and real latency — builds the intuition you'll use on every data-heavy project you build.`,
    instructions: `## Your Exercise

The starter files give you the page layout, the Supabase client setup, and the filter UI — but the data fetching and filter logic are left for you to implement.

**\`app/layout.tsx\`, \`app/page.tsx\`, and \`app/globals.css\`** are complete — read them to see how the app is structured.

**\`components/MetricCard.tsx\`** is complete — it displays a single metric. Read it to understand the \`Metric\` type.

**\`lib/supabase.ts\`** initializes the Supabase client. It's complete — read it to understand how the client is configured and exported.

**\`lib/data.ts\`** contains the \`getMetrics\` function stub. You'll need to:
1. Implement the Supabase query — select from the \`events\` table, aggregate by category, and return the results.
2. Add a \`getMetricsFiltered(startDate, endDate, category)\` variant that accepts filter parameters and adds \`.gte\`, \`.lte\`, and \`.eq\` clauses to the query.

**\`Dashboard.tsx\`** is a Client Component (\`'use client'\`) that receives the initial data and owns the filter state. You'll need to:
1. Implement the \`handleFilterChange\` function — when filters change, call a server action with the new parameters and update the local state with the result.
2. Wire the date inputs to the filter state.
3. Render the \`MetricCard\` components from the current data.

Build in this order: get the initial data loading working first (implement \`getMetrics\` in \`lib/data.ts\`), then add the filter interaction.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a full-stack data fetch pattern in Next.js — Server Components for the initial load, Server Actions for subsequent filtered queries, and client state to manage the UI between fetches.
- **Understand** the tradeoff between server-side filtering (accurate, slower) and client-side filtering (fast, limited to loaded data) — and when each approach is appropriate.
- **Recognize** the shape of a Supabase query builder chain and how to compose \`.select()\`, \`.eq()\`, \`.gte()\`, and \`.order()\` calls to express SQL-like queries in TypeScript.`,
    skills: ['next', 'supabase', 'tailwind'],
    domains: ['full-stack', 'data'],
    level: 'Intermediate',
    duration: '10 hrs',
    teachers: ['feynman', 'cs-lewis', 'lao-tzu'],
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
    title: 'Analytics Dashboard',
    description: 'Data dashboard with Supabase',
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
            content: `import { Suspense } from 'react'
import { getMetrics } from '@/lib/data'
import { Dashboard } from '@/components/Dashboard'

// Main dashboard page. Fetches initial data and passes it to the client component.
// Complete, no TODOs.
export default async function DashboardPage() {
    const metrics = await getMetrics()

    return (
        <main className="min-h-screen bg-gray-50">
            <header className="border-b bg-white px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h1>
            </header>
            <div className="mx-auto max-w-6xl px-6 py-8">
                <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
                    <Dashboard initialData={metrics} />
                </Suspense>
            </div>
        </main>
    )
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
            name: 'components/MetricCard.tsx',
            fileType: 'typescript',
            content: `import type { Metric } from '@/lib/data'

type MetricCardProps = {
    metric: Metric
}

// Displays a single metric card. Complete, no TODOs.
export function MetricCard({ metric }: MetricCardProps) {
    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                {metric.category}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
                {metric.total_events.toLocaleString()}
            </p>
            <div className="mt-3 flex gap-4 text-sm text-gray-600">
                <span>{metric.unique_users} users</span>
                <span>avg {metric.avg_value.toFixed(1)}</span>
            </div>
        </div>
    )
}
`,
        },
        {
            name: 'lib/data.ts',
            fileType: 'typescript',
            content: `import { createClient } from './supabase'

export type Metric = {
    category: string
    total_events: number
    unique_users: number
    avg_value: number
}

export type FilterParams = {
    startDate?: string   // ISO date string, e.g. '2026-01-01'
    endDate?: string
    category?: string
}

// Fetches aggregated metrics from the events table.
// The events table has columns: id, category, user_id, value, created_at
export async function getMetrics(): Promise<Metric[]> {
    const supabase = createClient()

    // TODO: Query the 'events' table.
    // You want to group by category and compute:
    //   - count of rows as total_events
    //   - count of distinct user_id as unique_users
    //   - average of value as avg_value
    //
    // Supabase supports this via .select() with aggregate syntax.
    // Hint: look at the Supabase docs for "aggregate functions" in select.
    //
    // Return the data array, or throw if there's an error.

    throw new Error('Not implemented')
}

// TODO: Implement getMetricsFiltered.
// It should accept a FilterParams object and add the appropriate
// .gte('created_at', startDate), .lte('created_at', endDate),
// and .eq('category', category) clauses when those params are provided.
export async function getMetricsFiltered(params: FilterParams): Promise<Metric[]> {
    throw new Error('Not implemented')
}
`,
        },
        {
            name: 'components/Dashboard.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState, useTransition } from 'react'
import type { Metric, FilterParams } from '@/lib/data'

// This is a Server Action — it runs on the server when called from the client.
// You'll define this in a separate 'actions.ts' file with 'use server' at the top.
import { fetchFiltered } from '@/lib/actions'

type DashboardProps = {
    initialData: Metric[]
}

export function Dashboard({ initialData }: DashboardProps) {
    const [data, setData] = useState<Metric[]>(initialData)
    const [filters, setFilters] = useState<FilterParams>({})
    const [isPending, startTransition] = useTransition()

    // TODO: Implement handleFilterChange.
    // When called with new filter values, it should:
    // 1. Merge the new values into the filters state.
    // 2. Call fetchFiltered with the updated filters inside startTransition.
    // 3. Update the data state with the result.
    //
    // useTransition marks the update as non-urgent so the UI stays responsive
    // while the server action is in flight.
    function handleFilterChange(newFilters: Partial<FilterParams>) {
        // TODO
    }

    return (
        <div className="space-y-6">
            {/* Filter bar */}
            <div className="flex gap-4 rounded-lg border bg-white p-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Start date</label>
                    <input
                        type="date"
                        className="rounded border px-2 py-1 text-sm"
                        onChange={(e) =>
                            // TODO: call handleFilterChange with the new startDate
                            undefined
                        }
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">End date</label>
                    <input
                        type="date"
                        className="rounded border px-2 py-1 text-sm"
                        onChange={(e) =>
                            // TODO: call handleFilterChange with the new endDate
                            undefined
                        }
                    />
                </div>
            </div>

            {/* Metrics grid */}
            {isPending ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* TODO: Map over data and render a MetricCard for each item.
                        Each card should show category, total_events, unique_users,
                        and avg_value. */}
                </div>
            )}
        </div>
    )
}

// A simple metric display card — no TODOs here, just read it.
function MetricCard({ metric }: { metric: Metric }) {
    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                {metric.category}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
                {metric.total_events.toLocaleString()}
            </p>
            <div className="mt-3 flex gap-4 text-sm text-gray-600">
                <span>{metric.unique_users} users</span>
                <span>avg {metric.avg_value.toFixed(1)}</span>
            </div>
        </div>
    )
}
`,
        },
        {
            name: 'lib/actions.ts',
            fileType: 'typescript',
            content: `'use server'

import { getMetricsFiltered } from './data'
import type { FilterParams, Metric } from './data'

// Server Action — called from the Dashboard client component when filters change.
// TODO: Call getMetricsFiltered with the provided params and return the result.
export async function fetchFiltered(params: FilterParams): Promise<Metric[]> {
    throw new Error('Not implemented')
}
`,
        },
        {
            name: 'lib/supabase.ts',
            fileType: 'typescript',
            content: `import { createBrowserClient } from '@supabase/ssr'

// Initializes a Supabase client for use in Client Components and Server Actions.
// The URL and anon key are public — they're safe to expose in the browser.
// Row-level security (RLS) policies on the Supabase side control what data
// each user can actually read or write.
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
}
`,
        },
    ],
}
