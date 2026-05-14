import type { Skill } from '@/types/index'

export const react: Skill = {
    id: 'react',
    name: 'React.js',
    content: `## React Refresher

React is a JavaScript library for building user interfaces. It lets you describe what the UI should look like at any given moment, and handles the work of updating the DOM when your data changes. The core idea: your UI is a function of your state.

---

### Setup

The standard way to start a React project today is with Next.js (which uses React under the hood) or Vite:

\`\`\`bash
# Next.js (full-stack, file-based routing)
npx create-next-app@latest my-app

# Vite (client-only, faster for pure UI work)
npm create vite@latest my-app -- --template react-ts
\`\`\`

---

### Components

A component is a function that returns JSX. JSX looks like HTML but it's JavaScript — it compiles to \`React.createElement\` calls.

\`\`\`tsx
function Greeting({ name }: { name: string }) {
    return <h1>Hello, {name}</h1>
}

// Use it like an HTML tag
<Greeting name="Ada" />
\`\`\`

Rules:
- Component names must start with a capital letter (lowercase = HTML element).
- A component must return a single root element. Wrap siblings in a \`<div>\` or a Fragment (\`<></>\`).
- JSX attributes use camelCase: \`className\` not \`class\`, \`onClick\` not \`onclick\`.

---

### Props

Props are the inputs to a component — passed from parent to child, read-only inside the child.

\`\`\`tsx
type ButtonProps = {
    label: string
    onClick: () => void
    disabled?: boolean
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}
\`\`\`

The \`children\` prop is special — it's whatever you put between the opening and closing tags:

\`\`\`tsx
function Card({ children }: { children: React.ReactNode }) {
    return <div className="card">{children}</div>
}

// Usage
<Card>
    <p>Some content inside the card.</p>
</Card>
\`\`\`

---

### State with \`useState\`

State is data that belongs to a component and can change over time. When state changes, React re-renders the component.

\`\`\`tsx
import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}
\`\`\`

Key rules:
- Never mutate state directly (\`count++\` won't trigger a re-render). Always call the setter.
- State updates are asynchronous — the new value isn't available until the next render.
- When the new state depends on the old state, use the functional form: \`setCount(prev => prev + 1)\`.

---

### Side effects with \`useEffect\`

\`useEffect\` runs code after the component renders — for fetching data, setting up subscriptions, or syncing with external systems.

\`\`\`tsx
import { useState, useEffect } from 'react'

function UserProfile({ userId }: { userId: string }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Runs after every render where userId changed
        fetch(\`/api/users/\${userId}\`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [userId]) // dependency array — re-run when userId changes

    if (!user) return <p>Loading...</p>
    return <p>{user.name}</p>
}
\`\`\`

The dependency array controls when the effect runs:
- \`[]\` — run once after the first render only (like componentDidMount)
- \`[value]\` — run after any render where \`value\` changed
- No array — run after every render (rarely what you want)

Return a cleanup function to cancel subscriptions or timers:

\`\`\`tsx
useEffect(() => {
    const id = setInterval(() => tick(), 1000)
    return () => clearInterval(id)  // cleanup on unmount or before re-run
}, [])
\`\`\`

---

### Rendering lists

Use \`.map()\` to render arrays. Every item needs a unique \`key\` prop — React uses it to track which items changed.

\`\`\`tsx
const items = ['Apples', 'Bananas', 'Cherries']

function List() {
    return (
        <ul>
            {items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}
\`\`\`

Use a stable, unique ID as the key (database ID, slug, etc.). Avoid using array index as key — it causes bugs when items are reordered or removed.

---

### Conditional rendering

\`\`\`tsx
function Status({ isLoggedIn }: { isLoggedIn: boolean }) {
    // Ternary — good for either/or
    return <p>{isLoggedIn ? 'Welcome back' : 'Please log in'}</p>
}

function Notification({ message }: { message: string | null }) {
    // Short-circuit — good for show/hide
    return <div>{message && <p className="alert">{message}</p>}</div>
}
\`\`\`

---

### Lifting state up

When two sibling components need to share state, move the state to their closest common parent and pass it down as props.

\`\`\`tsx
function Parent() {
    const [value, setValue] = useState('')

    return (
        <>
            <Input value={value} onChange={setValue} />
            <Preview value={value} />
        </>
    )
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return <input value={value} onChange={e => onChange(e.target.value)} />
}

function Preview({ value }: { value: string }) {
    return <p>Preview: {value}</p>
}
\`\`\`

---

### \`useRef\`

\`useRef\` gives you a mutable container that persists across renders without triggering re-renders. Most commonly used to access a DOM element directly.

\`\`\`tsx
import { useRef } from 'react'

function FocusInput() {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={() => inputRef.current?.focus()}>Focus</button>
        </>
    )
}
\`\`\`

Also useful for storing values that need to persist across renders but shouldn't trigger re-renders (like a timer ID or a previous value).

---

### Custom hooks

Extract reusable stateful logic into a custom hook — a function whose name starts with \`use\`.

\`\`\`tsx
function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    })

    const setAndStore = (newValue: T) => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [value, setAndStore] as const
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light')
\`\`\`

---

### Common gotchas

- **Stale closures** — if an effect or event handler captures a state value, it captures the value at the time it was created. Use the functional updater form (\`setState(prev => ...)\`) or add the value to the dependency array.
- **Infinite loops in \`useEffect\`** — if you set state inside an effect without a dependency array (or with a dependency that changes every render), you'll get an infinite loop. Always think carefully about what belongs in the dependency array.
- **Object/array state** — React compares state by reference. \`setItems([...items, newItem])\` creates a new array (triggers re-render). \`items.push(newItem)\` mutates in place (no re-render).
- **Keys on lists** — missing or unstable keys cause subtle bugs with component identity. Always use a stable unique ID.
- **Re-renders are cheap** — don't reach for \`useMemo\` or \`useCallback\` prematurely. Profile first, optimize second.`,
}
