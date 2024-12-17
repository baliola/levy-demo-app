import type { IApiResponse, IPaginationResponse } from "./api.interface";

export interface IAccountService {
  getAccountList(params: IParamsAccountList): Promise<IAccountListResponse | void>;
  getAllAccountRole(): Promise<IAccountRoleListResponse | void>;
  createAccount(data: ICreateAccountPayload): Promise<IAccountCreateResponse | void>;
  editAccountRole(id: string, data: IEditAccountRolePayload): Promise<IAccountEditRoleResponse | void>;
  activateAccount(id: string): Promise<IAccountActivateResponse | void>;
  deactivateAccount(id: string): Promise<IAccountDeactivateResponse | void>;
  deleteAccount(id: string): Promise<IAccountDeleteResponse | void>;
  getMe(): Promise<IAccountGetMeResponse | void>
  resetPassword(id: string, data: IResetPasswordAccountPayload): Promise<IAccountResetPasswordResponse | void>
}

export interface IParamsAccountList {
  page: number,
  limit: number
  order: 'asc' | 'desc'
  sort: string
  search?: string
  filter?: string
}

export interface IAccountData {
  id: string
  email: string
  is_active: boolean
  role: {
    id: number
    name: string
  }
}

export interface IAccountRoleData {
  id: number
  name: string
}

export interface ICreateAccountPayload {
  email: string
  password: string
  role_id: number
}

export interface IEditAccountRolePayload {
  role_id: number
}

export interface IResetPasswordAccountPayload {
  password: string
}

export interface IAccountResponseData {
  email: string
  is_active: boolean
  role: {
    id: number
    name: string
  }
}

export interface IAccountGetMeResponseData {
  email: string
  role: {
    id: number
    name: string
  }
  permissions: string[]
}

export type IAccountListResponse = IApiResponse<IPaginationResponse & { accounts: IAccountData[] }>
export type IAccountRoleListResponse = IApiResponse<IAccountRoleData[]>
export type IAccountCreateResponse = IApiResponse<IAccountResponseData>
export type IAccountEditRoleResponse = IApiResponse<IAccountResponseData>
export type IAccountActivateResponse = IApiResponse<IAccountResponseData>
export type IAccountDeactivateResponse = IApiResponse<IAccountResponseData>
export type IAccountDeleteResponse = IApiResponse<null>
export type IAccountGetMeResponse = IApiResponse<IAccountGetMeResponseData>
export type IAccountResetPasswordResponse = IApiResponse<null>