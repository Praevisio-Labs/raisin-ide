export const projectData = [
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
        content: 'Learn the basics of...',
    },
    {
        id: 'js',
        name: 'JavaScript',
        content: 'Learn the basics of...',
    },
    {
        id: 'css-3',
        name: 'CSS',
        content: 'Learn the basics of...',
    },
    {
        id: 'next',
        name: 'Next.js',
        content: 'Learn the basics of...',
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
]
