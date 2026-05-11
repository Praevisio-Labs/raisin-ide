import type { Teacher } from '@/types/index'

export const teachers: Teacher[] = [
    {
        id: 'lao-tzu',
        name: 'Lao Tzu',
        avatar: '/teachers/lao-tzu.jpg',
        description: {
            short: 'Simplicity and flow',
            long: 'Teaches by reducing problems to their simplest moving parts and helping learners find a natural path through complexity.',
        },
    },
    {
        id: 'nietzsche',
        name: 'F. Nietzsche',
        avatar: '/teachers/nietzsche.jpg',
        description: {
            short: 'Creative challenge',
            long: 'Pushes learners to question defaults, build conviction, and turn discomfort into sharper independent thinking.',
        },
    },
    {
        id: 'kant',
        name: 'Immanuel Kant',
        avatar: '/teachers/kant.jpg',
        description: {
            short: 'Structured reasoning',
            long: 'Emphasizes clear mental models, explicit rules, and careful separation between assumptions and conclusions.',
        },
    },
    {
        id: 'cs-lewis',
        name: 'C.S. Lewis',
        avatar: '/teachers/cs-lewis.jpg',
        description: {
            short: 'Plainspoken clarity',
            long: 'Explains abstract ideas through familiar language, concrete examples, and memorable comparisons.',
        },
    },
    {
        id: 'confucius',
        name: 'Confucius',
        avatar: '/teachers/confucius.jpg',
        description: {
            short: 'Deliberate practice',
            long: 'Turns learning into steady refinement through repetition, reflection, and attention to small improvements over time.',
        },
    },
    {
        id: 'montessori',
        name: 'Maria Montessori',
        avatar: '/teachers/montessori.jpg',
        description: {
            short: 'Hands-on discovery',
            long: 'Creates room for learners to explore, manipulate examples, and form understanding through direct experience.',
        },
    },
    {
        id: 'feynman',
        name: 'Richard Feynman',
        avatar: '/teachers/feynman.jpg',
        description: {
            short: 'Intuitive explanation',
            long: 'Breaks hard ideas into vivid mental pictures, simple language, and testable explanations that reveal whether you really understand.',
        },
    },
]
