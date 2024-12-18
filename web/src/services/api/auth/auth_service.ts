/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosResponse } from "axios";
import { setCookie } from "cookies-next";
import { api } from "@/config/api";
import CookieKey from "@/constants/cookie_key";
import StorageKey from "@/constants/storageKey";
import type LoginRequest from "@/services/data/request/auth/login_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type Auth from "@/services/data/response/auth/auth";
import LocalStorage from "@/services/storage/localStorage";
import type { IAuthService } from "./auth_service_interface";

export class AuthService implements IAuthService {
  getAccount(): Auth {
    try {
      const account = LocalStorage.get<Auth>(StorageKey.ACCOUNT) as Auth;

      return account;
    } catch (error) {
      console.error("====================================");
      console.error("ERROR GET ACCOUNT --> ", error);
      console.error("====================================");
      throw error;
    }
  }

  async login(request: LoginRequest): Promise<ApiResponse<Auth>> {
    const uri = "/auth/login";

    try {
      const response: AxiosResponse<ApiResponse<Auth>> = await api.post(
        uri,
        request
      );

      this.setToken({
        access_token: response.data.data.access_token,
      });
      LocalStorage.set(StorageKey.ACCOUNT, response.data.data);

      return response.data;
    } catch (error: AxiosError<ApiResponse<Auth>> | any) {
      console.error("====================================");
      console.error("ERROR LOGIN --> ", error);
      console.error("====================================");
      console.error("====================================");
      console.error("ERROR LOGIN --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  private setToken({ access_token }: { access_token: string }): void {
    setCookie(CookieKey.ACCESS_TOKEN, access_token);

    setCookie(CookieKey.IS_LOGGED_IN, true);
  }
}
