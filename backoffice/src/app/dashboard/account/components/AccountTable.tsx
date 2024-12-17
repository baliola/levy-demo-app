import { Switch } from "@headlessui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { type Dispatch, type ReactElement, type SetStateAction, useMemo } from "react";
import { VscLoading } from "react-icons/vsc";
import { ModalDelete } from "@/src/components/modal/ModalDelete";
import type { ColumnDefTypes} from "@/src/components/table/PaginationTable";
import { PaginationTable } from "@/src/components/table/PaginationTable";
import { PermissionName } from "@/src/config/data";
import type { IAccountData, IAccountRoleData, ICreateAccountPayload, IEditAccountRolePayload, IParamsAccountList } from "@/src/interfaces/account.interface";
import { useCentralStore } from "@/src/store";
import { checkUserPermission } from "@/src/utils";
import { ModalEditAccount } from "./ModalEditAccount";
import { ModalResetPassword } from "./ModalResetPassword";

interface IAccountTableProps {
  accounts: IAccountData[] | undefined;
  totalAccount: number
  pageAccount: number
  limitAccount: number
  accountSortIsAscending: boolean
  accountSelectedSort: string
  accountInputValue: string
  accountSearchQuery: string
  accountSelectedRoleFilter: IAccountRoleData
  accountRoleOptions: IAccountRoleData[]
  loadingStatus: boolean
  selectedAccount: number
  setPageAccount: Dispatch<SetStateAction<number>>;
  setAccountSearchQuery: Dispatch<SetStateAction<string>>
  setAccountInputValue: Dispatch<SetStateAction<string>>
  setAccountSelectedRoleFilter: Dispatch<SetStateAction<IAccountRoleData>>
  getAccountList: (params: IParamsAccountList) => Promise<void>
  createAccount: (data: ICreateAccountPayload) => Promise<void>
  editAccountRole: (id: string, data: IEditAccountRolePayload) => Promise<void>
  activateAccount: (id: string, accounts: IAccountData[], index: number) => Promise<void>
  deactivateAccount: (id: string, accounts: IAccountData[], index: number) => Promise<void>
  deleteAccount: (id: string) => Promise<void>
}

export const AccountTable = ({ props }: { props: IAccountTableProps }): ReactElement => {
  const {
    accounts,
    totalAccount,
    pageAccount,
    limitAccount,
    accountSortIsAscending,
    accountSelectedSort,
    accountInputValue,
    accountSearchQuery,
    accountSelectedRoleFilter,
    accountRoleOptions,
    loadingStatus,
    selectedAccount,
    setPageAccount,
    setAccountSearchQuery,
    setAccountInputValue,
    setAccountSelectedRoleFilter,
    getAccountList,
    createAccount,
    editAccountRole,
    activateAccount,
    deactivateAccount,
    deleteAccount
  } = props

  const { userLoggedIn } = useCentralStore()

  const accountColumn = useMemo<ColumnDef<IAccountData>[]>(
    () => [
      {
        header: 'No',
        cell: (info): ReactElement => <p className="text-left">{(pageAccount - 1) * limitAccount + info.row.index + 1}</p>
      },
      {
        header: 'E-mail',
        cell: (info): string => info.row.original.email
      },
      {
        header: 'Role',
        cell: (info): ReactElement => <span className="capitalize">{info.row.original.role.name.toLowerCase()}</span>
      },
      {
        header: 'Status',
        cell: (info): ReactElement =>
          <div className="bg-transparent">
            <Switch
              checked={info.row.original.is_active}
              onChange={() => { 
                info.row.original.is_active 
                  ? deactivateAccount(info.row.original.id, accounts ?? [], info.row.index) 
                  : activateAccount(info.row.original.id, accounts ?? [], info.row.index) 
              }}
              className={`${info.row.original.is_active ? 'bg-primary' : 'bg-gray-500'} relative inline-flex w-11 shrink-0 cursor-pointer disabled:cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              disabled={loadingStatus}
            >
              <span
                aria-hidden="true"
                className={`switch ${info.row.original.is_active ? 'active ' : ''}pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              >
                {loadingStatus && selectedAccount === info.row.index && <VscLoading className="text-black m-auto h-4 w-4 font-bold animate-spin" />}
              </span>
            </Switch>
          </div>
      },
      {
        header: 'Action',
        cell: (info): ReactElement => <>
          {
            (checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_UPDATE_ACCOUNT) || checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_DELETE_ACCOUNT))
              ? <div className="flex lg:grid lg:grid-cols-3 lg:min-w-96 gap-x-1 border-l ml-1 drop-shadow-action-column px-3 py-2 justify-center">
                {
                  checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_UPDATE_ACCOUNT) && <ModalEditAccount 
                    props={{
                      accountRoleOptions,
                      data: info.row.original,
                      setAccountSearchQuery,
                      setAccountInputValue,
                      setAccountSelectedRoleFilter,
                      createAccount,
                      editAccountRole
                    }}
                  />
                }
                { 
                  checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_RESET_ACCOUNT_PASSWORD) && <ModalResetPassword 
                    props={{
                      id: info.row.original.id
                    }}
                  />
                }
                {
                  checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_DELETE_ACCOUNT) && <ModalDelete 
                    props={{
                      id: info.row.original.id,
                      name: info.row.original.email,
                      context: 'account',
                      submit: deleteAccount
                    }}
                  />
                }
              </div>
              : <div className="text-black text-center">-</div>
          }
        </>
      },
    ],
    [accounts, loadingStatus],
  );

  const changePageHandler = (value: number): void => {
    getAccountList({
      page: value,
      limit: limitAccount,
      order: accountSortIsAscending ? 'asc' : 'desc',
      sort: accountSelectedSort,
      search: accountSearchQuery,
      filter: accountSelectedRoleFilter.name
    })
  }
  
  return (
    <PaginationTable 
      props={{
        data: accounts ?? [],
        label: 'Account',
        columns: accountColumn as ColumnDef<ColumnDefTypes>[],
        isCommon: true,
        isLoading: accounts === undefined || accountInputValue !== accountSearchQuery,
        currentPage: pageAccount,
        limitPage: limitAccount,
        totalPage: Math.ceil(totalAccount / limitAccount) ,
        setCurrentPage: setPageAccount,
        changePageHandler
      }}
    />
  )
}