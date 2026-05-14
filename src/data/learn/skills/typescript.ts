import type { Skill } from '@/types/index'

export const typescript: Skill = {
    id: 'ts',
    name: 'TypeScript',
    content: `## TypeScript Refresher

TypeScript is JavaScript with a type system layered on top. It compiles to plain JavaScript — the types exist only at development time. The payoff: your editor catches mistakes before you run the code, and your codebase becomes self-documenting.

---

### Setup

TypeScript is included by default in Next.js and Vite React templates. For a standalone project:

\`\`\`bash
npm install --save-dev typescript
npx tsc --init  # generates tsconfig.json
\`\`\`

Key \`tsconfig.json\` options to know:

\`\`\`json
{
    "compilerOptions": {
        "strict": true,          // enables all strict checks — always use this
        "target": "ES2020",      // which JS version to compile to
        "module": "ESNext",      // module system
        "moduleResolution": "bundler",
        "jsx": "react-jsx",      // for React projects
        "paths": {
            "@/*": ["./src/*"]   // path aliases
        }
    }
}
\`\`\`

---

### Basic types

\`\`\`ts
// Primitives
const name: string = 'Ada'
const age: number = 30
const active: boolean = true

// Arrays
const scores: number[] = [95, 87, 92]
const tags: Array<string> = ['react', 'typescript']

// Tuple — fixed-length array with known types at each position
const point: [number, number] = [10, 20]

// Union — one of several types
let id: string | number = 'abc-123'
id = 42  // also valid

// Literal types — only specific values allowed
type Direction = 'north' | 'south' | 'east' | 'west'
type StatusCode = 200 | 400 | 404 | 500
\`\`\`

---

### Type aliases and interfaces

Both describe the shape of an object. Use \`type\` for most things; use \`interface\` when you need declaration merging or are defining a class contract.

\`\`\`ts
// Type alias
type User = {
    id: string
    name: string
    email: string
    role: 'admin' | 'member'
    createdAt?: Date  // optional property
}

// Interface (equivalent for objects)
interface Product {
    id: string
    name: string
    price: number
}

// Extending
type AdminUser = User & { permissions: string[] }

interface DigitalProduct extends Product {
    downloadUrl: string
}
\`\`\`

---

### Functions

\`\`\`ts
// Parameter and return types
function add(a: number, b: number): number {
    return a + b
}

// Arrow function
const multiply = (a: number, b: number): number => a * b

// Optional and default parameters
function greet(name: string, greeting: string = 'Hello'): string {
    return \`\${greeting}, \${name}\`
}

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0)
}

// Function type
type Handler = (event: MouseEvent) => void
\`\`\`

---

### Generics

Generics let you write reusable code that works with multiple types while preserving type information.

\`\`\`ts
// Generic function
function first<T>(arr: T[]): T | undefined {
    return arr[0]
}

const firstNumber = first([1, 2, 3])   // type: number | undefined
const firstString = first(['a', 'b'])  // type: string | undefined

// Generic type
type ApiResponse<T> = {
    data: T
    error: string | null
    status: number
}

type UserResponse = ApiResponse<User>
// { data: User, error: string | null, status: number }

// Constrained generics
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}
\`\`\`

---

### Utility types

TypeScript ships with built-in utility types that transform existing types:

\`\`\`ts
type User = {
    id: string
    name: string
    email: string
    password: string
}

// Partial — all properties optional
type UserUpdate = Partial<User>

// Required — all properties required (opposite of Partial)
type StrictUser = Required<User>

// Pick — keep only specified properties
type PublicUser = Pick<User, 'id' | 'name'>

// Omit — remove specified properties
type SafeUser = Omit<User, 'password'>

// Readonly — prevent mutation
type ImmutableUser = Readonly<User>

// Record — map keys to a value type
type RoleMap = Record<'admin' | 'member' | 'guest', string[]>

// ReturnType — extract the return type of a function
function getUser() { return { id: '1', name: 'Ada' } }
type UserShape = ReturnType<typeof getUser>
\`\`\`

---

### Type narrowing

TypeScript tracks what you know about a type inside conditional branches.

\`\`\`ts
function processInput(input: string | number) {
    if (typeof input === 'string') {
        // TypeScript knows input is string here
        return input.toUpperCase()
    }
    // TypeScript knows input is number here
    return input.toFixed(2)
}

// Narrowing with discriminated unions
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2
        case 'rect':
            return shape.width * shape.height
    }
}
\`\`\`

---

### \`as\`, \`satisfies\`, and \`!\`

\`\`\`ts
// Type assertion — you're telling TypeScript "trust me, I know the type"
const canvas = document.getElementById('canvas') as HTMLCanvasElement

// Non-null assertion — tells TypeScript the value is not null/undefined
const el = document.getElementById('root')!

// satisfies — validates a value matches a type without widening it
const config = {
    port: 3000,
    host: 'localhost',
} satisfies Record<string, string | number>
// config.port is still typed as number (not string | number)
\`\`\`

Use \`as\` and \`!\` sparingly — they bypass the type checker. Prefer narrowing with \`if\` checks.

---

### TypeScript with React

\`\`\`tsx
// Typing component props
type CardProps = {
    title: string
    children: React.ReactNode
    onClick?: () => void
}

function Card({ title, children, onClick }: CardProps) {
    return (
        <div onClick={onClick}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}

// Typing useState
const [user, setUser] = useState<User | null>(null)

// Typing event handlers
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
}

// Typing useRef
const inputRef = useRef<HTMLInputElement>(null)
\`\`\`

---

### Common gotchas

- **\`any\` defeats the purpose** — using \`any\` turns off type checking for that value. Use \`unknown\` instead when you genuinely don't know the type, then narrow it before use.
- **Type assertions don't validate at runtime** — \`as User\` doesn't check that the value actually is a \`User\`. If you're parsing external data (API responses, JSON), use a validation library like Zod.
- **\`interface\` vs \`type\`** — they're mostly interchangeable for objects. The practical difference: interfaces can be extended with \`extends\` and support declaration merging; type aliases can express unions and intersections more naturally.
- **Enums have quirks** — TypeScript enums compile to objects with runtime overhead. Prefer union types (\`'north' | 'south'\`) or \`as const\` objects for most cases.
- **\`strict: true\` is non-negotiable** — without it, TypeScript misses a large class of bugs (null checks, implicit any, etc.). Always enable it.`,
}
