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
            ${sora.className} text-${theme}-font-primary 
            bg-${theme}-page p-2
            `}>
            <h1 className={`text-2xl`}>Raisin.IDE</h1>
            <div className="flex gap-5">
                <Link
                    href={path}
                    className={`
                    flex gap-1 items-center
                    border-1 border-${theme}-accent-tertiary
                    rounded-sm bg-none 
                    ${outfit.className} text-xs
                    px-3
                    hover:underline cursor-pointer
                    `}>
                    {linkText}
                </Link>
                <ThemeSelect theme={theme} setTheme={setTheme} />
            </div>
        </div>
    )
}
