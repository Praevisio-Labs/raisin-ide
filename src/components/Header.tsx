import Link from 'next/link'
import { sora, outfit } from '@/app/ui/fonts'
import { HeaderProps } from '@/types/components'
import ThemeSelect from '@/components/ThemeSelect'

export default function Header({
    theme,
    setTheme,
    path,
    linkText,
}: HeaderProps) {
    return (
        <div
            className={`
            flex justify-between
            ${sora.className} text-font-apex
            bg-header p-2
            `}>
            <h1 className={`text-2xl`}>Raisin.IDE</h1>
            <div className="flex gap-5">
                <Link
                    href={path}
                    className={`
                    flex gap-1 items-center px-3
                    border-1 border-ring
                    rounded-sm bg-none 
                    ${outfit.className} text-xs
                    hover:underline hover:bg-button transition 
                    cursor-pointer
                    `}>
                    {linkText}
                </Link>
                <ThemeSelect theme={theme} setTheme={setTheme} />
            </div>
        </div>
    )
}
