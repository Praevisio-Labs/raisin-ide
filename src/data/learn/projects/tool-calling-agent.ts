import type { Project } from '@/types/index'

export const toolCallingAgent: Project = {
    id: 'tool-calling-agent',
    name: 'Tool-Calling Agent',
    description:
        'Build an AI agent that uses the Vercel AI SDK tool system to call real functions, validate results, and complete multi-step tasks.',
    overview: '',
    instructions: '',
    outcomes: '',
    skills: ['next', 'ai-sdk', 'open-ai'],
    domains: ['ai', 'agents'],
    level: 'Advanced',
    duration: '10 hrs',
    teachers: ['nietzsche', 'kant', 'lao-tzu'],
    comingSoon: true,
    files: [],
}
