import FileIcon from '@/components/FileIcon'
import type { File } from '@/types/index'
import { FileTreeProps } from '@/types/components'

export default function FileTree({ files, selected, onSelect }: FileTreeProps) {
    const baseStyle = `border border-accent-muted bg-card text-font-apex hover:opacity-60`
    const highlightStyle = `border-y-2 border-page -my-px bg-highlight text-card`

    function handleSelect(file: File) {
        onSelect(file)
    }

    return (
        <>
            <div
                className={`
                    flex items-center
                    shrink-0
                    h-9 px-2
                    bg-header
                    uppercase tracking-wider
                    text-[10px] text-font-apex
                `}>
                Explorer
            </div>
            <ul className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1">
                {files.map((file, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelect(file)}
                        className={`
                            flex items-center gap-2
                            text-xs px-2 py-1
                            cursor-pointer
                            ${selected === file ? highlightStyle : baseStyle}
                            `}>
                        <FileIcon fileType={file.fileType} />
                        {file.name}
                    </li>
                ))}
            </ul>
        </>
    )
}
