import Editor, { OnMount } from '@monaco-editor/react'
import { EditorProps } from '@/types/components'

export default function CodeEditor({
    file,
    theme,
    onCursorChange,
    onSelectionChange,
}: EditorProps) {
    const editorTheme = theme == 'light' ? 'vs' : 'vs-dark'

    // note shape: (editor: IStandaloneCodeEditor, monaco: Monaco)
    const handleMount: OnMount = (editor) => {
        editor.onDidChangeCursorPosition((e) => {
            if (onCursorChange) {
                onCursorChange(e.position.lineNumber)
            }
        })
        editor.onDidChangeCursorSelection((e) => {
            if (!e.selection.isEmpty()) {
                const model = editor.getModel()
                if (!model) return
                const selection = model.getValueInRange(e.selection)
                if (onSelectionChange) {
                    onSelectionChange(selection)
                }
            }
        })
    }

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
                    onMount={handleMount}
                    options={{
                        padding: { top: 16 },
                    }}
                />
            </div>
        </>
    )
}
