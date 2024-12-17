import type { Dispatch, SetStateAction} from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { 
  IAccountData, 
  IAccountRoleData, 
  ICreateAccountPayload, 
  IEditAccountRolePayload, 
  IParamsAccountList, 
  IResetPasswordAccountPayload
} from "../interfaces/account.interface";
import { AccountService } from "../services/account.service";
import { useCentralStore } from "../store";

export interface IUseAccount {
  accountSortIsAscending: boolean
  accountSortOptions: string[]
  accountSelectedSort: string
  accountSelectedRoleFilter: IAccountRoleData
  accountInputValue: string
  accountSearchQuery: string
  accounts: IAccountData[] | undefined
  accountRoleOptions: IAccountRoleData[]
  loadingStatus: boolean
  selectedAccount: number
  showFilterRoleModal: boolean
  showSortModal: boolean
  showModalAccount: boolean
  showModalResetPasswordAccount: boolean
  totalAccount: number
  pageAccount: number
  limitAccount: number
  toggleModalAccount: () => void
  toggleModalResetPasswordAccount: () => void
  setLoadingStatus: Dispatch<SetStateAction<boolean>>
  setSelectedAccount: Dispatch<SetStateAction<number>>
  setAccountSortIsAscending: Dispatch<SetStateAction<boolean>>
  setAccountSelectedSort: Dispatch<SetStateAction<string>>
  setAccountSelectedRoleFilter: Dispatch<SetStateAction<IAccountRoleData>>
  setAccountInputValue: Dispatch<SetStateAction<string>>
  setAccountSearchQuery: Dispatch<SetStateAction<string>>
  setAccounts: Dispatch<SetStateAction<IAccountData[] | undefined>>
  setShowFilterRoleModal: Dispatch<SetStateAction<boolean>>
  setShowSortModal: Dispatch<SetStateAction<boolean>>
  setShowModalAccount: Dispatch<SetStateAction<boolean>>
  setPageAccount: Dispatch<SetStateAction<number>>
  setLimitAccount: Dispatch<SetStateAction<number>>
  getAccountList: (params: IParamsAccountList) => Promise<void>
  getAccountRoleOptions: () => Promise<void>
  createAccount: (data: ICreateAccountPayload) => Promise<void>
  editAccountRole: (id: string, data: IEditAccountRolePayload) => Promise<void>
  activateAccount: (id: string, accounts: IAccountData[], index: number) => Promise<void>
  deactivateAccount: (id: string, accounts: IAccountData[], index: number) => Promise<void>
  deleteAccount: (id: string) => Promise<void>
  getAccountProfile: () => Promise<void>
  resetPasswordAccount: (id: string, data: IResetPasswordAccountPayload) => Promise<void>
}

const accountService = new AccountService()

