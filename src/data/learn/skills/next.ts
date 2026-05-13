import type { Skill } from '@/types/index'

export const next: Skill = {
    id: 'next',
    name: 'Next.js',
    content: `## Next.js Refresher

Next.js is a React framework that adds file-based routing, server-side rendering, static generation, and API routes on top of React. It handles the build pipeline, code splitting, and deployment optimizations so you don't have to configure them yourself.

---

### Project structure

\`\`\`
my-app/
├── app/                  # App Router (Next.js 13+)
│   ├── layout.tsx        # Root layout — wraps every page
│   ├── page.tsx          # Route: /
│   ├── about/
│   │   └── page.tsx      # Route: /about
│   └── blog/
│       ├── page.tsx      # Route: /blog
│       └── [slug]/
│           └── page.tsx  # Route: /blog/:slug (dynamic)
├── public/               # Static assets — served at /
├── next.config.ts        # Next.js configuration
└── package.json
\`\`\`

---

### The App Router

Next.js 13 introduced the **App Router** (the \`app/\` directory), which uses React Server Components by default. The older **Pages Router** (\`pages/\` directory) still works but the App Router is the current standard.

Every \`page.tsx\` file exports a default React component that becomes the UI for that route:

\`\`\`tsx
// app/about/page.tsx
export default function AboutPage() {
    return <h1>About</h1>
}
\`\`\`

---

### Layouts

A \`layout.tsx\` file wraps all routes at its level and below. The root layout is required and must include \`<html>\` and \`<body>\`:

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
\`\`\`

Nested layouts wrap only their subtree. A \`app/dashboard/layout.tsx\` wraps all routes under \`/dashboard\` without re-rendering the root layout.

---

### Server vs Client Components

By default, every component in the App Router is a **Server Component** — it renders on the server, has no JavaScript bundle cost on the client, and can directly access databases, environment variables, and the filesystem.

Add \`'use client'\` at the top of a file to make it a **Client Component** — required for anything that uses browser APIs, event handlers, or React hooks like \`useState\` and \`useEffect\`:

\`\`\`tsx
'use client'

import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

A good pattern: keep data fetching and heavy logic in Server Components, push interactivity into small Client Components at the leaves of the tree.

---

### Data fetching

In Server Components, fetch data directly with \`async\`/\`await\` — no \`useEffect\` needed:

\`\`\`tsx
// app/posts/page.tsx
async function getPosts() {
    const res = await fetch('https://api.example.com/posts', {
        next: { revalidate: 60 }, // revalidate every 60 seconds
    })
    return res.json()
}

export default async function PostsPage() {
    const posts = await getPosts()
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}
\`\`\`

Next.js extends the native \`fetch\` API with caching options:

- \`cache: 'force-cache'\` — cache indefinitely (default for static generation)
- \`cache: 'no-store'\` — always fetch fresh (equivalent to SSR)
- \`next: { revalidate: N }\` — revalidate after N seconds (ISR)

---

### Dynamic routes

Wrap a folder name in square brackets to create a dynamic segment:

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)
    return <article>{post.content}</article>
}
\`\`\`

Use \`generateStaticParams\` to pre-render dynamic routes at build time:

\`\`\`tsx
export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({ slug: post.slug }))
}
\`\`\`

---

### Route Handlers (API routes)

Create a \`route.ts\` file inside the \`app/\` directory to define an API endpoint:

\`\`\`ts
// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ message: 'Hello' })
}

export async function POST(request: Request) {
    const body = await request.json()
    return NextResponse.json({ received: body })
}
\`\`\`

The file can export named functions for each HTTP method: \`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`.

---

### The \`Link\` component

Use \`<Link>\` from \`next/link\` for client-side navigation — it prefetches the destination page and avoids a full reload:

\`\`\`tsx
import Link from 'next/link'

export default function Nav() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </nav>
    )
}
\`\`\`

Never use a plain \`<a>\` tag for internal navigation — it triggers a full page load.

---

### The \`Image\` component

\`next/image\` automatically optimizes images: resizing, converting to modern formats (WebP/AVIF), and lazy loading.

\`\`\`tsx
import Image from 'next/image'

export default function Avatar() {
    return (
        <Image
            src="/avatar.jpg"
            alt="User avatar"
            width={64}
            height={64}
        />
    )
}
\`\`\`

\`width\` and \`height\` are required for local images to prevent layout shift. For images that fill their container, use \`fill\` with a positioned parent instead.

---

### Metadata

Export a \`metadata\` object (or a \`generateMetadata\` function) from any \`page.tsx\` or \`layout.tsx\` to set \`<head>\` tags:

\`\`\`tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My App',
    description: 'A Next.js application',
}
\`\`\`

For dynamic titles, use the \`title.template\` pattern in the root layout:

\`\`\`tsx
export const metadata: Metadata = {
    title: {
        template: '%s | My App',
        default: 'My App',
    },
}
\`\`\`

---

### Environment variables

Store secrets and config in \`.env.local\` (never commit this file):

\`\`\`
DATABASE_URL=postgres://...
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

- Variables without a prefix are server-only — never sent to the browser.
- Variables prefixed with \`NEXT_PUBLIC_\` are exposed to the client bundle.

Access them via \`process.env.VARIABLE_NAME\`.

---

### Common gotchas

- **Server Components can't use hooks** or browser APIs. If you get an error about \`useState\` or \`window\`, add \`'use client'\` to that file.
- **Client Components can import Server Components** as children via \`props.children\`, but cannot import them directly as JSX inside the Client Component file.
- **\`fetch\` deduplication**: Next.js automatically deduplicates identical \`fetch\` calls made during the same render pass — safe to call the same endpoint in multiple components.
- **\`params\` is async in Next.js 15+**: \`params\` and \`searchParams\` props are now Promises. Await them before accessing properties.
- **The \`app/\` and \`pages/\` routers can coexist** during migration, but a route can only be defined in one of them.`,
}
