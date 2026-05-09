import {
    DocumentMagnifyingGlassIcon,
    EyeSlashIcon,
} from '@heroicons/react/20/solid'
import { PersonaSelectProps } from '@/types/components'
import TailwindSampleDropdown from '@/components/ide/TailwindSampleDropdown'

export default function PersonaSelect({
    theme,
    selectedPersona,
    setSelectedPersona,
}: PersonaSelectProps) {
    return (
        <div>
            <TailwindSampleDropdown />
        </div>
    )
}
