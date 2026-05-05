'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { scrollMask } from '@/app/ui/styles'
import { AssistantProps } from '@/types/components'

import RaisinIcon from '@/app/ui/RaisinIcon'
import TypingIndicator from '@/components/TypingIndicator'

export default function AssistantPanel({ theme }: AssistantProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! What are we building today?' },
    ])

    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [messages, isLoading])

    const userStyle = `max-w-[85%] self-end rounded-sm bg-${theme}-message opacity-90 mt-6`
    const assistantStyle = 'self-start mt-3'

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!query) return
        setIsLoading(true)

        const userQuery = {
            role: 'user',
            content: query.trim(),
        }
        setMessages((prev) => [
            ...prev,
            userQuery, //
        ])

        setQuery('')
        appendMockResponse()
    }

    function appendMockResponse() {
        setTimeout(() => {
            const assistantResponse = {
                role: 'assistant',
                content:
                    'Great question. But the endpoint is not live. Check back soon!',
            }
            setMessages((prev) => [
                ...prev,
                assistantResponse, //
            ])
            setIsLoading(false)
        }, 2800)
    }

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
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`
                            text-xs text-${theme}-font-primary px-2.5 py-1
                            ${msg.role === 'user' ? userStyle : assistantStyle}
                            `}>
                            {msg.content}
                        </div>
                    ))}
                    {isLoading && <TypingIndicator theme={theme} />}
                    <div ref={scrollRef}></div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={`flex-none w-[88%] flex rounded-sm overflow-hidden bg-${theme}-input my-4`}>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Ask a question, I'm here to help..."
                        className={`flex-1 text-xs text-${theme}-font-primary px-2 py-1`}
                    />
                    <button className={`bg-${theme}-accent-primary px-1`}>
                        <ArrowUpCircleIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </>
    )
}
