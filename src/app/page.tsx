'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { DEMO_FILES } from '@/data/ide/demo-files'
import { projectData } from '@/data/learn/projects'
import Header from '@/components/Header'
import FileTree from '@/components/ide/FileTree'
import CodeEditor from '@/components/ide/CodeEditor'
import AssistantPanel from '@/components/ide/AssistantPanel'
import CollapsiblePanel from '@/components/ide/CollapsiblePanel'

function Page() {
    const [theme, setTheme] = useState('raisin')
    const [isContextHidden, setIsContextHidden] = useState(false)
    const [isFileTreeOpen, setIsFileTreeOpen] = useState(false)
    const [isAssistantPanelOpen, setIsAssistantPanelOpen] = useState(false)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

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
            className={`
                w-full h-dvh 
                overflow-hidden bg-page 
                flex flex-col 
            `}>
            {/* Page Header */}
            <Header
                theme={theme}
                setTheme={setTheme}
                path="/learn"
                linkText="Learn"
            />
            {/* Wrapper */}
            <div
                className={`
                    flex-1 
                    min-h-0 gap-1 p-1 
                    overflow-hidden
                    flex flex-col md:flex-row 
                `}>
                {/* File Tree */}
                <CollapsiblePanel
                    title="Explorer"
                    isOpen={isFileTreeOpen}
                    onToggle={() => setIsFileTreeOpen(!isFileTreeOpen)}
                    className={`
                        order-1 
                        rounded-sm md:rounded-bl-lg
                        overflow-hidden bg-panel
                        flex-none md:h-full md:flex-1
                        ${isFileTreeOpen ? 'max-md:h-1/8' : ''}
                    `}>
                    <FileTree
                        files={workspaceFiles}
                        selected={selectedFile}
                        onSelect={setSelectedFile}
                    />
                </CollapsiblePanel>
                {/* Monaco Editor */}
                <div
                    className={`
                        order-2 
                        flex-1 md:flex-[4_4_0%]
                        max-md:min-h-3/8 md:h-full md:min-h-0
                        overflow-hidden rounded-sm bg-editor
                        flex flex-col
                    `}>
                    <CodeEditor
                        file={selectedFile}
                        theme={theme}
                        onCursorChange={setCursorLine}
                        onHighlightChange={setHighlightedText}
                        onContentChange={handleContentChange}
                    />
                </div>
                {/* Assistant Panel */}
                <CollapsiblePanel
                    title="Assistant"
                    isOpen={isAssistantPanelOpen}
                    onToggle={() =>
                        setIsAssistantPanelOpen(!isAssistantPanelOpen)
                    }
                    className={`
                        order-3
                        rounded-sm md:rounded-br-lg
                        overflow-hidden bg-panel
                        flex-none md:h-full md:flex-[3_3_0%]
                        ${isAssistantPanelOpen ? 'max-md:h-4/8' : ''}
                        
                    `}>
                    <AssistantPanel
                        file={selectedFile}
                        cursorLine={cursorLine}
                        fileContent={activeContent}
                        textSelection={highlightedText}
                        isContextHidden={isContextHidden}
                        setIsContextHidden={setIsContextHidden}
                    />
                </CollapsiblePanel>
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
