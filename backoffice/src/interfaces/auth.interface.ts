import type { IAccountRoleData } from './account.interface';
import type { IApiResponse } from './api.interface';

export interface IAuthService {
  login(data: IAuthLoginPayload): Promise<IAuthLoginResponse | void>;
}

export interface IAuthLoginPayload {
  email: string;
  password: string;
};

export interface IAuthLoginResponseData {
  accessToken: string
  role: IAccountRoleData
  permissions: string[]
}

export interface IUserLoggedInData {
  role: IAccountRoleData
  permissions: string[]
}

export type IAuthLoginResponse = IApiResponse<IAuthLoginResponseData>;
