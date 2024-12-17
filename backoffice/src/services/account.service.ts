import ApiService from "./api.service";
import type { 
  IAccountActivateResponse,
  IAccountCreateResponse,
  IAccountDeactivateResponse,
  IAccountDeleteResponse,
  IAccountEditRoleResponse,
  IAccountGetMeResponse,
  IAccountListResponse,
  IAccountResetPasswordResponse,
  IAccountRoleListResponse,
  IAccountService, 
  ICreateAccountPayload, 
  IEditAccountRolePayload, 
  IParamsAccountList,
  IResetPasswordAccountPayload
} from "../interfaces/account.interface";

export class AccountService implements IAccountService {
  async getAccountList(params: IParamsAccountList): Promise<IAccountListResponse> {
    try {
      const response = await ApiService.fetchData<IAccountListResponse>({
        method: 'GET',
        url: '/accounts',
        params: {
          ...params,
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllAccountRole(): Promise<IAccountRoleListResponse> {
    try {
      const response = await ApiService.fetchData<IAccountRoleListResponse>({
        method: 'GET',
        url: '/accounts/roles',
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createAccount(data: ICreateAccountPayload): Promise<IAccountCreateResponse> {
    try {
      const response = await ApiService.fetchData<IAccountCreateResponse>({
        method: 'POST',
        url: '/accounts',
        data,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async editAccountRole(id: string, data: IEditAccountRolePayload): Promise<IAccountEditRoleResponse> {
    try {
      const response = await ApiService.fetchData<IAccountEditRoleResponse>({
        method: 'PATCH',
        url: `/accounts/${id}/roles`,
        data,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async activateAccount(id: string): Promise<IAccountActivateResponse> {
    try {
      const response = await ApiService.fetchData<IAccountActivateResponse>({
        method: 'PATCH',
        url: `/accounts/${id}/activate`,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  async deactivateAccount(id: string): Promise<IAccountDeactivateResponse> {
    try {
      const response = await ApiService.fetchData<IAccountDeactivateResponse>({
        method: 'PATCH',
        url: `/accounts/${id}/deactivate`,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(id: string): Promise<IAccountDeleteResponse> {
    try {
      const response = await ApiService.fetchData<IAccountDeleteResponse>({
        method: 'DELETE',
        url: `/accounts/${id}`,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getMe(): Promise<IAccountGetMeResponse | void> {
    try {
      const response = await ApiService.fetchData<IAccountGetMeResponse>({
        method: 'GET',
        url: '/accounts/me',
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(id: string, data: IResetPasswordAccountPayload): Promise<IAccountResetPasswordResponse> {
    try {
      const response = await ApiService.fetchData<IAccountResetPasswordResponse>({
        method: 'PATCH',
        url: `/accounts/${id}/reset-password`,
        data,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}