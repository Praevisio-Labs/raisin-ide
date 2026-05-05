'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { DEMO_FILES } from '@/data/demo-files'
import { projectData } from '@/data/project-modules'
import Header from '@/components/Header'
import FileTree from '@/components/ide/FileTree'
import CodeEditor from '@/components/ide/CodeEditor'
import AssistantPanel from '@/components/ide/AssistantPanel'

function Page() {
    const searchParams = useSearchParams()
    const moduleID = searchParams.get('module')

    const workspace = moduleID
        ? projectData.find((proj) => proj.id === moduleID)
        : null
    const workspaceFiles = workspace ? workspace.files : DEMO_FILES

    const [selected, setSelected] = useState(workspaceFiles[0])
    const [theme, setTheme] = useState('raisin')

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
                        selected={selected}
                        onSelect={setSelected}
                        theme={theme}
                    />
                </div>
                <div
                    className={`flex-4 h-full flex flex-col rounded-sm  overflow-hidden bg-${theme}-editor`}>
                    <CodeEditor file={selected} theme={theme} />
                </div>
                <div
                    className={`flex-3 h-full flex flex-col gap-2 rounded-sm rounded-br-xl overflow-hidden bg-${theme}-panel`}>
                    <AssistantPanel theme={theme} />
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
