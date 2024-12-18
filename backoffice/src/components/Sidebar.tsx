"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { CiLogout } from "react-icons/ci";
import Logo from "./sidebar/Logo";
import RedirectList from "./sidebar/RedirectList";
import { useCentralStore } from "../store";

const Sidebar = (): ReactElement => {
  const router = useRouter();

  const { isSidebarOpen, setIsSidebarOpen, setUserLoggedIn } =
    useCentralStore();

  const handleLogout = (): void => {
    deleteCookie("accessToken");
    router.push("/auth/login");

    setTimeout(() => {
      setUserLoggedIn(null);
    }, 1000);
  };

  return (
    <>
      <Dialog
        open={isSidebarOpen}
        onClose={setIsSidebarOpen}
        className="relative z-[90] lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex grow flex-col justify-between gap-y-5 overflow-y-auto bg-white px-6 pt-8 pb-6">
              <div className="flex h-16 shrink-0 items-center mb-6 justify-between">
                <Logo />
                <TransitionChild>
                  <div className="flex w-16 justify-end duration-300 ease-in-out data-[closed]:opacity-0 mb-auto pt-[0.4rem]">
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-10 h-10 flex"
                    >
                      <XMarkIcon
                        aria-hidden="true"
                        className="h-10 w-10 text-gray-500 m-auto "
                      />
                    </button>
                  </div>
                </TransitionChild>
              </div>
              <nav className="flex flex-1 flex-col px-2">
                <div className="flex flex-col gap-y-3">
                  <RedirectList />
                </div>
                <div className="flex mt-auto justify-between items-center gap-x-4"></div>
              </nav>
              <div className="w-full px-2">
                <button
                  type="button"
                  className="w-full flex gap-x-3 rounded-md p-2 text-base font-medium leading-6 capitalize text-red-600"
                  onClick={handleLogout}
                >
                  <CiLogout className="h-6 w-6 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <nav className="hidden lg:fixed lg:inset-y-0 lg:flex z-[90] lg:w-72 lg:flex-col overflow-x-hidden">
        <div className="flex grow flex-col overflow-y-hidden overflow-x-hidden">
          <div className="flex flex-col gap-y-8 py-8 px-8 border-r border-gray-300 w-72 h-full">
            <Logo />
            <div className="flex flex-1 flex-col">
              <div role="list" className="flex flex-1 flex-col">
                <div className="flex flex-col gap-y-3">
                  <RedirectList />
                </div>
              </div>
            </div>
            <div className="w-full">
              <button
                type="button"
                className="w-full flex gap-x-3 rounded-md p-2 text-base font-medium leading-6 capitalize text-red-600"
                onClick={handleLogout}
              >
                <CiLogout className="h-6 w-6 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
