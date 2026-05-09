'use client'

import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react'

import { Persona } from '@/types/index'
import { PersonaSelectProps } from '@/types/components'

import { personas } from '@/data/ai/personas'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

export default function PersonaSelect({
    theme,
    selectedPersona,
    setSelectedPersona,
}: PersonaSelectProps) {
    const handleChange = (person: Persona) => {
        setSelectedPersona(person)
    }

    return (
        <Listbox value={selectedPersona} onChange={handleChange}>
            <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800/50 dark:text-white dark:outline-white/10 dark:focus-visible:outline-indigo-500">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <img
                            alt=""
                            src={selectedPersona.avatar}
                            className="size-5 shrink-0 rounded-full bg-gray-100 dark:bg-gray-700 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        />
                        <span className="block truncate">
                            {selectedPersona.name}
                        </span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                    {personas.map((person) => (
                        <ListboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:text-white dark:data-focus:bg-indigo-500">
                            <div className="flex items-center">
                                <img
                                    alt=""
                                    src={person.avatar}
                                    className="size-5 shrink-0 rounded-full dark:outline dark:-outline-offset-1 dark:outline-white/10"
                                />
                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                    {person.name}
                                </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white dark:text-indigo-400">
                                <CheckIcon
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
