'use client'

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { ClipLoader } from "react-spinners"

const LoadingModal = () => {
    return (
        <Transition.Root show as={Fragment} >
            <Dialog as="div" className="relative z-50" onClose={() => { }} >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Dialog.Panel >
                            <ClipLoader size={40} color="#0284c7" />
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default LoadingModal