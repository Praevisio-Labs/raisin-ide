import Editor from '@monaco-editor/react'
import { EditorProps } from '@/types/components'

export default function CodeEditor({ file, theme }: EditorProps) {
    const editorTheme = theme == 'light' ? 'vs' : 'vs-dark'

    return (
        <>
            <div
                className={`bg-${theme}-page uppercase tracking-wider text-[10px] text-${theme}-font-primary p-2`}>
                Files
                <span className="normal-case tracking-normal text-[11px] opacity-60">
                    {' > '}
                </span>
                <span className="normal-case tracking-normal text-[11px] opacity-80">
                    {file.name}
                </span>
            </div>
            <div className="flex-1 min-h-0">
                <Editor
                    height="100%"
                    value={file.content}
                    language={file.fileType}
                    className="overflow-hidden"
                    theme={editorTheme}
                    options={{
                        padding: { top: 16 },
                    }}
                />
            </div>
        </>
    )
}
