"use client"

import type { ReactElement } from "react";
import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Sidebar";
import "react-toastify/dist/ReactToastify.css";

export const MainTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement => {
  return (
    <>
      <Sidebar />
      <div className="overflow-x-hidden lg:pl-72  flex flex-col h-full">
        <Header />
        {children}
      </div>
    </>
  )
}