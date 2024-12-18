import type { Dispatch, ReactElement, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import ModalDrawer from "@/src/components/modal/ModalDrawer";
import useAccount from "@/src/hooks/useAccount";
import type { IAccountData, IAccountRoleData, ICreateAccountPayload, IEditAccountRolePayload } from "@/src/interfaces/account.interface";
import { AccountForm } from "./AccountForm";

interface IModalEditAccountProps {
  accountRoleOptions: IAccountRoleData[]
  data: IAccountData
  setAccountSearchQuery: Dispatch<SetStateAction<string>>
  setAccountInputValue: Dispatch<SetStateAction<string>>
  setAccountSelectedRoleFilter: Dispatch<SetStateAction<IAccountRoleData>>
  createAccount: (data: ICreateAccountPayload) => Promise<void>
  editAccountRole: (id: string, data: IEditAccountRolePayload) => Promise<void>
}

export const ModalEditAccount = ({ props }: { props: IModalEditAccountProps }): ReactElement => {
  const {
    accountRoleOptions,
    data,
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
        onClick={toggleModalAccount}
        className="flex text-xs text-white font-medium rounded-full h-fit py-1.5 items-center justify-center gap-1 px-3 lg:px-4 border-[3px] bg-[#F4B331]"
      >
        <CiEdit className="w-4 h-4" />
        <span className="hidden lg:block text-left">Edit</span>
      </button>
      <ModalDrawer 
        props={{
          isOpen: showModalAccount,
          toggle: toggleModalAccount
        }}
      >
        <div className="flex flex-col px-2 lg:px-6 h-full">
          <div className="flex w-full justify-between">
            <h2 className="font-bold">Edit Account</h2>
            <button 
              type="button"
              onClick={toggleModalAccount}
            >
              <RxCross2 className="text-red-500 w-6 h-6" />
            </button>
          </div>
          <AccountForm
            props={{
              isEdit: true,
              data, 
              id: data.id, 
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