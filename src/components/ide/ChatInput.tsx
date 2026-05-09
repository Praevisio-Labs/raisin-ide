import { ChatInputProps } from '@/types/components'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'

export default function ChatInput({
    theme,
    file,
    cursorLine,
    fileContent,
    isContextHidden,
    input,
    setInput,
    status,
    sendMessage,
    selectedPersona,
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
        </form>
    )
}
