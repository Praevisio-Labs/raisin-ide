import type { Skill } from '@/types/index'

export const javascript: Skill = {
    id: 'js',
    name: 'JavaScript',
    content: `## JavaScript Refresher

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
- \`parseInt('10px')\` returns \`10\` — it stops at the first non-numeric character. Use \`Number('10px')\` if you want \`NaN\` for invalid input.`,
}
