import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";

import IconClose from "../../modules/icons/IconClose";


interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    size?: "small" | "medium" | "large" | "extra" | "full";
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({
    children,
    isOpen,
    setIsOpen,
    size = "medium",
}: ModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20" />
                </Transition.Child>

                <div className="fixed flex flex-col top-0 left-0 right-0 bottom-0 h-screen w-screen md:py-20 py-5 px-1">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className={clsx(
                                "relative md:px-10 px-5 pt-4 pb-8 min-h-0 flex flex-col w-full mx-auto transform bg-white rounded-lg shadow-xl transition-all",
                                {
                                    "max-w-md": size === "small",
                                    "max-w-xl": size === "medium",
                                    "max-w-3xl": size === "large",
                                    "max-w-7xl": size === "extra",
                                    "max-w-full": size === "full"
                                }
                            )}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full outline-none"
                            >
                                <IconClose className="w-5 h-5 block"/>
                            </button>
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
