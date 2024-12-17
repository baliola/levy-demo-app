import type { ReactElement } from "react";
import { GoShieldLock } from "react-icons/go";
import { forbiddenPage } from "../config/data";

const RestrictedPage = (): ReactElement => {
  return (
    <div className="w-full h-full flex">
      <div className="m-auto flex flex-col gap-y-6">
        <GoShieldLock className="mx-auto w-20 h-20 text-red-500"/>
        <div className="flex flex-col gap-y-2">
          <span className="mx-auto text-center px-6 lg:px-12 tracking-wide text-2xl font-semibold leading-8">{forbiddenPage.title}</span>
          <span className="mx-auto text-center px-6 lg:px-12 tracking-wide text-lg leading-6">{forbiddenPage.description}</span>
        </div>
      </div>
    </div>
  )
}

export default RestrictedPage