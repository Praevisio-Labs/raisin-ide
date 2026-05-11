import type { Project } from '@/types/index'

export const projectData: Project[] = [
    {
        id: 'spa-app',
        name: 'Simple SPA App',
        description: 'Build a mini todo list with HTML, JavaScript, and CSS.',
        overview: `## Overview

You'll build a working todo list app from scratch using vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no libraries. The result is a single-page app where users can add tasks, mark them complete, and remove them.

This is the foundation project for web development. Every modern framework — React, Vue, Svelte — is built on top of the same primitives you'll use here: the DOM, event listeners, and CSS selectors. Understanding what the browser actually does before you reach for a framework is what separates someone who *uses* React from someone who *understands* what React is solving.`,
        instructions: `## Your Exercise

The starter files give you a working scaffold with deliberate gaps to fill in.

**\`index.html\`** is complete — it defines the page structure (form, input, list) and links the stylesheet and script. Read it first to understand the IDs and class names the JavaScript and CSS will hook into.

**\`app.js\`** is partially wired. Form submission, render loop, and toggle/remove logic are in place, but the \`addTodo\` function is empty and the remove button has no click handler. You'll need to:
1. Implement \`addTodo(text)\` so it pushes a new todo object onto the \`todos\` array. Each todo needs a unique \`id\`, the \`text\`, and a \`completed\` boolean (default false).
2. Wire the remove button inside \`render()\` so clicking it calls \`removeTodo(todo.id)\`.

**\`styles.css\`** styles the form, list, and individual todos, but the \`.todo--completed\` rule is empty. Add styles that visually de-emphasize completed todos — strikethrough text and reduced opacity work well, but the design choice is yours.

Build in this order: HTML first (already done — just read it), then JavaScript (so the app actually works), then CSS (polish the completed state). Open the page in a browser tab and refresh as you go — there's no build step, just save and reload.`,
        outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement:** wire DOM events to JavaScript handlers without a framework, mutate application state in response to user input, and re-render a list from that state.
- **Understand:** why frameworks exist — the manual \`render()\` loop you wrote here is what React's reconciler automates, and the \`todos\` array is what \`useState\` wraps.
- **Recognize:** the same three-part pattern (markup structure, style rules, behavior wiring) in every web app you encounter, from a marketing landing page to a full SPA.`,
        skills: ['html-5', 'js', 'css-3'],
        domains: ['frontend'],
        level: 'Beginner',
        duration: '2.5 hrs',
        teachers: ['lao-tzu', 'cs-lewis'],
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
    {
        id: 'react-component-library',
        name: 'React Component Library',
        description:
            'Design and document a reusable component system with typed props, examples, and shared visual patterns.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['react', 'typescript', 'storybook'],
        domains: ['frontend'],
        level: 'Intermediate',
        duration: '8 hrs',
        teachers: ['montessori'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'interactive-dashboard',
        name: 'Interactive Dashboard',
        description:
            'Build a responsive analytics dashboard with charts, filters, and data-driven interface states.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['react', 'd3', 'tailwind'],
        domains: ['frontend', 'data'],
        level: 'Intermediate',
        duration: '10 hrs',
        teachers: ['feynman', 'cs-lewis', 'lao-tzu'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'animation-playground',
        name: 'Animation Playground',
        description:
            'Explore motion principles by building interactive UI experiments with transitions, gestures, and staged reveals.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['react', 'framer-motion'],
        domains: ['frontend'],
        level: 'Beginner',
        duration: '6 hrs',
        teachers: ['nietzsche', 'montessori'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'rest-api-with-auth',
        name: 'REST API with Auth',
        description:
            'Create a secure API with routes, authentication middleware, database persistence, and protected resources.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['node', 'express', 'postgres'],
        domains: ['backend', 'security'],
        level: 'Intermediate',
        duration: '12 hrs',
        teachers: ['kant', 'confucius'],
        comingSoon: true,
        files: [],
    },
    // {
    //     id: 'real-time-chat-server',
    //     name: 'Real-time Chat Server',
    //     description:
    //         'Build a websocket-powered chat backend with rooms, presence, event broadcasting, and connection lifecycle handling.',
    //     overview: '',
    //     instructions: '',
    //     outcomes: '',
    //     skills: ['node', 'websockets'],
    //     domains: ['backend'],
    //     level: 'Intermediate',
    //     duration: '9 hrs',
    //     teachers: ['feynman', 'lao-tzu'],
    //     comingSoon: true,
    //     files: [],
    // },
    // {
    //     id: 'graphql-gateway',
    //     name: 'GraphQL Gateway',
    //     description:
    //         'Design a GraphQL layer that combines backend services behind a typed schema and predictable resolver patterns.',
    //     overview: '',
    //     instructions: '',
    //     outcomes: '',
    //     skills: ['node', 'graphql'],
    //     domains: ['backend'],
    //     level: 'Advanced',
    //     duration: '11 hrs',
    //     teachers: ['kant', 'cs-lewis'],
    //     comingSoon: true,
    //     files: [],
    // },
    {
        id: 'saas-starter',
        name: 'SaaS Starter',
        description:
            'Assemble the core pieces of a subscription-ready SaaS app with routing, data models, billing, and account flows.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['next', 'prisma', 'stripe'],
        domains: ['full-stack'],
        level: 'Advanced',
        duration: '16 hrs',
        teachers: ['confucius', 'kant'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'collab-whiteboard',
        name: 'Collab Whiteboard',
        description:
            'Build a shared drawing surface with real-time updates, optimistic interaction, and persistent collaboration state.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['next', 'websockets', 'redis'],
        domains: ['full-stack'],
        level: 'Advanced',
        duration: '14 hrs',
        teachers: ['montessori', 'feynman', 'nietzsche'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'e-commerce-storefront',
        name: 'E-commerce Storefront',
        description:
            'Create a polished storefront with product pages, cart state, checkout handoff, and responsive merchandising UI.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['next', 'stripe', 'tailwind'],
        domains: ['full-stack'],
        level: 'Intermediate',
        duration: '13 hrs',
        teachers: ['cs-lewis', 'lao-tzu'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'rag-chatbot',
        name: 'RAG Chatbot',
        description:
            'Build a retrieval-augmented assistant that indexes documents, searches context, and grounds generated answers.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['python', 'langchain', 'pinecone'],
        domains: ['ai', 'rag', 'agents'],
        level: 'Intermediate',
        duration: '12 hrs',
        teachers: ['feynman'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'tool-calling-agent',
        name: 'Tool-Calling Agent',
        description:
            'Create an agent that plans tool use, validates intermediate results, and responds with grounded task progress.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['python', 'openai'],
        domains: ['ai', 'agents', 'tool-calling'],
        level: 'Advanced',
        duration: '10 hrs',
        teachers: ['nietzsche', 'kant', 'lao-tzu'],
        comingSoon: true,
        files: [],
    },
    {
        id: 'evals-harness',
        name: 'Evals Harness',
        description:
            'Design repeatable tests for AI outputs with datasets, scoring rubrics, regression checks, and reporting loops.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['python', 'pytest'],
        domains: ['ai', 'testing'],
        level: 'Intermediate',
        duration: '7 hrs',
        teachers: ['confucius', 'feynman'],
        comingSoon: true,
        files: [],
    },
    // {
    //     id: 'ci-cd-pipeline',
    //     name: 'CI/CD Pipeline',
    //     description:
    //         'Automate checks, builds, image creation, and deploy steps with a practical delivery pipeline.',
    //     overview: '',
    //     instructions: '',
    //     outcomes: '',
    //     skills: ['github-actions', 'docker'],
    //     domains: ['devops'],
    //     level: 'Beginner',
    //     duration: '6 hrs',
    //     teachers: ['confucius', 'cs-lewis'],
    //     comingSoon: true,
    //     files: [],
    // },
    {
        id: 'container-orchestration',
        name: 'Container Orchestration',
        description:
            'Learn how containers are scheduled, scaled, configured, and observed across a small distributed system.',
        overview: '',
        instructions: '',
        outcomes: '',
        skills: ['docker', 'kubernetes'],
        domains: ['devops'],
        level: 'Advanced',
        duration: '15 hrs',
        teachers: ['kant', 'lao-tzu', 'feynman'],
        comingSoon: true,
        files: [],
    },
]
