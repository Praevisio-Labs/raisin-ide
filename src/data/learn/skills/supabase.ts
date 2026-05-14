import type { Skill } from '@/types/index'

export const supabase: Skill = {
    id: 'supabase',
    name: 'Supabase',
    content: `## Supabase Refresher

Supabase is an open-source Firebase alternative built on PostgreSQL. It gives you a hosted database, authentication, file storage, realtime subscriptions, and edge functions — all accessible through a type-safe JavaScript SDK.

---

### Setup

Install the packages:

\`\`\`bash
npm install @supabase/supabase-js @supabase/ssr
\`\`\`

Add your project credentials to \`.env.local\`:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

The \`anon\` key is safe to expose to the browser — it's restricted by Row Level Security policies. Never expose the \`service_role\` key on the client.

---

### Creating clients (Next.js App Router)

In the App Router you need two different clients — one for the browser, one for the server — because they handle cookie-based auth sessions differently.

**Browser client** (use in Client Components):

\`\`\`ts
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
\`\`\`

**Server client** (use in Server Components, Route Handlers, Server Actions):

\`\`\`ts
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                },
            },
        }
    )
}
\`\`\`

---

### Middleware (session refresh)

Add a middleware file to automatically refresh the auth session on every request:

\`\`\`ts
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    await supabase.auth.getUser()
    return response
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
\`\`\`

---

### Authentication

\`\`\`ts
const supabase = createClient()

// Sign up
const { data, error } = await supabase.auth.signUp({
    email: 'user@example.com',
    password: 'password123',
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'password123',
})

// OAuth (Google, GitHub, etc.)
await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: 'https://yourapp.com/auth/callback' },
})

// Sign out
await supabase.auth.signOut()

// Get the current user (server-side — always use getUser(), not getSession())
const { data: { user } } = await supabase.auth.getUser()
\`\`\`

Always use \`getUser()\` on the server to get the authenticated user — it validates the token with Supabase's servers. \`getSession()\` only reads from the cookie and can be spoofed.

---

### Database queries

Supabase wraps PostgreSQL with a chainable query builder. Every query is async and returns \`{ data, error }\`.

\`\`\`ts
const supabase = createClient()

// SELECT
const { data, error } = await supabase
    .from('posts')
    .select('*')

// SELECT specific columns
const { data } = await supabase
    .from('posts')
    .select('id, title, created_at')

// SELECT with a join
const { data } = await supabase
    .from('posts')
    .select('id, title, author:profiles(name, avatar_url)')

// WHERE
const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(10)

// INSERT
const { data, error } = await supabase
    .from('posts')
    .insert({ title: 'Hello', body: 'World', user_id: user.id })
    .select()
    .single()

// UPDATE
const { error } = await supabase
    .from('posts')
    .update({ title: 'Updated title' })
    .eq('id', postId)

// DELETE
const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
\`\`\`

Always check \`error\` before using \`data\`. A successful query with no matching rows returns \`data: []\`, not an error.

---

### Filtering

\`\`\`ts
.eq('status', 'active')          // =
.neq('status', 'deleted')        // !=
.gt('score', 100)                 // >
.gte('score', 100)                // >=
.lt('score', 50)                  // <
.lte('score', 50)                 // <=
.like('name', '%ada%')            // LIKE (case-sensitive)
.ilike('name', '%ada%')           // ILIKE (case-insensitive)
.in('status', ['active', 'pending'])
.is('deleted_at', null)           // IS NULL
.not('deleted_at', 'is', null)    // IS NOT NULL
.contains('tags', ['javascript']) // array contains
\`\`\`

---

### Row Level Security (RLS)

RLS is PostgreSQL's built-in access control. You define policies that determine which rows a user can read, insert, update, or delete. Without RLS enabled, any user with the \`anon\` key can read all rows.

Enable RLS on a table in the Supabase dashboard, then write policies in SQL:

\`\`\`sql
-- Users can only read their own posts
CREATE POLICY "Users can read own posts"
ON posts FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert posts for themselves
CREATE POLICY "Users can insert own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);
\`\`\`

\`auth.uid()\` returns the ID of the currently authenticated user. RLS policies run on every query — even from the SDK.

---

### TypeScript types

Generate types from your database schema using the Supabase CLI:

\`\`\`bash
npx supabase gen types typescript --project-id your-project-id > src/types/database.ts
\`\`\`

Then pass the generated type to \`createClient\`:

\`\`\`ts
import type { Database } from '@/types/database'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
\`\`\`

Now \`.from('posts').select()\` returns fully typed rows — autocomplete, type errors, and all.

---

### Realtime

Subscribe to database changes in real time:

\`\`\`ts
const supabase = createClient()

const channel = supabase
    .channel('posts-changes')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
            console.log('Change received:', payload)
        }
    )
    .subscribe()

// Clean up when done
supabase.removeChannel(channel)
\`\`\`

Events: \`INSERT\`, \`UPDATE\`, \`DELETE\`, or \`*\` for all. In React, set up the subscription in a \`useEffect\` and return the cleanup function.

---

### Storage

\`\`\`ts
const supabase = createClient()

// Upload a file
const { data, error } = await supabase.storage
    .from('avatars')
    .upload(\`\${user.id}/avatar.png\`, file, { upsert: true })

// Get a public URL
const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(\`\${user.id}/avatar.png\`)

// Download a file
const { data, error } = await supabase.storage
    .from('avatars')
    .download(\`\${user.id}/avatar.png\`)

// Delete a file
await supabase.storage
    .from('avatars')
    .remove([\`\${user.id}/avatar.png\`])
\`\`\`

Storage buckets can be public (anyone can read) or private (requires a signed URL). Set bucket policies in the Supabase dashboard.

---

### Common gotchas

- **Always enable RLS** on tables that hold user data. A table without RLS is fully readable by anyone with your \`anon\` key.
- **Use \`getUser()\` not \`getSession()\`** on the server to verify authentication — \`getSession()\` trusts the cookie without re-validating.
- **The \`service_role\` key bypasses RLS** entirely. Never use it in client-side code or expose it in environment variables prefixed with \`NEXT_PUBLIC_\`.
- **Regenerate types after schema changes.** The generated types go stale as soon as you add or rename a column.
- **\`single()\` throws if zero or multiple rows match.** Use \`maybeSingle()\` if the row might not exist — it returns \`null\` instead of an error.`,
}
