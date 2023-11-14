// For demo purposes only to easily toggle through your contract's functions
import React, { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { BoxConfig } from '../lib/types/BoxConfig';

export default function SelectFunction({
  signatures,
  selectedSig,
  setSelectedSig
}: {
  signatures: BoxConfig[], 
  selectedSig: BoxConfig, 
  setSelectedSig: React.Dispatch<React.SetStateAction<any>>
}) {

  return (
    <div className="w-64">
      <Listbox value={selectedSig} onChange={setSelectedSig}>
        <Listbox.Button className="w-full border border-gray-300 rounded-md p-2 text-left flex justify-between items-center">
          {selectedSig.name}
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Listbox.Button>
        <Listbox.Options className="w-full mt-1 border border-gray-300 rounded-md overflow-auto max-h-60">
          {signatures.map((sig) => (
            <Listbox.Option key={sig.id} value={sig} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                >
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <CheckIcon className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                    </span>
                  )}
                  {sig.name}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}