const useAccount = (): IUseAccount => {
  const { setUserLoggedIn } = useCentralStore()
  
  const accountSortOptions = [
    'email'
  ]

  const [accountSortIsAscending, setAccountSortIsAscending] = useState(true)
  const [accountInputValue, setAccountInputValue] = useState('');
  const [accountSearchQuery, setAccountSearchQuery] = useState('')
  const [accountSelectedSort, setAccountSelectedSort] = useState('')
  const [accountSelectedRoleFilter, setAccountSelectedRoleFilter] = useState<IAccountRoleData>({ id: 0, name: '' })

  const [showFilterRoleModal, setShowFilterRoleModal] = useState(false)
  const [showSortModal, setShowSortModal] = useState(false)
  const [showModalAccount, setShowModalAccount] = useState(false)
  const [showModalResetPasswordAccount, setShowModalResetPasswordAccount] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const [pageAccount, setPageAccount] = useState(1)
  const [limitAccount, setLimitAccount] = useState(10)
  const [totalAccount, setTotalAccount] = useState(0)
  const [selectedAccount, setSelectedAccount] = useState(0)

  const [accounts, setAccounts] = useState<IAccountData[] | undefined>(undefined);
  const [accountRoleOptions, setAccountRoleOptions] = useState<IAccountRoleData[]>([])

  const toggleModalAccount = (): void => {
    setShowModalAccount(!showModalAccount)
  }

  const toggleModalResetPasswordAccount = (): void => {
    setShowModalResetPasswordAccount(!showModalResetPasswordAccount)
  }

  const getAccountList = async (params: IParamsAccountList): Promise<void> => {
    setAccounts(undefined)
    params.order = params.sort === '' ? 'desc' : params.order

    try {
      const data = await accountService.getAccountList(params)
      setAccounts(data.data.accounts)
      setTotalAccount(data.data.total)
    } catch (error) {
      setAccounts([])
    }
  }

  const getAccountRoleOptions = async (): Promise<void> => { 
    try {
      const data = await accountService.getAllAccountRole()
      setAccountRoleOptions(data.data)
    } catch (error) {}
  }

  const refreshAccountList = (): void => {
    getAccountList({
      page: pageAccount,
      limit: limitAccount,
      order: accountSortIsAscending ? 'asc' : 'desc',
      sort: accountSelectedSort,
      search: '',
      filter: ''
    })
  }

  const createAccount = async (data: ICreateAccountPayload): Promise<void> => {
    try {
      const response = await accountService.createAccount(data)
      toast.success(response.message)
      refreshAccountList()
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
  }

  const editAccountRole = async (id: string, data: IEditAccountRolePayload): Promise<void> => {
    try {
      const response = await accountService.editAccountRole(id, data)
      toast.success(response.message)
      refreshAccountList()
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
  }

  const activateAccount = async (id: string, accounts: IAccountData[], index: number): Promise<void> => {
    setLoadingStatus(true)
    setSelectedAccount(index)

    const accountsIfSuccessActivate = accounts.map((account) => {
      if (account.id === id) {
        return {
          ...account,
          is_active: true
        }
      }
  
      return account
    })
    
    setAccounts(accountsIfSuccessActivate)

    try {
      const response = await accountService.activateAccount(id)
      toast.success(response.message)
    } catch (error) {
      setAccounts(accounts)
      const err = error as Error;
      toast.error(err.message)
    } finally {
      setLoadingStatus(false)
    }
  }

  const deactivateAccount = async (id: string, accounts: IAccountData[], index: number): Promise<void> => {
    setLoadingStatus(true)
    setSelectedAccount(index)
    
    const accountsIfSuccessDeactivate = accounts.map((account) => {
      if (account.id === id) {
        return {
          ...account,
          is_active: false
        }
      }
  
      return account
    })
    
    setAccounts(accountsIfSuccessDeactivate)

    try {
      const response = await accountService.deactivateAccount(id)
      toast.success(response.message)
    } catch (error) {
      setAccounts(accounts)
      const err = error as Error;
      toast.error(err.message)
    } finally {
      setLoadingStatus(false)
    }
  }


  const deleteAccount = async (id: string): Promise<void> => {
    try {
      const response = await accountService.deleteAccount(id)
      toast.success(response.message)
      refreshAccountList()
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
  }

  const getAccountProfile = async (): Promise<void> => { 
    try {
      const data = await accountService.getMe()
      if (!data) return
      setUserLoggedIn({ role: data.data.role, permissions: data.data.permissions })
    } catch (error) {}
  }

  const resetPasswordAccount = async (id: string, data: IResetPasswordAccountPayload): Promise<void> => { 
    try {
      const response = await accountService.resetPassword(id, data)
      if (!response) return
      toast.success(response.message)
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
  }

  return {
    accountSortIsAscending,
    accountSortOptions,
    accountSelectedSort,
    accountSelectedRoleFilter,
    accountSearchQuery,
    accountInputValue,
    accounts,
    accountRoleOptions,
    loadingStatus,
    selectedAccount,
    showFilterRoleModal,
    showSortModal,
    showModalAccount,
    showModalResetPasswordAccount,
    totalAccount,
    pageAccount,
    limitAccount,
    toggleModalAccount,
    toggleModalResetPasswordAccount,
    setLoadingStatus,
    setSelectedAccount,
    setAccountSortIsAscending,
    setAccountSelectedSort,
    setAccountSelectedRoleFilter,
    setAccountInputValue,
    setAccountSearchQuery,
    setAccounts,
    setShowFilterRoleModal,
    setShowSortModal,
    setShowModalAccount,
    setPageAccount,
    setLimitAccount,
    getAccountList,
    getAccountRoleOptions,
    createAccount,
    editAccountRole,
    activateAccount,
    deactivateAccount,
    deleteAccount,
    getAccountProfile,
    resetPasswordAccount
  }
}

export default useAccount