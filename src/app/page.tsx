import { lusitana } from '@/app/ui/fonts'
import CodeEditor from '@/components/CodeEditor'

export default function Home() {
    return (
        <div className="flex flex-col w-screen h-screen m-4">
            <main>
                <h1 className={`${lusitana.className} text-2xl`}>Raisin.IDE</h1>
                <CodeEditor />
            </main>
        </div>
    )
}
