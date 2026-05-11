import { Persona } from '@/types/index'

export const personas: Persona[] = [
    {
        id: 1,
        key: 'socrates',
        name: 'Socrates',
        description: {
            short: 'Guided self-discovery',
            long: 'Asks one focused question at a time to help you find the answer yourself.',
        },
        avatar: '/personas/socrates.jpg',
    },
    {
        id: 2,
        key: 'aristotle',
        name: 'Aristotle',
        description: {
            short: 'Abstract design thinking',
            long: 'Guides you toward the underlying pattern, abstraction, or design principle.',
        },
        avatar: '/personas/aristotle.jpg',
    },
    {
        id: 3,
        key: 'plato',
        name: 'Plato',
        description: {
            short: 'Evidence-first reasoning',
            long: 'Uses examples, outputs, and evidence to reason from what the code actually does.',
        },
        avatar: '/personas/plato.jpg',
    },
    {
        id: 4,
        key: 'epictetus',
        name: 'Epictetus',
        description: {
            short: 'Calm controlled debugging',
            long: 'Keeps debugging calm, brief, and focused on the next thing you can control.',
        },
        avatar: '/personas/epictetus.jpg',
    },
    {
        id: 5,
        key: 'pliny',
        name: 'Pliny the Elder',
        description: {
            short: 'Rich context mapping',
            long: 'Maps the surrounding concepts, options, and references before helping you choose.',
        },
        avatar: '/personas/pliny.jpg',
    },
]
