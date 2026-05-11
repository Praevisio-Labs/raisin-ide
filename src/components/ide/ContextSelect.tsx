import {
    DocumentMagnifyingGlassIcon,
    EyeSlashIcon,
} from '@heroicons/react/20/solid'
import { ContextSelectProps } from '@/types/components'

export default function ContextSelect({
    file,
    textSelection,
    isContextHidden,
    setIsContextHidden,
}: ContextSelectProps) {
    const linesHighlightedCount = textSelection.end - textSelection.start + 1

    return (
        <div
            onClick={() => setIsContextHidden(!isContextHidden)}
            className={`
                flex items-center gap-1
                cursor-pointer
                text-[10px]
                text-font-paragraph
                ${isContextHidden ? 'opacity-40' : 'opacity-80'}
            `}>
            {isContextHidden ? (
                <EyeSlashIcon className="h-4 w-4" />
            ) : (
                <DocumentMagnifyingGlassIcon className="h-4 w-4" />
            )}
            {textSelection.isActive
                ? `${linesHighlightedCount} lines highlighted`
                : file.name}
        </div>
    )
}
