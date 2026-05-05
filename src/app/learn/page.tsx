'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Dashboard from '@/app/ui/learn/Dashboard'
import Project from '@/app/ui/learn/Project'
import { projectData } from '@/data/modules'

function Page() {
    const [theme, setTheme] = useState('raisin')
    const searchParams = useSearchParams()
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
