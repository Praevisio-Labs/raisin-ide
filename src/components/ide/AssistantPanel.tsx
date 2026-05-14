'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

import { Persona, Model } from '@/types/index'
import { AssistantPanelProps } from '@/types/components'

import { defaultMessage } from '@/data/defaults'
import { personas } from '@/data/ai/personas'
import { DEMO_MODELS as models } from '@/data/ai/models'

import RaisinIcon from '@/components/RaisinIcon'
import ChatDisplay from '@/components/ide/ChatDisplay'
import ChatInput from '@/components/ide/ChatInput'
import PersonaSelect from '@/components/ide/PersonaSelect'
import PersonaDisplay from '@/components/ide/PersonaDisplay'

export default function AssistantPanel({
    file,
    cursorLine,
    fileContent,
    textSelection,
    isContextHidden,
    setIsContextHidden,
}: AssistantPanelProps) {
    const [input, setInput] = useState('')
    const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0])
    const [selectedModel, setSelectedModel] = useState<Model>(models[0])

    const { messages, sendMessage, status } = useChat({
        messages: defaultMessage,
        transport: new DefaultChatTransport({ api: '/api/chat' }),
    })

    return (
        <>
            <div
                className={`
                    flex items-center 
                    shrink-0
                    gap-4 h-9 px-2 
                    bg-header 
                    uppercase tracking-wider text-[10px]
                `}>
                <span className={`flex-1 text-font-apex`}>Assistant</span>
                <div className="w-1/2">
                    <PersonaSelect
                        selectedPersona={selectedPersona}
                        setSelectedPersona={setSelectedPersona}
                    />
                </div>
            </div>
            <div className="flex-1 min-h-0 items-center flex flex-col overflow-hidden p-2">
                <div className="w-full flex gap-10 md:gap-2 self-start md:items-center md:flex-col">
                    <RaisinIcon
                        className={`flex-none size-8 text-font-apex m-4 max-md:hidden`}
                    />
                    <div className="w-1/3 md:hidden">
                        <PersonaSelect
                            selectedPersona={selectedPersona}
                            setSelectedPersona={setSelectedPersona}
                        />
                    </div>
                    <div className="flex-1 min-w-0 text-end md:text-center">
                        <PersonaDisplay selectedPersona={selectedPersona} />
                    </div>
                </div>
                <ChatDisplay messages={messages} status={status} />
                <ChatInput
                    status={status}
                    // user query
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    // dynamic context
                    file={file}
                    fileContent={fileContent}
                    cursorLine={cursorLine}
                    textSelection={textSelection}
                    isContextHidden={isContextHidden}
                    setIsContextHidden={setIsContextHidden}
                    // interactive elements
                    selectedPersona={selectedPersona}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                />
            </div>
        </>
    )
}
