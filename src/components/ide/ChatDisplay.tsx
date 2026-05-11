'use client'

import { useRef, useEffect } from 'react'

import { isTextUIPart } from 'ai'
import { ChatDisplayProps } from '@/types/components'
import { scrollMask } from '@/app/ui/styles'

import LoadingIndicator from '@/components/ide/LoadingIndicator'
import Markdown from '@/components/Markdown'

export default function ChatDisplay({ messages, status }: ChatDisplayProps) {
    const isStreaming = status === 'submitted' || status === 'streaming'
    const lastMessage = messages[messages.length - 1]
    const lastAssistantHasText =
        lastMessage?.role === 'assistant' &&
        lastMessage.parts.some(
            (part) => isTextUIPart(part) && part.text.length > 0,
        )
    const showLoadingIndicator = isStreaming && !lastAssistantHasText

    const userStyle = `max-w-[85%] self-end rounded-sm bg-message mt-6`
    const assistantStyle = 'self-start mt-3'

    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [messages, status])

    return (
        <div
            className="flex-1 w-full overflow-y-auto flex flex-col py-2"
            style={scrollMask}>
            {messages.map((msg) => {
                const textContent = msg.parts
                    .filter(isTextUIPart)
                    .map((part) => part.text)
                    .join('')

                if (!textContent.trim()) return null // prevent first empty msg from rendering

            return (
                <div
                    key={msg.id}
                    className={`
                        py-1 px-2.5 
                        text-xs text-font-paragraph 
                        ${ msg.role === 'user' 
                            ? userStyle
                            : assistantStyle }
                    `}>
                    {msg.role === 'user'
                        ? <span>{textContent}</span>
                        : <Markdown content={textContent} size={'xs'} />
                    }
                </div>
            )
            })}
            <LoadingIndicator show={showLoadingIndicator} />
            <div ref={scrollRef}></div>
        </div>
    )
}
