import { AgentContextDisplayProps } from '@/types/components'

export default function AgentContextDisplay({
    theme,
    file,
    textSelection,
}: AgentContextDisplayProps) {
    return (
        <div>
            <div className="text-xs text-white p-2">
                Temp Debug Block
                <p className="text-xs text-white p-2">
                    <span className="text-blue-400">File: </span>
                    {file.name}
                </p>
                <p className="text-xs text-white p-2">
                    <span className="text-blue-400">Highlighted: </span>
                    {textSelection.content}
                </p>
                <p className="text-xs text-white p-2">
                    <span className="text-blue-400">Lines: </span>
                    {textSelection.isActive &&
                        `${textSelection.start} - ${textSelection.end}`}
                </p>
            </div>
        </div>
    )
}
