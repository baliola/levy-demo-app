import type { Dispatch, ReactElement, SetStateAction } from "react";
import { CgMathPlus } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import ModalDrawer from "@/src/components/modal/ModalDrawer";
import useAccount from "@/src/hooks/useAccount";
import type { IAccountRoleData, ICreateAccountPayload, IEditAccountRolePayload } from "@/src/interfaces/account.interface";
import { AccountForm } from "./AccountForm";

interface IModalAddAccountProps {
  accountRoleOptions: IAccountRoleData[]
  setAccountSearchQuery: Dispatch<SetStateAction<string>>
  setAccountInputValue: Dispatch<SetStateAction<string>>
  setAccountSelectedRoleFilter: Dispatch<SetStateAction<IAccountRoleData>>
  createAccount: (data: ICreateAccountPayload) => Promise<void>
  editAccountRole: (id: string, data: IEditAccountRolePayload) => Promise<void>
}

export const ModalAddAccount = ({ props }: { props: IModalAddAccountProps }): ReactElement => {
  const {
    accountRoleOptions,
    setAccountSearchQuery,
    setAccountInputValue,
    setAccountSelectedRoleFilter,
    createAccount,
    editAccountRole
  } = props

  const { toggleModalAccount, showModalAccount } = useAccount();

  return (
    <>
      <button 
        type="button"
        className="flex w-full items-center justify-center bg-primary text-white font-semibold h-12 gap-x-3 rounded-xl aspect-square"
        onClick={toggleModalAccount}
      >
        <CgMathPlus className="w-8 h-8 lg:w-8 lg:h-8"/>
      </button>
      <ModalDrawer 
        props={{
          isOpen: showModalAccount,
          toggle: toggleModalAccount
        }}
      >
        <div className="flex flex-col px-2 lg:px-6 h-full sm:w-full">
          <div className="flex w-full justify-between">
            <h2 className="font-bold">Add Account</h2>
            <button 
              type="button"
              onClick={toggleModalAccount}
            >
              <RxCross2 className="text-red-500 w-6 h-6" />
            </button>
          </div>
          <AccountForm
            props={{
              isEdit: false,
              data: null,
              accountRoleOptions,
              toggle: toggleModalAccount,
              setAccountSearchQuery,
              setAccountInputValue,
              setAccountSelectedRoleFilter,
              createAccount,
              editAccountRole
            }}
          />
        </div>
      </ModalDrawer>
    </>
  )
} 