import { ChatInputProps } from '@/types/components'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import ContextSelect from '@/components/ide/ContextSelect'
import ModelSelect from '@/components/ide/ModelSelect'

export default function ChatInput({
    status,
    input,
    setInput,
    sendMessage,
    file,
    fileContent,
    cursorLine,
    textSelection,
    isContextHidden,
    setIsContextHidden,
    selectedPersona,
    selectedModel,
    setSelectedModel,
}: ChatInputProps) {
    function handleSubmit() {
        if (input.trim()) {
            const body = isContextHidden
                ? { selectedPersona }
                : {
                      fileName: file.name,
                      fileContent,
                      cursorLine,
                      selectedPersona,
                  }
            sendMessage({ text: input }, { body })
            setInput('')
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`
                flex-none w-[88%] flex my-4
                flex flex-col
                rounded-sm
                bg-input
                ring-1 ring-transparent
                focus-within:ring-accent-bright
                transition
            `}>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question, I'm here to help..."
                className={`
                    field-sizing-content
                    max-h-20
                    resize-none outline-none
                    bg-transparent
                    text-xs text-font-paragraph
                    placeholder:text-[10px] placeholder:text-font-paragraph
                    px-2 pt-2 pb-1
                `}
            />
            <div className="flex items-center gap-1.5 px-1.5 pb-1">
                <div className="flex-1 min-w-0">
                    <ContextSelect
                        file={file}
                        textSelection={textSelection}
                        isContextHidden={isContextHidden}
                        setIsContextHidden={setIsContextHidden}
                    />
                </div>
                <ModelSelect
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                />
                <button
                    type="submit"
                    disabled={status !== 'ready'}
                    className={`bg-button px-1 py-0.5 rounded-sm`}>
                    <ArrowUpCircleIcon className="h-4.5 w-4.5" />
                </button>
            </div>
        </form>
    )
}
