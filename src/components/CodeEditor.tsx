'use client'

import { useState } from 'react'
import type { Language } from '@/types/index'
import { SNIPPETS } from '@/data/snippets'
import Editor from '@monaco-editor/react'

export default function CodeEditor() {
    const [language, setLanguage] = useState<Language>('typescript')
    const [snippet, setSnippet] = useState(SNIPPETS[language])

    function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const lang: Language = e.target.value as Language
        setLanguage(lang)
        setSnippet(SNIPPETS[lang])
    }

    return (
        <div>
            <select value={language} onChange={onSelect}>
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
            </select>
            <Editor height="90vh" value={snippet} language={language} />
        </div>
    )
}
