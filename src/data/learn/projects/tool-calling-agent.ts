import type { Project } from '@/types/index'

export const toolCallingAgent: Project = {
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
}
