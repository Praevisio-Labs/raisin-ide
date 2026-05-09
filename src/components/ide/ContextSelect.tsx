import {
    DocumentMagnifyingGlassIcon,
    EyeSlashIcon,
} from '@heroicons/react/20/solid'
import { ContextSelectProps } from '@/types/components'

export default function ContextSelect({
    theme,
    file,
    textSelection,
    isContextHidden,
    setIsContextHidden,
}: ContextSelectProps) {
    // const [isContextHidden, setIsContextHidden] = useState(false)
    const linesHighlightedCount = textSelection.end - textSelection.start + 1

    return (
        <div
            onClick={() => setIsContextHidden(!isContextHidden)}
            className={`
                items-center 
                flex gap-1 mb-2
                text-${theme}-font-secondary 
                ${isContextHidden ? 'opacity-40' : 'opacity-100'}
                cursor-pointer
            `}>
            <div className={`flex-none`}>
                {isContextHidden ? (
                    <EyeSlashIcon className={`h-4 w-4`} />
                ) : (
                    <DocumentMagnifyingGlassIcon className={`h-4 w-4`} />
                )}
            </div>
            <div className={`flex-1 text-[10px]`}>
                {textSelection.isActive
                    ? `${linesHighlightedCount} lines highlighted`
                    : `${file.name}`}
            </div>
        </div>
    )
}
