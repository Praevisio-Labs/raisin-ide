import type { Project } from '@/types/index'

export const personalPortfolio: Project = {
    id: 'personal-portfolio',
    name: 'Personal Portfolio Site',
    description:
        'Design and build a personal portfolio with Next.js — project showcase, about section, and a clean, typed component structure.',
    overview: `## Overview

You'll build a personal portfolio site: a home page with a hero section and project showcase, an about page, and a consistent layout with navigation. The stack is Next.js with TypeScript and Tailwind. The content is yours to fill in — the starter files use placeholder data that you'll replace.

A portfolio is the most personal project you can build, which makes it a surprisingly good learning exercise. Because you care about how it looks and what it says about you, you'll push further on the design and polish than you would on a generic exercise. That extra effort is where a lot of the learning happens.

What makes this project specifically instructive is the component architecture. A portfolio is small enough that you could build it as a single file, but doing that would teach you nothing. The starter files are structured to force you to think about component boundaries: what belongs in a layout, what belongs in a page, what belongs in a reusable component. Getting that structure right is the skill that scales to large applications.`,
    instructions: `## Your Exercise

The starter files give you the layout, the data types, and the page shells. The component implementations and your personal content are left for you to fill in.

**\`lib/data.ts\`** contains your portfolio data — projects, skills, and personal info. It's pre-filled with placeholder content. Replace it with your own information before building the UI. The types are defined here too — read them before touching any component.

**\`app/layout.tsx\`** is complete — it renders the \`<Nav>\` component and wraps all pages. Read it to understand the layout structure.

**\`components/Nav.tsx\`** has the markup but no active link highlighting. You'll need to:
1. Use \`usePathname()\` from \`next/navigation\` to get the current path.
2. Apply an active style to the nav link that matches the current path.

**\`app/page.tsx\`** is the home page. The hero section is in place. You'll need to:
1. Import the \`projects\` array from \`lib/data.ts\` and render a \`<ProjectCard>\` for each one.
2. Implement \`<ProjectCard>\` in \`components/ProjectCard.tsx\` — it should show the project name, description, tech stack tags, and a link.

**\`app/about/page.tsx\`** is the about page shell. You'll need to:
1. Render your bio, skills list, and any other sections you want.
2. The skills data is in \`lib/data.ts\` — import and render it.

Build in this order: fill in your data first (so you have real content to work with), then \`Nav\`, then \`ProjectCard\`, then the about page.`,
    outcomes: `## Learning Outcomes

By the time you finish, you should be able to:

- **Implement** a multi-page Next.js site with a shared layout, typed data layer, and reusable components — and make deliberate decisions about what belongs in each layer.
- **Understand** the Next.js App Router file conventions: how \`layout.tsx\` wraps pages, how \`page.tsx\` maps to a route, and how \`usePathname\` gives client components access to the current route.
- **Recognize** the component decomposition pattern — separating data, layout, and presentation — and apply it to larger projects where the same discipline prevents the codebase from becoming a tangle of one-off components.`,
    skills: ['next', 'tailwind', 'typescript'],
    domains: ['frontend'],
    level: 'Beginner',
    duration: '6 hrs',
    teachers: ['cs-lewis', 'lao-tzu'],
    isReleased: true,
    files: [
        {
            name: 'app/globals.css',
            fileType: 'css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
        },
        {
            name: 'app/layout.tsx',
            fileType: 'typescript',
            content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nav } from '@/components/Nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Personal portfolio site',
}

// This layout wraps all pages. It's complete — no TODOs.
// Read it to understand how Nav is rendered above every page.
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Nav />
                {children}
            </body>
        </html>
    )
}
`,
        },
        {
            name: 'app/page.tsx',
            fileType: 'typescript',
            content: `import { personalInfo, projects } from '@/lib/data'
import { ProjectCard } from '@/components/ProjectCard'

