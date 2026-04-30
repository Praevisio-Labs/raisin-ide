import { AssistantProps } from '@/types/components'
import RaisinIcon from '@/components/RaisinIcon'

const messages = [
    { role: 'assistant', content: 'What are we building today?' },
    { role: 'user', content: 'A disco-themed Tic Tac Toe app.' },
    {
        role: 'assistant',
        content:
            'Love it. Want to start with the board layout or the disco styling?',
    },
    { role: 'user', content: 'Styling first. Think mirror balls and neon.' },
    {
        role: 'assistant',
        content:
            'Got it — neon grid lines, glowing X and O, animated background. Should the board pulse to a beat?',
    },
    { role: 'user', content: 'Yes! Can we add a BPM slider?' },
    {
        role: 'assistant',
        content:
            "Absolutely. I'll wire it to a CSS animation duration variable.",
    },
]

export default function AssistantPanel({ theme }: AssistantProps) {
    const userStyle = 'self-end border rounded-sm opacity-60 font-semibold'
    const assistantStyle = 'self-start'

    return (
        <>
            <div className={`bg-${theme}-page text-xs text-${theme}-font p-2`}>
                Assistant
            </div>
            <div className="flex-1 items-center flex flex-col justify-between p-2">
                <RaisinIcon className={`h-8 w-8 text-${theme}-font m-4`} />
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`
                            text-xs text-${theme}-font p-2
                            ${msg.role === 'user' ? userStyle : assistantStyle}
                            `}>
                        {msg.content}
                    </div>
                ))}
                <div
                    className={`w-[80%] flex rounded-sm overflow-hidden bg-${theme}-editor mb-4`}>
                    <input type="text" className="flex-1" />
                </div>
            </div>
        </>
    )
}
