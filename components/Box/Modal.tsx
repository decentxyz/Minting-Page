import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SourceContextProvider } from "./contexts/SourceContext";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  static?: boolean;
  children: ReactNode;
  className?: string;
}

function Modal(props: ModalProps) {
  const isStatic = props.static ?? false;
  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[1001] inset-0 overflow-y-auto"
        onClose={() => props.setIsOpen(isStatic)}
      >
        <SourceContextProvider>
          <div className="h-full pt-4 px-4 pb-20 text-center sm:p-0 w-full grid place-items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                onClick={() => props.setIsOpen(isStatic)}
                className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
              />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={`${props.className} relative inline-block align-bottom rounded-md text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6`}
              >
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-20">
                  <button
                    type="button"
                    className=" rounded-sm hover:bg-gray-100 p-1 focus:outline-none"
                    onClick={() => props.setIsOpen(false)}
                  >
                    <span className="sr-only">x</span>
                  </button>
                </div>
                <div className="mt-1">{props.children}</div>
              </div>
            </Transition.Child>
          </div>
        </SourceContextProvider>
      </Dialog>
    </Transition>
  );
}

export default Modal;
