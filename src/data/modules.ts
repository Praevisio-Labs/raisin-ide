import type { Project } from '@/types/index'

export const projectData: Project[] = [
    {
        id: 'spa-app',
        name: 'Simple SPA App',
        description: 'Build a mini todo list with HTML, JavaScript, and CSS.',
        skills: ['html-5', 'js', 'css-3'],
        files: [
            {
                name: 'index.html',
                fileType: 'html',
                content: `

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Mini Todo</title>
        <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
        <main class="app">
            <h1>Mini Todo</h1>
            <form id="todo-form" class="todo-form">
                <input
                    id="todo-input"
                    class="todo-input"
                    type="text"
                    placeholder="What needs doing?"
                    autocomplete="off"
                />
                <button type="submit" class="todo-add">Add</button>
            </form>
            <ul id="todo-list" class="todo-list"></ul>
        </main>
        <script src="app.js"></script>
    </body>
</html>

    `.trim(),
            },
            // src/data/modules.ts — files array, after index.html
            {
                name: 'app.js',
                fileType: 'javascript',
                content: `

const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('todo-list')

const todos = []

function addTodo(text) {
    // TODO: push a new todo onto the \`todos\` array.
    // Each todo should have a unique \`id\`, the \`text\` from the input,
    // and a \`completed\` boolean (false by default).
}

function removeTodo(id) {
    const index = todos.findIndex((t) => t.id === id)
    if (index >= 0) todos.splice(index, 1)
    render()
}

function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id)
    if (todo) todo.completed = !todo.completed
    render()
}

function render() {
    list.innerHTML = ''
    for (const todo of todos) {
        const li = document.createElement('li')
        li.className = 'todo'
        if (todo.completed) li.classList.add('todo--completed')

        const label = document.createElement('span')
        label.className = 'todo-label'
        label.textContent = todo.text
        label.addEventListener('click', () => toggleTodo(todo.id))

        const remove = document.createElement('button')
        remove.className = 'todo-remove'
        remove.textContent = '\\u00d7'
        // TODO: wire this button so clicking it removes the todo.

        li.appendChild(label)
        li.appendChild(remove)
        list.appendChild(li)
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (!text) return
    addTodo(text)
    input.value = ''
    render()
})

    `.trim(),
            },
            {
                name: 'styles.css',
                fileType: 'css',
                content: `

* {
    box-sizing: border-box;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 2rem;
    background-color: #f5f5f5;
    color: #222;
}

.app {
    max-width: 480px;
    margin: 0 auto;
}

.todo-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.todo-input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

.todo-add {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #5a3a82;
    color: white;
    cursor: pointer;
}

.todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.todo-label {
    cursor: pointer;
}

.todo--completed {
    /* TODO: style completed todos. The label should be visually
       de-emphasized — for example, struck through and faded. */
}

.todo-remove {
    border: none;
    background: transparent;
    font-size: 1.25rem;
    cursor: pointer;
    color: #888;
}

    `.trim(),
            },
        ],
    },
]

