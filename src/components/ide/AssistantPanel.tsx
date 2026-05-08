'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import { AssistantPanelProps } from '@/types/components'
import { defaultMessage } from '@/data/placeholder'

import RaisinIcon from '@/components/RaisinIcon'
import ChatDisplay from '@/components/ide/ChatDisplay'

export default function AssistantPanel({
    theme,
    file,
    cursorLine,
    fileContent,
}: AssistantPanelProps) {
    const [input, setInput] = useState('')

    const { messages, sendMessage, status } = useChat({
        messages: defaultMessage,
        transport: new DefaultChatTransport({ api: '/api/chat' }),
    })

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
                <ChatDisplay
                    theme={theme}
                    messages={messages}
                    status={status}
                />
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
