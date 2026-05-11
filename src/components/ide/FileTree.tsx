import FileIcon from '@/components/FileIcon'
import type { File } from '@/types/index'
import { FileTreeProps } from '@/types/components'

export default function FileTree({ files, selected, onSelect }: FileTreeProps) {
    const baseStyle = `border border-accent-bright bg-highlight text-font-primary hover:opacity-60`
    const highlightStyle = `border-y-2 border-page -my-px bg-font-primary text-highlight`

    function handleSelect(file: File) {
        onSelect(file)
    }

    return (
        <>
            <div
                className={`flex items-center h-9 px-2 bg-header uppercase tracking-wider text-[10px] text-font-primary`}>
                Explorer
            </div>
            <ul className="flex flex-col gap-1">
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
