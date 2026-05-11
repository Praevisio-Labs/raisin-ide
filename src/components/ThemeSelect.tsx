import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import RaisinIcon from '@/components/RaisinIcon'
import { ThemeProps } from '@/types/components'

export default function ThemeSelect({ theme, setTheme }: ThemeProps) {
    function handleThemeChange(newTheme: string) {
        setTheme(newTheme)
        document.documentElement.dataset.theme = newTheme
    }

    return (
        <div className="flex gap-1 items-center">
            <div
                onClick={() => handleThemeChange('dark')}
                className={`rounded-sm bg-accent-contra px-3 py-2 cursor-pointer ${theme === 'dark' ? 'opacity-100' : 'opacity-40'}`}>
                <MoonIcon className={`h-4 w-4 text-font-apex`} />
            </div>
            <div
                onClick={() => handleThemeChange('raisin')}
                className={`rounded-sm bg-accent-contra px-3 py-2 cursor-pointer ${theme === 'raisin' ? 'opacity-100' : 'opacity-40'}`}>
                <RaisinIcon className={`h-4 w-4 text-font-apex`} />
            </div>
            <div
                onClick={() => handleThemeChange('light')}
                className={`rounded-sm bg-accent-contra px-3 py-2 cursor-pointer ${theme === 'light' ? 'opacity-100' : 'opacity-40'}`}>
                <SunIcon className={`h-4 w-4 text-font-apex`} />
            </div>
        </div>
    )
}
