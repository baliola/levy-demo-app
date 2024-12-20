import { 
  type Dispatch, 
  type ReactElement, 
  type SetStateAction
} from "react"
import { BiSortAZ, BiSortZA } from "react-icons/bi"
import { IoCheckmarkOutline } from "react-icons/io5"
import type { IAccountRoleData, IParamsAccountList } from "@/src/interfaces/account.interface"

interface ISortAccountProps {
  pageAccount: number
  limitAccount: number
  accountSortIsAscending: boolean
  accountSortOptions: string[]
  accountSelectedSort: string
  accountSearchQuery: string
  accountSelectedRoleFilter: IAccountRoleData
  showSortModal: boolean
  setAccountSortIsAscending: Dispatch<SetStateAction<boolean>>
  setAccountSelectedSort: Dispatch<SetStateAction<string>>
  setShowSortModal: Dispatch<SetStateAction<boolean>>
  getAccountList: (params: IParamsAccountList) => Promise<void>
};

export const SortAccount = ({ props }: { props: ISortAccountProps}): ReactElement => {
  const {
    pageAccount,
    limitAccount,
    accountSortIsAscending,
    accountSortOptions,
    accountSelectedSort,
    accountSearchQuery,
    accountSelectedRoleFilter,
    showSortModal,
    setAccountSortIsAscending,
    setAccountSelectedSort,
    setShowSortModal,
    getAccountList,
  } = props

  const changeSortHandler = (value: string): void => {
    setAccountSelectedSort(value)
    setShowSortModal(false)
    getAccountList({
      page: pageAccount,
      limit: limitAccount,
      order: accountSortIsAscending ? 'asc' : 'desc',
      sort: value,
      search: accountSearchQuery,
      filter: accountSelectedRoleFilter.name
    })
  }

  const changeOrderHandler = (value: boolean): void => {
    setAccountSortIsAscending(value) 
    getAccountList({
      page: pageAccount,
      limit: limitAccount,
      order: value ? 'asc' : 'desc',
      sort: accountSelectedSort,
      search: accountSearchQuery,
      filter: accountSelectedRoleFilter.name
    })
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <label 
          htmlFor="sortAccount"
          className="font-semibold w-fit px-4"
        >
          Sort by
        </label>
      </div>
      <div 
        className={`rounded-xl border min-h-12 px-2 py-3 cursor-pointer flex gap-x-4 relative border-gray-300 ${showSortModal ? 'bg-slate-200' : 'bg-white'}`}
        onMouseLeave={() => { setShowSortModal(false) }}
      >
        <button 
          className="w-full flex flex-wrap items-center gap-x-4 overflow-x-auto scrollable-content px-2"
          onClick={() => { setShowSortModal(true) }}
          type="button"
        >
          <span className="capitalize">{accountSelectedSort === '' ? 'latest' : accountSelectedSort}</span>
        </button>
        <div className={`absolute top-full w-full left-0 py-4 z-10 mb-4" ${showSortModal ? '' : 'hidden'}`}>
          <div className="flex flex-col gap-2 bg-white max-h-48 scrollable-content overflow-y-auto border-gray-300 overflow-x-hidden py-4 px-4 rounded-xl border shadow-md">
            {
              ['', ...accountSortOptions].map((option, index) =>
                <button 
                  key={index}
                  type="button"
                  onClick={() => { changeSortHandler(option) }}
                  className="flex justify-between items-center hover:font-semibold hover:bg-gradient-active-sidebar hover:text-primary py-1 px-4 rounded-lg"
                >
                  <span className="flex items-center gap-x-2 capitalize text-sm">{option === '' ? 'latest' : option}</span>
                  {accountSelectedSort === option && <IoCheckmarkOutline className="h-full aspect-square text-green-700"/>}
                </button>
              )
            }
          </div>
        </div>     
        <div className="flex">
          <button 
            type="button"
            onClick={() => { changeOrderHandler(!accountSortIsAscending) }}
            className="flex items-center my-auto"
          >
            <span className="text-sm font-semibold">{accountSortIsAscending ? <BiSortAZ className="w-6 h-6" /> : <BiSortZA className="w-6 h-6" />}</span>
          </button>
        </div>
      </div>
    </div>
  );
};