import RaisinIcon from '@/components/RaisinIcon'
import { TypingIndicatorProps } from '@/types/components'

export default function LogoIndicator({
    theme,
    status,
    messages,
}: TypingIndicatorProps) {
    const isStreaming = status === 'submitted' || status === 'streaming'
    const lastMessage = messages[messages.length - 1]
    const lastAssistantHasText =
        lastMessage?.role === 'assistant' &&
        lastMessage.parts.some(
            (part) => part.type === 'text' && part.text.length > 0,
        )

    const showTypingIndicator = isStreaming && !lastAssistantHasText

    if (!showTypingIndicator) return null

    return (
        <div className="self-start flex items-center gap-1 px-2 py-1 mt-3">
            <RaisinIcon
                className={`h-3.5 w-3.5 text-${theme}-font-primary animate-bounce`}
                style={{ animationDelay: '0ms' }}
            />
            <RaisinIcon
                className={`h-3.5 w-3.5 text-${theme}-font-primary animate-bounce`}
                style={{ animationDelay: '150ms' }}
            />
            <RaisinIcon
                className={`h-3.5 w-3.5 text-${theme}-font-primary animate-bounce`}
                style={{ animationDelay: '300ms' }}
            />
        </div>
    )
}
