import Editor from '@monaco-editor/react'
import { EditorProps } from '@/types/components'

export default function CodeEditor({ file, theme }: EditorProps) {
    const editorTheme = theme == 'light' ? 'vs' : 'vs-dark'

    return (
        <>
            <div className={`bg-${theme}-page text-xs text-${theme}-font p-2`}>
                {file.name}
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
