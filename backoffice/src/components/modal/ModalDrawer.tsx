import { Dialog, Transition } from "@headlessui/react";
import type { ReactElement, ReactNode } from "react";
import { Fragment } from "react";

interface IModalDrawerProps {
  isOpen: boolean;
  toggle: () => void;
}

const ModalDrawer = ({
  children,
  props,
}: {
  children: ReactNode;
  props: IModalDrawerProps;
}): ReactElement => {
  const { isOpen, toggle } = props;

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
        <div className="fixed inset-0 overflow-y-auto overflow-hidden">
          <div className="flex min-h-full items-center justify-end text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full sm:w-1/2 xl:w-[40%] transform lg:rounded-l-3xl p-6 text-left align-right bg-white  transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalDrawer;