// Home page — the hero section is complete. You'll add the projects grid.
export default function HomePage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            {/* Hero section — complete, no TODOs */}
            <section className="mb-16">
                <h1 className="mb-2 text-4xl font-bold text-gray-900">
                    {personalInfo.name}
                </h1>
                <p className="mb-4 text-xl text-gray-600">{personalInfo.title}</p>
                <p className="max-w-2xl text-gray-700">{personalInfo.bio}</p>
            </section>

            {/* Projects section */}
            <section>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Projects</h2>
                {/* TODO: Render a grid of ProjectCard components.
                    Map over the projects array from lib/data.ts.
                    Use a responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop.
                    Tailwind classes: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
            </section>
        </main>
    )
}
`,
        },
        {
            name: 'app/about/page.tsx',
            fileType: 'typescript',
            content: `import { personalInfo, skills } from '@/lib/data'

// About page — bio is rendered, skills section is a TODO.
export default function AboutPage() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">About</h1>

            {/* Bio section — complete */}
            <section className="mb-12">
                <p className="text-lg leading-relaxed text-gray-700">{personalInfo.bio}</p>
                <div className="mt-6 flex gap-4 text-sm">
                    <a
                        href={\`mailto:\${personalInfo.email}\`}
                        className="text-violet-600 hover:underline"
                    >
                        {personalInfo.email}
                    </a>
                    {personalInfo.github && (
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:underline"
                        >
                            GitHub
                        </a>
                    )}
                    {personalInfo.linkedin && (
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:underline"
                        >
                            LinkedIn
                        </a>
                    )}
                </div>
            </section>

            {/* Skills section */}
            <section>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Skills</h2>
                {/* TODO: Render the skills array.
                    Each skill has a category and an items array.
                    Render each category as a heading with its items below.
                    Style suggestion: category as a small uppercase label,
                    items as a comma-separated list or a row of tags. */}
            </section>
        </main>
    )
}
`,
        },
        {
            name: 'lib/data.ts',
            fileType: 'typescript',
            content: `// Replace this placeholder data with your own information.
// The types here define the shape that the components expect —
// don't change the type structure, just the values.

export type Project = {
    id: string
    name: string
    description: string
    tech: string[]       // e.g. ['React', 'TypeScript', 'Tailwind']
    url?: string         // live URL
    repo?: string        // GitHub URL
}

export type Skill = {
    category: string     // e.g. 'Frontend', 'Backend', 'Tools'
    items: string[]
}

export type PersonalInfo = {
    name: string
    title: string        // e.g. 'Full-Stack Developer'
    bio: string          // 2–3 sentences about yourself
    email: string
    github?: string
    linkedin?: string
}

export const personalInfo: PersonalInfo = {
    name: 'Your Name',
    title: 'Full-Stack Developer',
    bio: 'I build web applications with a focus on clean code and good user experience. ' +
         'Currently learning AI integration and exploring the intersection of design and engineering.',
    email: 'you@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
}

export const projects: Project[] = [
    {
        id: 'project-1',
        name: 'Project One',
        description: 'A brief description of what this project does and what problem it solves.',
        tech: ['Next.js', 'TypeScript', 'Tailwind'],
        url: 'https://example.com',
        repo: 'https://github.com/yourusername/project-one',
    },
    {
        id: 'project-2',
        name: 'Project Two',
        description: 'Another project description. What did you build? What did you learn?',
        tech: ['React', 'Supabase', 'Tailwind'],
        repo: 'https://github.com/yourusername/project-two',
    },
    {
        id: 'project-3',
        name: 'Project Three',
        description: 'A third project. Even a small project is worth including if it taught you something.',
        tech: ['Python', 'FastAPI'],
        repo: 'https://github.com/yourusername/project-three',
    },
]

export const skills: Skill[] = [
    {
        category: 'Frontend',
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
        category: 'Backend',
        items: ['Node.js', 'Python', 'Supabase', 'PostgreSQL'],
    },
    {
        category: 'Tools',
        items: ['Git', 'VS Code', 'Figma', 'Vercel'],
    },
]
`,
        },
        {
            name: 'components/ProjectCard.tsx',
            fileType: 'typescript',
            content: `import type { Project } from '@/lib/data'

type ProjectCardProps = {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    // TODO: Render the project card.
    // It should show:
    //   - project.name as a heading
    //   - project.description as a paragraph
    //   - project.tech as a row of small tags/badges
    //   - Links to project.url (if present) and project.repo (if present)
    //
    // Keep it clean — this card will appear in a grid, so it shouldn't be too tall.
    // A border, subtle shadow, and hover state make it feel polished.

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            {/* TODO: implement the card content */}
        </div>
    )
}
`,
        },
        {
            name: 'components/Nav.tsx',
            fileType: 'typescript',
            content: `'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { personalInfo } from '@/lib/data'

const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
]

export function Nav() {
    // TODO: Call usePathname() to get the current path.
    // Use it to apply an active style to the matching nav link.

    return (
        <nav className="border-b bg-white px-6 py-4">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
                <Link href="/" className="font-semibold text-gray-900">
                    {personalInfo.name}
                </Link>
                <div className="flex gap-6">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={[
                                'text-sm transition-colors',
                                // TODO: Apply 'text-gray-900 font-medium' when pathname === href,
                                // and 'text-gray-500 hover:text-gray-900' otherwise.
                                'text-gray-500 hover:text-gray-900',
                            ].join(' ')}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
`,
        },
    ],
}
