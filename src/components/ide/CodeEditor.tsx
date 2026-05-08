import Editor, { OnMount } from '@monaco-editor/react'
import { EditorProps } from '@/types/components'

export default function CodeEditor({
    file,
    theme,
    onCursorChange,
    onHighlightChange,
    onContentChange,
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
            const model = editor.getModel()

            if (!model) return
            const isEmpty = e.selection.isEmpty()

            if (onHighlightChange) {
                onHighlightChange({
                    isActive: !isEmpty,
                    content: isEmpty ? '' : model.getValueInRange(e.selection),
                    start: isEmpty ? 0 : e.selection.startLineNumber,
                    end: isEmpty ? 0 : e.selection.endLineNumber,
                })
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
                    path={file.name}
                    defaultValue={file.content}
                    defaultLanguage={file.fileType}
                    className="overflow-hidden"
                    theme={editorTheme}
                    // [Signature] onMount?: (editor: IStandaloneCodeEditor, monaco: Monaco) => void
                    onMount={handleMount}
                    // [Signature] onChange?: (value: string | undefined, event: IModelContentChangedEvent) => void
                    onChange={(value) => {
                        if (onContentChange) {
                            onContentChange(value ?? '')
                        }
                    }}
                    options={{
                        padding: { top: 16 },
                    }}
                />
            </div>
        </>
    )
}
