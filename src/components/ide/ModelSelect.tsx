'use client'

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
    selectedModel,
    setSelectedModel,
}: ModelSelectProps) {
    const handleChange = (model: Model) => {
        setSelectedModel(model)
    }

    return (
        <Listbox value={selectedModel} onChange={handleChange}>
            <div className="relative">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm bg-panel/50 py-1 pr-2 pl-3 text-left text-font-paragraph normal-case outline-1 -outline-offset-1 outline-accent-dark text-[10px]">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span className="block truncate">
                            {selectedModel.name}
                        </span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-font-paragraph sm:size-4"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 bottom-full mb-1 max-h-56 min-w-[10rem] right-0 overflow-auto rounded-sm bg-panel py-1 text-[10px] normal-case shadow-lg outline-1 outline-accent-muted data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0">
                    {models.map((model) => (
                        <ListboxOption
                            key={model.modelId}
                            value={model}
                            className="group relative cursor-default py-1 pr-9 pl-3 text-font-paragraph select-none data-focus:bg-accent-muted data-focus:text-font-paragraph data-focus:outline-hidden">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                    <span className="block truncate font-normal group-data-selected:font-semibold">
                                        {model.name}
                                    </span>
                                    <span className="block truncate text-[9px] text-font-paragraph">
                                        {model.description.short}
                                    </span>
                                </div>
                            </div>

                            <span className="absolute top-0 right-0 flex items-start pt-1 pr-4 text-accent-bright group-not-data-selected:hidden group-data-focus:text-font-paragraph">
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
