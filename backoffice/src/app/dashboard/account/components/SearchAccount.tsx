import type { Dispatch } from "react";
import {
  type ReactElement, 
  type SetStateAction, 
  useEffect, 
} from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { CgClose } from "react-icons/cg";
import { VscLoading } from "react-icons/vsc"
import type { IAccountRoleData, IParamsAccountList } from "@/src/interfaces/account.interface";

interface ISearchAccountProps {
  limitAccount: number
  accountSortIsAscending: boolean
  accountSelectedSort: string
  accountSelectedRoleFilter: IAccountRoleData
  accountInputValue: string
  accountSearchQuery: string
  setAccountInputValue: Dispatch<SetStateAction<string>>
  setAccountSearchQuery: Dispatch<SetStateAction<string>>
  getAccountList: (params: IParamsAccountList) => Promise<void>
};

export const SearchAccount = ({ props }: { props: ISearchAccountProps}): ReactElement => {
  const {
    limitAccount,
    accountSortIsAscending,
    accountSelectedSort,
    accountSelectedRoleFilter,
    accountInputValue,
    accountSearchQuery,
    setAccountInputValue,
    setAccountSearchQuery,
    getAccountList
  } = props

  const changeSearchHandler = (value: string): void => {
    getAccountList({
      page: 1,
      limit: limitAccount,
      order: accountSortIsAscending ? 'asc' : 'desc',
      sort: accountSelectedSort,
      search: value,
      filter: accountSelectedRoleFilter.name
    })
  }

  useEffect(() => {
    if (accountInputValue === '' && accountSearchQuery === '') return
    
    const handler = setTimeout(() => {
      setAccountSearchQuery(accountInputValue);
      changeSearchHandler(accountInputValue)
    }, 700);

    return (): void => {
      clearTimeout(handler);
    };
  }, [accountInputValue]);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <label htmlFor="search" className="px-4 font-bold">Search</label>
      <div className="border border-gray-300 h-12 rounded-xl flex relative overflow-hidden">
        <input 
          id="search"
          type="text" 
          placeholder="Account email"
          value={accountInputValue}
          onChange={(e) => { setAccountInputValue(e.target.value) }}
          className="outline-none h-full pl-4 pr-12 w-full"
        />
        <div className="h-full w-fit flex absolute right-4">
          <button 
            className="my-auto"
            onClick={() => { 
              if (accountInputValue !== '')
                setAccountInputValue('')
            }}
          >
            {
              (accountInputValue !== accountSearchQuery)
                ? <VscLoading className="w-5 h-5 my-auto animate-spin"/>
                : accountInputValue !== ''
                  ? <CgClose className="w-5 h-5 my-auto" />
                  : <AiOutlineSearch className="w-5 h-5 my-auto" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};