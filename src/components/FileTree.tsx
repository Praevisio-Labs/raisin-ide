import FileIcon from '@/components/FileIcon'
import type { File } from '@/types/index'
import { FileTreeProps } from '@/types/components'

export default function FileTree({
    files,
    selected,
    onSelect,
    theme,
}: FileTreeProps) {
    const baseStyle = `border border-${theme}-accent bg-${theme}-card text-${theme}-font hover:opacity-60`
    const highlightStyle = `border-y-2 border-${theme}-gap -my-px bg-${theme}-font text-${theme}-card`

    function handleSelect(file: File) {
        onSelect(file)
    }

    return (
        <>
            <div className={`bg-${theme}-page text-xs text-${theme}-font p-2`}>
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
