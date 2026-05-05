import type { File } from '@/types/index'

export const DEMO_FILES: File[] = [
    {
        name: 'page.tsx',
        fileType: 'typescript',
        content: `

interface User {
  id: number
  name: string
}

function greet(user: User): string {
  return \`Hello, \${user.name}\`
}

  `.trim(),
    },
    {
        name: 'index.js',
        fileType: 'javascript',
        content: `

const greet = (name) => {
  console.log(\`Hello, \${name}\`)
}

greet("World")

`.trim(),
    },
    {
        name: 'main.py',
        fileType: 'python',
        content: `

def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()

    `.trim(),
    },
    {
        name: 'index.html',
        fileType: 'html',
        content: `

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My First App</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1>Hello, World!</h1>
        <script src="index.js"></script>
    </body>
</html>

        `.trim(),
    },
    {
        name: 'styles.css',
        fileType: 'css',
        content: `

body {
    font-family: system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 2rem;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    font-size: 2rem;
}

        `.trim(),
    },
    {
        name: 'README.md',
        fileType: 'markdown',
        content: `

<br/>

<div id="raisin-logo" align="center">
    <br />
    <img src="./public/brand-slogan.png" alt="Raisin.IDE Logo" width="300"/>
    <h3>Raisin.IDE</h3>
</div>

<div id="tagline" align="center">

<em>Rethinking Coding Education for the AI Era</em>

</div>

> **Live Demo:** https://raisin-ide.vercel.app/

## Overview

Raisin.IDE is a web-based coding environment designed specifically for learners. Unlike professional AI coding tools optimized for task completion, Raisin.IDE focuses on knowledge acquisition and understanding.

## Features

- **Interactive Code Editor** - Syntax highlighting for multiple languages
- **File Tree Navigation** - Organize and browse project files
- **AI Assistant Panel** - Get help and explanations tailored for learning
- **Multi-Language Support** - TypeScript, JavaScript, Python, HTML, CSS, and more

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

\`\`\`bash
git clone https://github.com/yourusername/raisin-ide.git
cd raisin-ide
npm install
\`\`\`

### Running the Application

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Code Editor:** Monaco Editor

## License

MIT

        `.trim(),
    },
]
