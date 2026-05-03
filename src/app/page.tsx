'use client'

import { useState } from 'react'
import { sora } from '@/app/ui/fonts'

import { FILES } from '@/data/files'
import FileTree from '@/components/FileTree'
import CodeEditor from '@/components/CodeEditor'
import AssistantPanel from '@/components/AssistantPanel'
import ThemeSelect from '@/components/ThemeSelect'

export default function Home() {
    const [selected, setSelected] = useState(FILES[0])
    const [theme, setTheme] = useState('raisin')

    return (
        <main
            className={`flex flex-col w-full h-screen bg-${theme}-gap overflow-hidden`}>
            <div className={`flex justify-between bg-${theme}-page p-2`}>
                <h1
                    className={`${sora.className} text-${theme}-font-primary text-2xl`}>
                    Raisin.IDE
                </h1>
                <ThemeSelect theme={theme} setTheme={setTheme} />
            </div>
            <div className="flex-1 flex gap-1 p-1 overflow-hidden">
                <div
                    className={`flex-1 h-full rounded-sm rounded-bl-xl overflow-hidden bg-${theme}-panel`}>
                    <FileTree
                        files={FILES}
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
