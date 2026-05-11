'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Dashboard from '@/components/learn/Dashboard'
import Project from '@/components/learn/Project'
import { projectData } from '@/data/learn/project-modules'

function Page() {
    const [theme, setTheme] = useState('raisin')
    const searchParams = useSearchParams()

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])
    const router = useRouter()
    const moduleID = searchParams.get('module')
    const project = moduleID
        ? projectData.find((proj) => proj.id === moduleID)
        : null

    return project ? (
        <Project
            theme={theme}
            setTheme={setTheme}
            project={project}
            onClick={() => router.push(`/?module=${project.id}`)}
        />
    ) : (
        <Dashboard
            theme={theme}
            setTheme={setTheme}
            onClick={(id) => router.push(`/learn/?module=${id}`)}
        />
    )
}

export default function SuspenseWrapper() {
    return (
        <Suspense fallback={null}>
            <Page />
        </Suspense>
    )
}
