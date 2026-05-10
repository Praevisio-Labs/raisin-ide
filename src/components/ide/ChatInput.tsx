import { ChatInputProps } from '@/types/components'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import ContextSelect from '@/components/ide/ContextSelect'
import ModelSelect from '@/components/ide/ModelSelect'

export default function ChatInput({
    theme,
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
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
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
            <ContextSelect
                theme={theme}
                file={file}
                textSelection={textSelection}
                isContextHidden={isContextHidden}
                setIsContextHidden={setIsContextHidden}
            />
            <ModelSelect
                theme={theme}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
            />
        </form>
    )
}
