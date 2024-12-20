import {
  type Dispatch,
  type ReactElement,
  type SetStateAction,
  useEffect,
} from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import ModalDrawer from "@/src/components/modal/ModalDrawer";
import useAccount from "@/src/hooks/useAccount";
import { useLevy } from "@/src/hooks/useLevy";
import type {
  IAccountData,
  IAccountRoleData,
  ICreateAccountPayload,
  IEditAccountRolePayload,
} from "@/src/interfaces/account.interface";
import type { LevyData } from "@/src/interfaces/levy.interface";
import { AccountForm } from "./AccountForm";
import LevyDetail from "./LevyDetail";

interface IModalEditAccountProps {
  data: LevyData;
  id: string;
  // setAccountSearchQuery: Dispatch<SetStateAction<string>>;
  // setAccountInputValue: Dispatch<SetStateAction<string>>;
  // setAccountSelectedRoleFilter: Dispatch<SetStateAction<IAccountRoleData>>;
  // createAccount: (data: ICreateAccountPayload) => Promise<void>;
  // editAccountRole: (id: string, data: IEditAccountRolePayload) => Promise<void>;
}

export const ModalEditAccount = ({
  props,
}: {
  props: IModalEditAccountProps;
}): ReactElement => {
  const {
    // accountRoleOptions,
    data,
    id,
    // setAccountSearchQuery,
    // setAccountInputValue,
    // setAccountSelectedRoleFilter,
    // createAccount,
    // editAccountRole,
  } = props;

  const { toggleModalAccount, showModalAccount } = useAccount();
  // console.log("data detail", data.id);

  // const { levyDetail, fetchLevyDetail } = useLevy();
  // console.log("id", id);

  // useEffect(() => {
  //   // if (id) {
  //   fetchLevyDetail(id);
  //   return;
  //   // }
  // }, []);

  return (
    <>
      <button
        type="button"
        onClick={toggleModalAccount}
        className="flex text-xs text-white font-medium rounded-full h-fit py-1.5 items-center justify-center gap-1 px-3 lg:px-4 border-[3px] bg-[#F4B331]"
      >
        <FaRegEye className="w-4 h-4" />
        <span className="hidden lg:block text-left">Detail</span>
      </button>
      <ModalDrawer
        props={{
          isOpen: showModalAccount,
          toggle: toggleModalAccount,
        }}
      >
        <div className="flex flex-col px-2 lg:px-6">
          <div className="flex w-full justify-between">
            <h2 className="font-bold">Penida Voucher Details</h2>
            <button type="button" onClick={toggleModalAccount}>
              <RxCross2 className="text-red-500 w-6 h-6" />
            </button>
          </div>
          {/* {levyDetail && ( */}
          <>
            <LevyDetail id={id} />
          </>
        </div>
      </ModalDrawer>
    </>
  );
};
