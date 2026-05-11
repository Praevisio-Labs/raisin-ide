import { type UIMessage } from 'ai'

export const defaultMessage = [
    {
        id: 'init',
        role: 'assistant',
        parts: [
            {
                type: 'text',
                text: 'Hi! What are we building today?',
            },
        ],
    },
] as UIMessage[]
