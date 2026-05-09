'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Persona } from '@/types/index'

import { AssistantPanelProps } from '@/types/components'
import { defaultMessage } from '@/data/defaults'
import { personas } from '@/data/ai/personas'

import RaisinIcon from '@/components/RaisinIcon'
import ChatDisplay from '@/components/ide/ChatDisplay'
import ChatInput from '@/components/ide/ChatInput'
import ContextSelect from '@/components/ide/ContextSelect'
import PersonaSelect from '@/components/ide/PersonaSelect'

export default function AssistantPanel({
    theme,
    file,
    cursorLine,
    fileContent,
    textSelection,
    isContextHidden,
    setIsContextHidden,
}: AssistantPanelProps) {
    const [input, setInput] = useState('')
    const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0])

    const { messages, sendMessage, status } = useChat({
        messages: defaultMessage,
        transport: new DefaultChatTransport({ api: '/api/chat' }),
    })

    return (
        <>
            <div
                className={`flex items-center gap-4 h-9 px-2 bg-${theme}-page uppercase tracking-wider text-[10px]`}>
                <span className={`flex-1 text-${theme}-font-primary`}>
                    Assistant
                </span>
                <div className="w-1/2">
                    <PersonaSelect
                        theme={theme}
                        selectedPersona={selectedPersona}
                        setSelectedPersona={setSelectedPersona}
                    />
                </div>
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
                <ChatInput
                    theme={theme}
                    file={file}
                    cursorLine={cursorLine}
                    fileContent={fileContent}
                    isContextHidden={isContextHidden}
                    input={input}
                    setInput={setInput}
                    status={status}
                    sendMessage={sendMessage}
                    selectedPersona={selectedPersona}
                />
                <ContextSelect
                    theme={theme}
                    file={file}
                    textSelection={textSelection}
                    isContextHidden={isContextHidden}
                    setIsContextHidden={setIsContextHidden}
                />
            </div>
        </>
    )
}
