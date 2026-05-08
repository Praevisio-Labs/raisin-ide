'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { DEMO_FILES } from '@/data/ide/demo-files'
import { projectData } from '@/data/learn/project-modules'
import Header from '@/components/Header'
import FileTree from '@/components/ide/FileTree'
import CodeEditor from '@/components/ide/CodeEditor'
import AssistantPanel from '@/components/ide/AssistantPanel'

function Page() {
    const [theme, setTheme] = useState('raisin')

    const [cursorLine, setCursorLine] = useState(1)
    const [highlightedText, setHighlightedText] = useState({
        isActive: false,
        content: '',
        start: 0,
        end: 0,
    })

    const searchParams = useSearchParams()
    const moduleID = searchParams.get('module')
    const workspace = moduleID
        ? projectData.find((proj) => proj.id === moduleID)
        : null

    const workspaceFiles = workspace ? workspace.files : DEMO_FILES
    const [selectedFile, setSelectedFile] = useState(workspaceFiles[0])
    const [fileEdits, setFileEdits] = useState<Record<string, string>>({})

    const activeContent = highlightedText.isActive
        ? highlightedText.content
        : (fileEdits[selectedFile.name] ?? selectedFile.content)

    function handleContentChange(content: string) {
        setFileEdits((prev) => ({
            ...prev,
            [selectedFile.name]: content,
        }))
    }

    return (
        <main
            className={`flex flex-col w-full h-screen bg-${theme}-gap overflow-hidden`}>
            <Header
                theme={theme}
                setTheme={setTheme}
                path="/learn"
                linkText="Learn"
            />
            <div className="flex-1 flex gap-1 p-1 overflow-hidden">
                <div
                    className={`flex-1 h-full rounded-sm rounded-bl-xl overflow-hidden bg-${theme}-panel`}>
                    <FileTree
                        files={workspaceFiles}
                        selected={selectedFile}
                        onSelect={setSelectedFile}
                        theme={theme}
                    />
                </div>
                <div
                    className={`flex-4 h-full flex flex-col rounded-sm  overflow-hidden bg-${theme}-editor`}>
                    {/* NTD: remove debug block */}
                    <div className="text-xs text-white p-2">
                        Temp Debug Block
                        <p className="text-xs text-white p-2">
                            <span className="text-blue-400">File: </span>
                            {selectedFile.name}
                        </p>
                        <p className="text-xs text-white p-2">
                            <span className="text-blue-400">Cursor: </span>
                            {cursorLine}
                        </p>
                        <p className="text-xs text-white p-2">
                            <span className="text-blue-400">Highlighted: </span>
                            {highlightedText.content}
                        </p>
                        <p className="text-xs text-white p-2">
                            <span className="text-blue-400">Lines: </span>
                            {highlightedText.isActive &&
                                `${highlightedText.start} - ${highlightedText.end}`}
                        </p>
                    </div>

                    <CodeEditor
                        file={selectedFile}
                        theme={theme}
                        onCursorChange={setCursorLine}
                        onHighlightChange={setHighlightedText}
                        onContentChange={handleContentChange}
                    />
                </div>
                <div
                    className={`flex-3 h-full flex flex-col gap-2 rounded-sm rounded-br-xl overflow-hidden bg-${theme}-panel`}>
                    <AssistantPanel
                        theme={theme}
                        file={selectedFile}
                        cursorLine={cursorLine}
                        fileContent={activeContent}
                    />
                </div>
            </div>
        </main>
    )
}

export default function SuspenseWrapper() {
    return (
        <Suspense fallback={null}>
            <Page />
        </Suspense>
    )
}
