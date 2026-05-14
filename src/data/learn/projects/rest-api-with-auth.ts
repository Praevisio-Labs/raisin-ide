import type { Project } from '@/types/index'

export const restApiWithAuth: Project = {
    id: 'rest-api-with-auth',
    name: 'Full-Stack Auth App',
    description:
        'Build a Next.js app with Supabase authentication, protected routes, and user profile management.',
    overview: `## Overview

You'll build a Next.js application with a complete authentication flow: sign up, sign in, sign out, protected routes that redirect unauthenticated users, and a profile page where users can update their display name. Supabase handles the auth backend — you're building the UI and the route protection logic.

Authentication is one of those features that every app needs and that most developers get wrong the first time. The common mistakes — storing tokens in localStorage, protecting routes only on the client, not handling session expiry — all come from not understanding how auth state flows through a full-stack app. This project forces you to confront that flow directly.

What makes this project specifically instructive is the middleware. Next.js middleware runs on the edge before any page renders, which is the right place to check auth state and redirect. Understanding why middleware is the correct layer for route protection — rather than a client-side check in the component — is one of the most transferable things you'll learn here.`,
    instructions: `## Your Exercise

The starter files give you the page layouts and the Supabase client setup. The auth logic and route protection are left for you to implement.

**\`app/layout.tsx\`, \`app/page.tsx\` (dashboard), and \`app/globals.css\`** are complete — read them to see how the app is structured.

**\`app/login/page.tsx\` and \`app/signup/page.tsx\`** have the form UI in place. You'll implement the submit handlers for each.

**\`middleware.ts\`** is the most important file. It runs on every request before the page renders. You'll need to:
1. Call \`supabase.auth.getUser()\` to check if the current request has a valid session.
2. If the user is not authenticated and the path is not \`/login\` or \`/signup\`, redirect to \`/login\`.
3. If the user is authenticated and the path is \`/login\` or \`/signup\`, redirect to \`/\` (the dashboard).

Build in this order: middleware first (so you can test redirects), then login, then signup.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a complete Supabase auth flow in Next.js — sign up, sign in, sign out, session refresh, and protected routes — using the correct client for each context (server vs. client component).
- **Understand** why route protection belongs in middleware rather than in client components, and what the difference is between a Supabase server client and a browser client.
- **Recognize** the session cookie pattern that Supabase uses and why it's more secure than storing tokens in localStorage — and apply the same reasoning to other auth providers.`,
    skills: ['next', 'supabase', 'typescript'],
    domains: ['full-stack', 'security'],
    level: 'Intermediate',
    duration: '10 hrs',
    teachers: ['kant', 'confucius'],
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
    title: 'Full-Stack Auth App',
    description: 'Authentication with Supabase',
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
            content: `import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Protected dashboard page. Middleware should redirect unauthenticated users,
// but we check again here to be defensive. Complete, no TODOs.
export default async function DashboardPage() {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options),
                    )
                },
            },
        },
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <h1 className="mb-8 text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome, {user.email}</p>
            <form action="/auth/signout" method="post" className="mt-6">
                <button
                    type="submit"
                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                    Sign out
                </button>
            </form>
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
            name: 'app/login/page.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

// Login page. The form UI is in place. You'll implement the submit handler.
export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        // TODO: Call supabase.auth.signInWithPassword({ email, password }).
        // If there's an error, set it with setError(error.message).
        // If successful, navigate to / with router.push('/').

        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">Sign in</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-violet-600 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    No account?{' '}
                    <Link href="/signup" className="text-violet-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
`,
        },
        {
            name: 'app/signup/page.tsx',
            fileType: 'typescript',
            content: `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

// Signup page. Similar to login — you'll implement the submit handler.
export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        // TODO: Call supabase.auth.signUp({ email, password }).
        // If there's an error, set it with setError(error.message).
        // If successful, set success to true to show the "check your email" message.

        setLoading(false)
    }

    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm text-center">
                    <h1 className="mb-4 text-2xl font-bold text-gray-900">Check your email</h1>
                    <p className="text-sm text-gray-600">
                        We sent you a confirmation link. Click it to activate your account.
                    </p>
                    <Link
                        href="/login"
                        className="mt-6 inline-block text-sm text-violet-600 hover:underline"
                    >
                        Back to sign in
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">Sign up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-violet-600 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Sign up'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-violet-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
`,
        },
        {
            name: 'middleware.ts',
            fileType: 'typescript',
            content: `import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Middleware runs on the Edge before every page render.
// This is the correct place to check auth state and redirect —
// it runs server-side, so there's no flash of unauthenticated content.
export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    )
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options),
                    )
                },
            },
        },
    )

    // TODO: Call supabase.auth.getUser() to get the current session.
    // Note: always use getUser() in middleware, not getSession() —
    // getSession() reads from the cookie without verifying with the server,
    // which means it can be spoofed. getUser() makes a network call to verify.

    const { data: { user } } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl
    const isAuthPage = pathname === '/login' || pathname === '/signup'

    // TODO: If there's no user and the path is not an auth page,
    // redirect to /login. Use NextResponse.redirect(new URL('/login', request.url)).

    // TODO: If there is a user and the path is an auth page,
    // redirect to /dashboard to avoid showing the login form to logged-in users.

    return supabaseResponse
}

export const config = {
    matcher: [
        // Run middleware on all paths except static files and API routes
        '/((?!_next/static|_next/image|favicon.ico|api/).*)',
    ],
}
`,
        },
    ],
}
