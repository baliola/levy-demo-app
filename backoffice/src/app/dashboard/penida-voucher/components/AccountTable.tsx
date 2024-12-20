import { Switch } from "@headlessui/react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  type Dispatch,
  type ReactElement,
  type SetStateAction,
  useMemo,
} from "react";
import { VscLoading } from "react-icons/vsc";
import { ModalDelete } from "@/src/components/modal/ModalDelete";
import type { ColumnDefTypes } from "@/src/components/table/PaginationTable";
import { PaginationTable } from "@/src/components/table/PaginationTable";
import { PermissionName } from "@/src/config/data";
import type {
  IAccountData,
  IAccountRoleData,
  ICreateAccountPayload,
  IEditAccountRolePayload,
  IParamsAccountList,
} from "@/src/interfaces/account.interface";
import type { LevyData } from "@/src/interfaces/levy.interface";
import { useCentralStore } from "@/src/store";
import { checkUserPermission } from "@/src/utils";
import { ModalEditAccount } from "./ModalEditAccount";
import { ModalResetPassword } from "./ModalResetPassword";

interface IAccountTableProps {
  accounts: IAccountData[] | undefined;
  totalAccount: number;
  pageAccount: number;
  limitAccount: number;
  accountSortIsAscending: boolean;
  accountSelectedSort: string;
  accountInputValue: string;
  accountSearchQuery: string;
  accountSelectedRoleFilter: IAccountRoleData;
  accountRoleOptions: IAccountRoleData[];
  loadingStatus: boolean;
  selectedAccount: number;
  setPageAccount: Dispatch<SetStateAction<number>>;
  setAccountSearchQuery: Dispatch<SetStateAction<string>>;
  setAccountInputValue: Dispatch<SetStateAction<string>>;
  setAccountSelectedRoleFilter: Dispatch<SetStateAction<IAccountRoleData>>;
  getAccountList: (params: IParamsAccountList) => Promise<void>;
  createAccount: (data: ICreateAccountPayload) => Promise<void>;
  editAccountRole: (id: string, data: IEditAccountRolePayload) => Promise<void>;
  activateAccount: (
    id: string,
    accounts: IAccountData[],
    index: number
  ) => Promise<void>;
  deactivateAccount: (
    id: string,
    accounts: IAccountData[],
    index: number
  ) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
}

export const AccountTable = ({
  props,
}: {
  props: IAccountTableProps;
}): ReactElement => {
  const {
    accounts,
    totalAccount,
    pageAccount,
    limitAccount,
    accountSortIsAscending,
    accountSelectedSort,
    accountSearchQuery,
    accountSelectedRoleFilter,
    accountRoleOptions,
    loadingStatus,
    setPageAccount,
    setAccountSearchQuery,
    setAccountInputValue,
    setAccountSelectedRoleFilter,
    getAccountList,
    createAccount,
    editAccountRole,
  } = props;

  const { userLoggedIn } = useCentralStore();

  const accountColumn = useMemo<ColumnDef<LevyData>[]>(
    () => [
      {
        header: "No",
        cell: (info): ReactElement => (
          <p className="text-left">
            {(pageAccount - 1) * limitAccount + info.row.index + 1}
          </p>
        ),
      },
      {
        header: "Name",
        cell: (info): string => info.row.original.user.name,
      },
      {
        header: "E-Mail",
        cell: (info): ReactElement => (
          <span className="capitalize">{info.row.original.user.email}</span>
        ),
      },
      {
        header: "Voucher Code",
        cell: (info): ReactElement => (
          <div className="bg-transparent">
            {info.row.original.levy.voucher_code}
          </div>
        ),
      },
      {
        header: "Voucher Status",
        cell: (info): ReactElement => (
          <div
            className={`"bg-transparent"${
              info.row.original.levy.levy_status.toLowerCase() === "paid"
                ? "text-green-500 dark:text-green-400"
                : info.row.original.levy.levy_status.toLowerCase() === "unpaid"
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-400 dark:text-indigo-200"
            }`}
          >
            <p className="capitalize"> {info.row.original.levy.levy_status}</p>
          </div>
        ),
      },
      {
        header: "Action",
        cell: (info): ReactElement => (
          <>
            <div className="flex lg:grid lg:grid-cols-1 lg:min-w-16 gap-x-1 border-l ml-1 drop-shadow-action-column px-3 py-2 justify-center">
              <ModalEditAccount
                props={{
                  // accountRoleOptions,
                  data: info.row.original,
                  id: info.row.original.id,
                  // setAccountSearchQuery,
                  // setAccountInputValue,
                  // setAccountSelectedRoleFilter,
                  // createAccount,
                  // editAccountRole,
                }}
              />
            </div>
          </>
        ),
      },
    ],
    [accounts, loadingStatus]
  );

  const changePageHandler = (value: number): void => {
    getAccountList({
      page: value,
      limit: limitAccount,
      order: accountSortIsAscending ? "asc" : "desc",
      sort: accountSelectedSort,
      search: accountSearchQuery,
      filter: accountSelectedRoleFilter.name,
    });
  };

  return (
    <PaginationTable
      props={{
        data: [],
        label: "Account",
        columns: accountColumn as ColumnDef<ColumnDefTypes>[],
        isCommon: true,
        isLoading: false,
        currentPage: 1,
        limitPage: 10,
        totalPage: Math.ceil(totalAccount / limitAccount),
        setCurrentPage: setPageAccount,
        changePageHandler,
      }}
    />
  );
};
