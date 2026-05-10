'use client'

import { useState } from 'react'
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react'

import { Model } from '@/types/index'
import { ModelSelectProps } from '@/types/components'

import { DEMO_MODELS as models } from '@/data/ai/models'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

export default function ModelSelect({
    theme,
    selectedModel,
    setSelectedModel,
}: ModelSelectProps) {
    const handleChange = (model: Model) => {
        setSelectedModel(model)
    }

    return (
        <Listbox value={selectedModel} onChange={handleChange}>
            <div className="relative">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm bg-white py-1 pr-2 pl-3 text-left text-gray-900 normal-case outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 text-[10px] dark:bg-gray-800/50 dark:text-white dark:outline-white/10 dark:focus-visible:outline-indigo-500">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span className="block truncate">
                            {selectedModel.name}
                        </span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-sm bg-white py-1 text-[10px] normal-case shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                    {models.map((model) => (
                        <ListboxOption
                            key={model.modelId}
                            value={model}
                            className="group relative cursor-default py-1 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:text-white dark:data-focus:bg-indigo-500">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                    <span className="block truncate font-normal group-data-selected:font-semibold">
                                        {model.name}
                                    </span>
                                    <span className="block truncate text-[9px] text-gray-500 dark:text-gray-400">
                                        {model.description.short}
                                    </span>
                                </div>
                            </div>

                            <span className="absolute top-0 right-0 flex items-start pt-1 pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white dark:text-indigo-400">
                                <CheckIcon
                                    aria-hidden="true"
                                    className="size-3"
                                />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
