import { Dialog, Transition } from '@headlessui/react';
import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';

interface IModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const Modal = ({ children, props }: { children: ReactNode, props: IModalProps }): ReactElement => {
  const {
    isOpen,
    toggle
  } = props

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9998]" onClose={toggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 transform rounded-2xl p-6 lg:p-4 text-left align-middle transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