export const skillsData = [
    {
        id: 'html-5',
        name: 'HTML',
        content: `
## HTML Refresher

HTML (HyperText Markup Language) is the skeleton of every web page. It describes *structure* — not style or behavior. Browsers parse your HTML into a tree of objects called the **DOM** (Document Object Model), which CSS and JavaScript then read and manipulate.

---

### Document structure

Every HTML file starts with a doctype declaration and a root \`<html>\` element containing two children: \`<head>\` and \`<body>\`.

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Page Title</title>
  </head>
  <body>
    <!-- visible content goes here -->
  </body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` tells the browser to use modern HTML5 parsing rules.
- \`<head>\` holds metadata — things the browser needs but the user doesn't see directly.
- \`<body>\` holds everything that renders on screen.

---

### Elements and attributes

An **element** is an opening tag, optional content, and a closing tag:

\`\`\`html
<p class="intro">Hello, world.</p>
\`\`\`

**Attributes** live inside the opening tag as \`name="value"\` pairs. Common ones:

| Attribute | Purpose |
|-----------|---------|
| \`id\` | Unique identifier — used by CSS and JS to target one element |
| \`class\` | One or more space-separated labels for styling groups of elements |
| \`href\` | Destination URL on \`<a>\` tags |
| \`src\` | Resource URL on \`<img>\`, \`<script>\`, etc. |
| \`type\` | Subtype hint on \`<input>\`, \`<button>\`, \`<script>\` |

Some elements are **void** (self-closing) — they have no content and no closing tag:

\`\`\`html
<input type="text" placeholder="Enter text" />
<img src="photo.jpg" alt="A description" />
<br />
\`\`\`

---

### Semantic elements

Semantic tags communicate *meaning* to browsers, search engines, and screen readers — not just visual layout.

\`\`\`html
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Post Title</h1>
    <p>First paragraph...</p>
  </article>
</main>

<footer>© 2026</footer>
\`\`\`

Prefer semantic elements over generic \`<div>\` and \`<span>\` whenever the element has a clear role. Key ones to know:

- \`<header>\`, \`<footer>\`, \`<main>\`, \`<nav>\`, \`<aside>\` — page regions
- \`<article>\`, \`<section>\` — self-contained or thematic content blocks
- \`<h1>\`–\`<h6>\` — headings in descending importance (use only one \`<h1>\` per page)
- \`<p>\`, \`<ul>\`, \`<ol>\`, \`<li>\` — text and lists
- \`<button>\` — interactive controls (not \`<div onclick>\`)
- \`<label>\` — associates text with a form field

---

### Forms

Forms collect user input and submit it somewhere.

\`\`\`html
<form id="signup" action="/register" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Sign up</button>
</form>
\`\`\`

Key points:

- Pair every \`<input>\` with a \`<label>\` using matching \`for\` / \`id\` values — this is required for accessibility.
- The \`name\` attribute is what gets sent to the server (or read by \`FormData\` in JS).
- \`type="email"\`, \`type="number"\`, etc. give the browser built-in validation and the right mobile keyboard.
- \`required\`, \`minlength\`, \`pattern\` add declarative validation without JavaScript.
- A \`<button type="submit">\` inside a \`<form>\` submits it; \`type="button"\` does not.

---

### Linking resources

\`\`\`html
<!-- stylesheet -->
<link rel="stylesheet" href="styles.css" />

<!-- script — defer keeps it from blocking HTML parsing -->
<script src="app.js" defer></script>

<!-- inline script (avoid for anything non-trivial) -->
<script>
  console.log('hello')
</script>
\`\`\`

Use \`defer\` on external scripts so the browser doesn't pause parsing while it downloads and executes them. \`async\` is an alternative but executes as soon as the file loads, which can cause ordering issues.

---

### Accessibility basics

- Always set \`lang\` on \`<html>\` so screen readers use the right pronunciation.
- Every \`<img>\` needs an \`alt\` attribute — describe the image, or use \`alt=""\` for decorative images.
- Use heading levels in order (\`<h1>\` → \`<h2>\` → \`<h3>\`) — don't skip levels for visual sizing.
- Interactive elements (\`<button>\`, \`<a>\`, \`<input>\`) are keyboard-focusable by default. Don't replace them with \`<div>\` + click handlers.

---

### Quick reference

\`\`\`html
<!-- Headings -->
<h1>Main title</h1>
<h2>Section title</h2>

<!-- Paragraph & inline text -->
<p>Some text with <strong>bold</strong> and <em>italic</em>.</p>

<!-- Link -->
<a href="https://example.com" target="_blank" rel="noopener">Visit</a>

<!-- Image -->
<img src="photo.jpg" alt="Descriptive text" width="400" />

<!-- Unordered list -->
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>

<!-- Generic containers -->
<div class="card">block-level wrapper</div>
<span class="highlight">inline wrapper</span>
\`\`\`
        `.trim(),
    },
    {
        id: 'js',
        name: 'JavaScript',
        content: `
## JavaScript Refresher

JavaScript is the language of the browser. It runs directly in the page, reads and modifies the DOM, responds to user events, and communicates with servers — all without a compile step. It also runs on the server via Node.js, but this refresher focuses on the browser context.

---

### Variables and scope

Prefer \`const\` by default. Use \`let\` when you need to reassign. Avoid \`var\` — it has function scope and hoisting behavior that causes subtle bugs.

\`\`\`js
const name = 'Ada'       // block-scoped, cannot be reassigned
let count = 0            // block-scoped, can be reassigned
count = 1                // ✓

const user = { age: 30 }
user.age = 31            // ✓ — const prevents reassignment, not mutation
\`\`\`

---

### Data types

JavaScript has seven primitive types: \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`bigint\`, and \`symbol\`. Everything else is an **object** (including arrays and functions).

\`\`\`js
typeof 'hello'      // 'string'
typeof 42           // 'number'
typeof true         // 'boolean'
typeof null         // 'object'  ← historical quirk, not a real object
typeof undefined    // 'undefined'
typeof []           // 'object'
typeof {}           // 'object'
typeof function(){} // 'function'
\`\`\`

Use \`===\` (strict equality) instead of \`==\`. Loose equality coerces types in ways that are hard to predict.

---

### Functions

Three common ways to define a function:

\`\`\`js
// Function declaration — hoisted, available before its definition
function greet(name) {
    return \`Hello, \${name}!\`
}

// Function expression — not hoisted
const greet = function(name) {
    return \`Hello, \${name}!\`
}

// Arrow function — concise, and does not bind its own \`this\`
const greet = (name) => \`Hello, \${name}!\`
\`\`\`

Arrow functions with a single expression can omit \`return\` and the curly braces. With multiple statements, you need both:

\`\`\`js
const double = (n) => n * 2                    // implicit return
const add = (a, b) => { return a + b }         // explicit return
\`\`\`

---

### Arrays

Arrays are ordered lists. The most useful methods:

\`\`\`js
const nums = [1, 2, 3, 4, 5]

nums.push(6)                        // add to end → [1,2,3,4,5,6]
nums.pop()                          // remove from end → [1,2,3,4,5]
nums.splice(1, 2)                   // remove 2 items at index 1 → [1,4,5]

// Non-mutating — return a new array
nums.map((n) => n * 2)              // [2,4,6,8,10]
nums.filter((n) => n % 2 === 0)     // [2,4]
nums.find((n) => n > 3)             // 4
nums.findIndex((n) => n > 3)        // 3
nums.some((n) => n > 4)             // true
nums.every((n) => n > 0)            // true
nums.reduce((acc, n) => acc + n, 0) // 15
\`\`\`

Prefer the non-mutating methods (\`map\`, \`filter\`, \`reduce\`) when you don't need to change the original array.

---

### Objects

Objects are key-value stores. Keys are strings (or symbols); values can be anything.

\`\`\`js
const user = {
    id: 1,
    name: 'Ada',
    active: true,
}

// Access
user.name          // 'Ada'
user['name']       // 'Ada' — useful when the key is dynamic

// Destructuring
const { name, active } = user

// Spread — shallow copy or merge
const updated = { ...user, active: false }

// Shorthand property names
const name = 'Ada'
const age = 30
const person = { name, age }  // same as { name: name, age: age }
\`\`\`

---

### Control flow

\`\`\`js
// if / else
if (count > 0) {
    console.log('has items')
} else {
    console.log('empty')
}

// Ternary — good for simple inline conditions
const label = count > 0 ? 'has items' : 'empty'

// Optional chaining — safely access nested properties
const city = user?.address?.city   // undefined instead of throwing

// Nullish coalescing — fallback only for null/undefined (not 0 or '')
const display = user.name ?? 'Anonymous'
\`\`\`

---

### Loops

\`\`\`js
const items = ['a', 'b', 'c']

// for...of — cleanest way to iterate an array
for (const item of items) {
    console.log(item)
}

// forEach — same idea, callback style
items.forEach((item, index) => {
    console.log(index, item)
})

// for...in — iterates object keys (not recommended for arrays)
const obj = { x: 1, y: 2 }
for (const key in obj) {
    console.log(key, obj[key])
}
\`\`\`

---

### DOM interaction

The browser exposes the page as the \`document\` object. Common operations:

\`\`\`js
// Select elements
const btn = document.getElementById('submit')
const items = document.querySelectorAll('.todo-item')  // NodeList

// Read and write content
btn.textContent = 'Save'
btn.innerHTML = '<strong>Save</strong>'  // use sparingly — XSS risk

// Classes
btn.classList.add('active')
btn.classList.remove('active')
btn.classList.toggle('active')
btn.classList.contains('active')  // true / false

// Attributes
btn.setAttribute('disabled', '')
btn.removeAttribute('disabled')

// Create and insert elements
const li = document.createElement('li')
li.textContent = 'New item'
document.querySelector('ul').appendChild(li)
\`\`\`

---

### Events

\`\`\`js
const btn = document.getElementById('submit')

btn.addEventListener('click', (event) => {
    console.log('clicked', event.target)
})

// Prevent default browser behavior (e.g. form submission, link navigation)
form.addEventListener('submit', (event) => {
    event.preventDefault()
    // handle submission manually
})

// Event delegation — listen on a parent, check the target
list.addEventListener('click', (event) => {
    if (event.target.matches('.todo-remove')) {
        removeTodo(event.target.dataset.id)
    }
})
\`\`\`

---

### Async JavaScript

JavaScript is single-threaded. Async operations (network requests, timers) use callbacks, Promises, or \`async\`/\`await\`.

\`\`\`js
// Promise chain
fetch('/api/users')
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err))

// async/await — same thing, cleaner syntax
async function loadUsers() {
    try {
        const res = await fetch('/api/users')
        const data = await res.json()
        console.log(data)
    } catch (err) {
        console.error(err)
    }
}
\`\`\`

\`await\` can only be used inside an \`async\` function (or at the top level of a module). An \`async\` function always returns a Promise.

---

### Modules

Modern JavaScript uses ES modules to split code across files.

\`\`\`js
// math.js
export function add(a, b) { return a + b }
export const PI = 3.14159

// main.js
import { add, PI } from './math.js'
import * as math from './math.js'   // namespace import

// Default export (one per file)
export default function greet(name) { return \`Hi, \${name}\` }
import greet from './greet.js'
\`\`\`

---

### Common gotchas

- \`this\` inside an arrow function refers to the enclosing scope, not the element that triggered an event. Use a regular function when you need \`event.target\` or \`this\` to refer to the DOM node.
- \`0\`, \`''\`, \`null\`, \`undefined\`, \`NaN\`, and \`false\` are all **falsy**. Everything else is truthy.
- Arrays and objects are compared by reference, not value: \`[] === []\` is \`false\`.
- \`parseInt('10px')\` returns \`10\` — it stops at the first non-numeric character. Use \`Number('10px')\` if you want \`NaN\` for invalid input.
        `.trim(),
    },
    {
        id: 'css-3',
        name: 'CSS',
        content: `
## CSS Refresher

CSS (Cascading Style Sheets) controls the visual presentation of HTML. It describes *how* elements look — their size, color, spacing, layout, and more. The "cascading" part means multiple rules can apply to the same element, and the browser resolves conflicts using specificity and source order.

---

### How CSS is applied

\`\`\`html
<!-- External stylesheet (preferred) -->
<link rel="stylesheet" href="styles.css" />

<!-- Inline styles (avoid — hard to override and maintain) -->
<p style="color: red;">Hello</p>
\`\`\`

In an external stylesheet, rules follow this structure:

\`\`\`css
selector {
    property: value;
    property: value;
}
\`\`\`

---

### Selectors

\`\`\`css
/* Element */
p { color: #333; }

/* Class — reusable, most common */
.card { border-radius: 8px; }

/* ID — unique per page, high specificity */
#header { background: #fff; }

/* Descendant — any .label inside a .todo */
.todo .label { font-weight: bold; }

/* Direct child */
.todo > button { margin-left: auto; }

/* Pseudo-class — element state */
button:hover { opacity: 0.8; }
input:focus { outline: 2px solid #5a3a82; }
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }
li:nth-child(2n) { background: #f9f9f9; }

/* Pseudo-element — virtual sub-element */
p::first-line { font-weight: bold; }
.required::after { content: ' *'; color: red; }

/* Attribute */
input[type="checkbox"] { width: 1rem; }
a[target="_blank"]::after { content: ' ↗'; }
\`\`\`

---

### The cascade and specificity

When multiple rules target the same element and property, the browser picks the winner using **specificity** — a score based on selector type:

| Selector type | Specificity |
|---------------|-------------|
| Inline style | Highest |
| ID (\`#id\`) | High |
| Class, pseudo-class, attribute | Medium |
| Element, pseudo-element | Low |

More specific rules win regardless of source order. Equal-specificity rules are resolved by whichever appears last in the stylesheet.

\`\`\`css
p { color: black; }           /* specificity: 0,0,1 */
.intro { color: blue; }       /* specificity: 0,1,0 — wins over p */
#hero { color: red; }         /* specificity: 1,0,0 — wins over .intro */
\`\`\`

Avoid \`!important\` — it breaks the cascade and makes debugging painful.

---

### The box model

Every element is a rectangular box made of four layers, from inside out:

1. **Content** — the text or child elements
2. **Padding** — space between content and border
3. **Border** — the element's edge
4. **Margin** — space outside the border, between elements

\`\`\`css
.card {
    padding: 1rem;           /* all four sides */
    padding: 0.5rem 1rem;    /* top/bottom  left/right */
    border: 1px solid #eee;
    margin-bottom: 1rem;
}
\`\`\`

By default, \`width\` and \`height\` apply to the content box only — padding and border add to the total size. Fix this globally with:

\`\`\`css
*, *::before, *::after {
    box-sizing: border-box;
}
\`\`\`

With \`border-box\`, \`width: 200px\` means the total rendered width is 200px, padding and border included.

---

### Units

| Unit | What it's relative to |
|------|----------------------|
| \`px\` | Fixed pixels |
| \`%\` | Parent element's dimension |
| \`em\` | Current element's \`font-size\` |
| \`rem\` | Root element's \`font-size\` (usually 16px) |
| \`vw\` / \`vh\` | 1% of viewport width / height |
| \`ch\` | Width of the "0" character in the current font |

Prefer \`rem\` for font sizes and spacing — it scales predictably when users change their browser's base font size. Use \`px\` for borders and fine details that shouldn't scale.

---

### Flexbox

Flexbox is the go-to tool for one-dimensional layouts (a row or a column).

\`\`\`css
.container {
    display: flex;
    flex-direction: row;        /* row (default) | column */
    justify-content: space-between; /* main axis alignment */
    align-items: center;        /* cross axis alignment */
    gap: 1rem;                  /* space between children */
    flex-wrap: wrap;            /* allow children to wrap */
}

.child {
    flex: 1;          /* grow and shrink equally, share available space */
    flex: 0 0 200px;  /* don't grow, don't shrink, fixed 200px basis */
}
\`\`\`

Key \`justify-content\` values: \`flex-start\`, \`flex-end\`, \`center\`, \`space-between\`, \`space-around\`.  
Key \`align-items\` values: \`flex-start\`, \`flex-end\`, \`center\`, \`stretch\` (default), \`baseline\`.

---

### Grid

Grid is for two-dimensional layouts — rows *and* columns at the same time.

\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    grid-template-columns: 200px 1fr 1fr;   /* fixed + flexible */
    gap: 1.5rem;
}

/* Place an item explicitly */
.featured {
    grid-column: 1 / 3;   /* span from line 1 to line 3 */
    grid-row: 1 / 2;
}
\`\`\`

\`fr\` is a fractional unit — \`1fr\` means "one share of the remaining space." \`repeat(auto-fill, minmax(200px, 1fr))\` creates a responsive grid that adds columns as space allows.

---

### Positioning

\`\`\`css
/* Default — follows normal document flow */
.box { position: static; }

/* Offset from its normal position, still occupies space */
.box { position: relative; top: 10px; left: 20px; }

/* Removed from flow, positioned relative to nearest non-static ancestor */
.tooltip { position: absolute; top: 0; right: 0; }

/* Stays in place as the page scrolls */
.navbar { position: fixed; top: 0; width: 100%; }

/* Like fixed, but relative to its scroll container */
.sticky-header { position: sticky; top: 0; }
\`\`\`

\`absolute\` positioning is relative to the nearest ancestor with \`position: relative\` (or \`absolute\`/\`fixed\`). If none exists, it's relative to the viewport.

---

### Typography

\`\`\`css
body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 1rem;       /* 16px by default */
    line-height: 1.5;      /* unitless — relative to font-size */
    color: #222;
}

h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

p {
    max-width: 65ch;       /* ~65 characters — comfortable reading width */
}

.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
\`\`\`

---

### Colors

\`\`\`css
color: #5a3a82;              /* hex */
color: rgb(90, 58, 130);     /* rgb */
color: hsl(270, 38%, 37%);   /* hsl — often easiest to reason about */
color: oklch(45% 0.12 290);  /* oklch — perceptually uniform, modern */

/* Transparency */
color: rgb(90 58 130 / 0.5);
color: hsl(270 38% 37% / 50%);
\`\`\`

---

### Custom properties (CSS variables)

\`\`\`css
:root {
    --color-primary: #5a3a82;
    --color-text: #222;
    --spacing-md: 1rem;
    --radius: 4px;
}

.button {
    background-color: var(--color-primary);
    padding: var(--spacing-md);
    border-radius: var(--radius);
}

/* Override in a local scope */
.card {
    --spacing-md: 1.5rem;
}
\`\`\`

Custom properties cascade and inherit like any other property. They're the foundation of theming — swap values on \`:root\` and the whole UI updates.

---

### Responsive design

\`\`\`css
/* Mobile-first: base styles apply to all sizes */
.container {
    padding: 1rem;
}

/* Enhance for larger screens */
@media (min-width: 640px) {
    .container {
        padding: 2rem;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
}

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
}
\`\`\`

---

### Common gotchas

- **Margin collapse**: vertical margins between adjacent block elements merge into one. The larger margin wins. Padding and borders prevent collapse.
- **\`z-index\` only works** on elements with a \`position\` other than \`static\` (or with certain other properties like \`opacity < 1\`).
- **Percentage heights** require the parent to have an explicit height. Use \`min-height: 100vh\` on \`body\` instead of \`height: 100%\` chains.
- **Flexbox and Grid children** ignore \`float\` and \`vertical-align\` — those are for older layout models.
- **\`display: none\`** removes the element from layout entirely. \`visibility: hidden\` hides it but keeps its space. \`opacity: 0\` makes it invisible but still interactive.
        `.trim(),
    },
    {
        id: 'next',
        name: 'Next.js',
        content: `
## Next.js Refresher

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
- **The \`app/\` and \`pages/\` routers can coexist** during migration, but a route can only be defined in one of them.
        `.trim(),
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        content: `
## Tailwind CSS Refresher

Tailwind is a utility-first CSS framework. Instead of writing custom CSS classes, you compose styles directly in your markup using small, single-purpose utility classes. There's no stylesheet to maintain — Tailwind scans your files at build time and generates only the CSS you actually use.

---

### How it works

\`\`\`tsx
// Traditional approach — write a class, then style it in CSS
<button class="btn-primary">Save</button>

// Tailwind approach — compose utilities directly
<button class="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-800">
    Save
</button>
\`\`\`

The tradeoff: HTML gets more verbose, but you never context-switch to a stylesheet, and there are no naming decisions to make.

---

### Spacing and sizing

Tailwind uses a numeric scale where each step is \`4px\` (by default \`1 = 4px\`, \`2 = 8px\`, \`4 = 16px\`, etc.).

\`\`\`html
<!-- Padding -->
<div class="p-4">        <!-- padding: 1rem on all sides -->
<div class="px-4 py-2">  <!-- horizontal: 1rem, vertical: 0.5rem -->
<div class="pt-2 pb-4">  <!-- top: 0.5rem, bottom: 1rem -->

<!-- Margin -->
<div class="m-4">
<div class="mx-auto">    <!-- center horizontally -->
<div class="mt-8 mb-4">

<!-- Width and height -->
<div class="w-full">     <!-- width: 100% -->
<div class="w-64">       <!-- width: 16rem -->
<div class="w-1/2">      <!-- width: 50% -->
<div class="max-w-xl">   <!-- max-width: 36rem -->
<div class="h-screen">   <!-- height: 100vh -->
\`\`\`

---

### Typography

\`\`\`html
<p class="text-sm">       <!-- font-size: 0.875rem -->
<p class="text-base">     <!-- font-size: 1rem -->
<p class="text-xl">       <!-- font-size: 1.25rem -->
<p class="text-3xl">      <!-- font-size: 1.875rem -->

<p class="font-normal">   <!-- font-weight: 400 -->
<p class="font-medium">   <!-- font-weight: 500 -->
<p class="font-semibold"> <!-- font-weight: 600 -->
<p class="font-bold">     <!-- font-weight: 700 -->

<p class="leading-tight"> <!-- line-height: 1.25 -->
<p class="leading-relaxed"><!-- line-height: 1.625 -->

<p class="tracking-tight"><!-- letter-spacing: -0.025em -->
<p class="tracking-wide"> <!-- letter-spacing: 0.025em -->

<p class="text-center">
<p class="uppercase">
<p class="truncate">      <!-- overflow: hidden + text-overflow: ellipsis -->
\`\`\`

---

### Colors

Tailwind ships a full color palette. Each color has shades from \`50\` (lightest) to \`950\` (darkest).

\`\`\`html
<!-- Text color -->
<p class="text-gray-700">
<p class="text-violet-600">

<!-- Background color -->
<div class="bg-white">
<div class="bg-slate-100">
<div class="bg-violet-700">

<!-- Border color -->
<div class="border border-gray-200">
<div class="border-2 border-violet-500">

<!-- Opacity modifier — works on any color utility -->
<div class="bg-black/50">   <!-- background: rgb(0 0 0 / 0.5) -->
<p class="text-gray-900/80">
\`\`\`

---

### Flexbox and Grid

\`\`\`html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
<div class="flex flex-col gap-2">
<div class="flex flex-wrap">
<div class="flex-1">         <!-- flex: 1 1 0% -->
<div class="shrink-0">       <!-- flex-shrink: 0 -->

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div class="col-span-2">     <!-- grid-column: span 2 -->
\`\`\`

---

### Borders and shadows

\`\`\`html
<div class="border">              <!-- 1px solid border -->
<div class="border-2">            <!-- 2px solid border -->
<div class="border-t">            <!-- top border only -->
<div class="rounded">             <!-- border-radius: 0.25rem -->
<div class="rounded-lg">          <!-- border-radius: 0.5rem -->
<div class="rounded-full">        <!-- border-radius: 9999px — pill/circle -->

<div class="shadow">              <!-- small box shadow -->
<div class="shadow-md">
<div class="shadow-lg">
<div class="shadow-none">
\`\`\`

---

### Responsive design

Tailwind is mobile-first. Unprefixed utilities apply at all screen sizes. Prefix with a breakpoint to apply at that size and above:

| Prefix | Min-width |
|--------|-----------|
| \`sm:\` | 640px |
| \`md:\` | 768px |
| \`lg:\` | 1024px |
| \`xl:\` | 1280px |
| \`2xl:\` | 1536px |

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div class="hidden md:block">   <!-- hidden on mobile, visible on md+ -->
<div class="block md:hidden">   <!-- visible on mobile, hidden on md+ -->
\`\`\`

---

### State variants

\`\`\`html
<!-- Hover, focus, active -->
<button class="bg-violet-700 hover:bg-violet-800 active:bg-violet-900">
<input class="border focus:outline-none focus:ring-2 focus:ring-violet-500">

<!-- Focus-visible — keyboard focus only, not mouse click -->
<button class="focus-visible:ring-2 focus-visible:ring-violet-500">

<!-- Disabled -->
<button class="disabled:opacity-50 disabled:cursor-not-allowed">

<!-- Group hover — style a child when the parent is hovered -->
<div class="group">
    <p class="text-gray-500 group-hover:text-gray-900">...</p>
</div>

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
\`\`\`

---

### Arbitrary values

When the built-in scale doesn't have what you need, use square bracket notation to drop in any value:

\`\`\`html
<div class="w-[340px]">
<div class="top-[117px]">
<div class="bg-[#5a3a82]">
<div class="grid-cols-[1fr_2fr_1fr]">
<p class="text-[13px] leading-[1.4]">
\`\`\`

---

### The \`@apply\` directive

If you need to reuse a combination of utilities in CSS (e.g. for a component library or third-party HTML you can't control), use \`@apply\` in your stylesheet:

\`\`\`css
.btn-primary {
    @apply px-4 py-2 bg-violet-700 text-white rounded font-medium hover:bg-violet-800;
}
\`\`\`

Use this sparingly — it defeats some of the benefits of utility-first. Prefer extracting a React/HTML component instead.

---

### Customizing the theme

Extend or override Tailwind's defaults in \`tailwind.config.ts\`:

\`\`\`ts
import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#5a3a82',
                    light: '#7c5aa8',
                    dark: '#3d2659',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
} satisfies Config
\`\`\`

Custom values become first-class utilities: \`bg-brand\`, \`text-brand-light\`, \`font-sans\`, \`rounded-4xl\`.

---

### Common gotchas

- **Dynamic class names don't work.** Tailwind scans source files for complete class strings at build time. \`\`text-\${color}-500\`\` won't be included in the output — always use full class names like \`text-red-500\`.
- **Specificity is flat.** All utilities have the same specificity (one class), so source order in the generated stylesheet determines which wins when two utilities conflict. Use a single utility per property per element.
- **\`prose\` for rich text.** The \`@tailwindcss/typography\` plugin adds a \`prose\` class that styles raw HTML (from a CMS or markdown renderer) without you having to target every element manually.
- **Don't purge \`node_modules\`.** The \`content\` array in your config should point to your source files only — scanning \`node_modules\` slows the build significantly.
        `.trim(),
    },
    {
        id: 'git',
        name: 'Git',
        content: `
## Git Refresher

Git is a distributed version control system. It tracks changes to your files over time, lets you branch off to experiment without affecting the main codebase, and makes it possible to collaborate with others without overwriting each other's work.

---

### Core concepts

- **Repository (repo)** — a directory Git is tracking, containing your files and the full history of every change.
- **Commit** — a snapshot of your files at a point in time. Each commit has a unique hash, an author, a timestamp, and a message.
- **Branch** — a lightweight pointer to a commit. Creating a branch lets you diverge from the main line of development without touching it.
- **Remote** — a version of the repo hosted elsewhere (GitHub, GitLab, etc.). \`origin\` is the conventional name for the primary remote.
- **Working tree** — the files you see on disk, in their current state.
- **Staging area (index)** — a holding area where you assemble the next commit. You choose exactly which changes to include.

---

### Initial setup

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Initialize a new repo in the current directory
git init

# Clone an existing repo
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder  # clone into a named folder
\`\`\`

---

### The basic workflow

\`\`\`bash
# 1. Check what's changed
git status

# 2. Stage changes
git add file.txt           # stage a specific file
git add src/               # stage a directory
git add .                  # stage everything in the working tree

# 3. Commit
git commit -m "Add login form validation"

# 4. Push to the remote
git push origin main
\`\`\`

Write commit messages in the imperative mood: "Fix bug" not "Fixed bug" or "Fixes bug." Keep the subject line under 72 characters.

---

### Viewing history

\`\`\`bash
git log                        # full log
git log --oneline              # compact — one commit per line
git log --oneline --graph      # with branch/merge visualization
git log --oneline -10          # last 10 commits

git show abc1234               # show a specific commit's diff
git diff                       # unstaged changes vs last commit
git diff --staged              # staged changes vs last commit
git diff main..feature-branch  # diff between two branches
\`\`\`

---

### Branching

\`\`\`bash
git branch                     # list local branches
git branch -a                  # list local and remote branches

git branch feature/login       # create a branch
git switch feature/login       # switch to it
git switch -c feature/login    # create and switch in one step

git branch -d feature/login    # delete a merged branch
git branch -D feature/login    # force-delete (even if unmerged)
\`\`\`

---

### Merging and rebasing

**Merge** — joins two branches by creating a merge commit. Preserves the full history of both branches.

\`\`\`bash
git switch main
git merge feature/login        # merge feature into main
\`\`\`

**Rebase** — replays your branch's commits on top of another branch. Produces a linear history, but rewrites commit hashes.

\`\`\`bash
git switch feature/login
git rebase main                # replay feature commits on top of main
\`\`\`

Use merge for integrating finished work into a shared branch. Use rebase to keep a feature branch up to date with \`main\` before opening a pull request. Never rebase commits that have already been pushed to a shared remote.

---

### Resolving conflicts

A conflict occurs when two branches change the same lines differently. Git marks the conflict in the file:

\`\`\`
<<<<<<< HEAD
const greeting = 'Hello'
=======
const greeting = 'Hi'
>>>>>>> feature/login
\`\`\`

To resolve:
1. Edit the file to keep the version you want (remove the markers).
2. Stage the resolved file: \`git add file.txt\`
3. Complete the merge: \`git commit\`

---

### Undoing things

\`\`\`bash
# Unstage a file (keep changes in working tree)
git restore --staged file.txt

# Discard changes in the working tree (irreversible)
git restore file.txt

# Amend the last commit message or add a forgotten file
git add forgotten.txt
git commit --amend --no-edit   # keep the same message

# Undo a commit by creating a new "reverse" commit (safe for shared branches)
git revert abc1234

# Move HEAD back N commits, keeping changes staged
git reset --soft HEAD~1

# Move HEAD back N commits, keeping changes unstaged
git reset HEAD~1

# Move HEAD back N commits, discarding changes entirely (destructive)
git reset --hard HEAD~1
\`\`\`

Prefer \`revert\` over \`reset\` on any branch others are working on. \`reset --hard\` is destructive — the discarded commits are gone.

---

### Working with remotes

\`\`\`bash
git remote -v                          # list remotes
git remote add origin <url>            # add a remote

git fetch origin                       # download remote changes, don't merge
git pull origin main                   # fetch + merge
git pull --rebase origin main          # fetch + rebase (cleaner history)

git push origin feature/login          # push a branch
git push -u origin feature/login       # push and set upstream tracking
git push --force-with-lease            # safer force push — fails if remote has new commits
\`\`\`

---

### Stashing

Stash saves your uncommitted changes temporarily so you can switch context without committing half-done work.

\`\`\`bash
git stash                    # stash working tree and staged changes
git stash push -m "WIP: form validation"  # stash with a description

git stash list               # see all stashes
git stash pop                # apply the most recent stash and remove it
git stash apply stash@{1}    # apply a specific stash, keep it in the list
git stash drop stash@{1}     # delete a specific stash
\`\`\`

---

### Useful everyday commands

\`\`\`bash
# See which branch you're on and what's staged/unstaged
git status

# Interactively stage chunks of a file (not the whole file)
git add -p file.txt

# Find which commit introduced a bug using binary search
git bisect start
git bisect bad                 # current commit is broken
git bisect good abc1234        # this commit was fine

# Show who last changed each line of a file
git blame file.txt

# Search commit messages
git log --oneline --grep="login"

# Search code changes across history
git log -S "functionName" --oneline
\`\`\`

---

### \`.gitignore\`

List files and patterns Git should never track. Common entries:

\`\`\`
# Dependencies
node_modules/

# Build output
.next/
dist/
build/

# Environment files
.env
.env.local
.env*.local

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
\`\`\`

Once a file is already tracked, adding it to \`.gitignore\` won't stop Git from watching it. You need to untrack it first:

\`\`\`bash
git rm --cached file.txt
\`\`\`

---

### Common gotchas

- **Committing secrets** — if you accidentally commit a secret (API key, password), assume it's compromised. Remove it from history with \`git filter-repo\` and rotate the credential immediately.
- **Detached HEAD** — happens when you check out a specific commit instead of a branch. Any commits you make won't belong to a branch and can be lost. Run \`git switch -c new-branch\` to save your work.
- **\`git pull\` creates merge commits** — use \`git pull --rebase\` to keep history linear, or configure it as the default: \`git config --global pull.rebase true\`.
- **Large files** — Git stores the full content of every version of every file. Don't commit large binaries or build artifacts. Use Git LFS for assets that must be versioned.
        `.trim(),
    },
    {
        id: 'open-ai',
        name: 'OpenAI API',
        content: 'Learn the basics of...',
    },
    {
        id: 'supabase',
        name: 'Supabase',
        content: 'Learn the basics of...',
    },
    {
        id: 'ai-sdk',
        name: 'Vercel AI SDK',
        content: 'Learn the basics of...',
    },
    {
        id: 'aws-development',
        name: 'AWS IAM, CLI, SDK',
        content: 'Learn the basics of devloping with AWS...',
    },
    {
        id: 'bedrock',
        name: 'AWS Bedrock',
        content: 'Learn the basics of RAG and AI...',
    },
]
