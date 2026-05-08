'use client'

import { useRef, useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage, isTextUIPart } from 'ai'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { scrollMask } from '@/app/ui/styles'
import { AssistantPanelProps } from '@/types/components'

import RaisinIcon from '@/components/RaisinIcon'
import LoadingIndicator from '@/components/ide/LoadingIndicator'
import Markdown from '@/components/Markdown'

export default function AssistantPanel({
    theme,
    file,
    cursorLine,
    fileContent,
}: AssistantPanelProps) {
    const [input, setInput] = useState('')

    const { messages, sendMessage, status } = useChat({
        messages: [
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
        ] as UIMessage[],
        transport: new DefaultChatTransport({ api: '/api/chat' }),
    })

    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [messages, status])

    const isStreaming = status === 'submitted' || status === 'streaming'
    const lastMessage = messages[messages.length - 1]
    const lastAssistantHasText =
        lastMessage?.role === 'assistant' &&
        lastMessage.parts.some(
            (part) => isTextUIPart(part) && part.text.length > 0,
        )
    const showLoadingIndicator = isStreaming && !lastAssistantHasText

    const userStyle = `max-w-[85%] self-end rounded-sm bg-${theme}-message opacity-90 mt-6`
    const assistantStyle = 'self-start mt-3'

    return (
        <>
            <div
                className={`bg-${theme}-page uppercase tracking-wider text-[10px] text-${theme}-font-primary p-2`}>
                Assistant
            </div>
            <div className="flex-1 items-center flex flex-col overflow-hidden p-2">
                <RaisinIcon
                    className={`flex-none h-8 w-8 text-${theme}-font-primary m-4`}
                />
                <div
                    className="flex-1 w-full overflow-y-auto flex flex-col py-2"
                    style={scrollMask}>
                    {messages.map((msg) => {
                        const textContent = msg.parts
                            .filter(isTextUIPart)
                            .map((part) => part.text)
                            .join('')

                        if (!textContent) return null // prevent first empty msg from rendering

                        if (msg.role === 'user') {
                            return (
                                <div
                                    key={msg.id}
                                    className={`text-xs text-${theme}-font-primary px-2.5 py-1 ${userStyle}`}>
                                    <span>{textContent}</span>
                                </div>
                            )
                        }

                        return (
                            <div
                                key={msg.id}
                                className={`px-2.5 ${assistantStyle}`}>
                                <Markdown
                                    theme={theme}
                                    content={textContent}
                                    size={'xs'}
                                />
                            </div>
                        )
                    })}
                    <LoadingIndicator
                        theme={theme}
                        show={showLoadingIndicator}
                    />
                    <div ref={scrollRef}></div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (input.trim()) {
                            sendMessage(
                                { text: input },
                                {
                                    body: {
                                        fileName: file.name,
                                        fileContent,
                                        cursorLine,
                                    },
                                },
                            )
                            setInput('')
                        }
                    }}
                    className={`flex-none w-[88%] flex rounded-sm overflow-hidden bg-${theme}-input my-4`}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question, I'm here to help..."
                        className={`flex-1 text-xs text-${theme}-font-primary px-2 py-1`}
                    />
                    <button
                        type="submit"
                        disabled={status !== 'ready'}
                        className={`bg-${theme}-accent-primary px-1`}>
                        <ArrowUpCircleIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </>
    )
}
