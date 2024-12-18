"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { useCentralStore } from "../store";
import { getPageName } from "../utils";

const Header = (): ReactElement => {
  const pathname = usePathname();

  const { setIsSidebarOpen } = useCentralStore();

  return (
    <header className="sticky w-full overflow-hidden top-0 z-[80] flex h-24 shrink-0 items-center gap-x-4 border-b border-gray-300 bg-white px-8 shadow-sm sm:gap-x-6 lg:px-0 lg:py-8">
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden "
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-900/30 lg:hidden " />

      <div className="flex flex-1 gap-x-4 items-center lg:gap-x-6 lg:px-8">
        <h1 className="text-primary capitalize font-semibold text-2xl flex">
          Levy Report
        </h1>
      </div>
    </header>
  );
};

export default Header;
