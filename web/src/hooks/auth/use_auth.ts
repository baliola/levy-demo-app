/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { UseMutateFunction } from "react-query";
import { useMutation } from "react-query";
import { AuthService } from "@/services/api/auth/auth_service";
import type LoginRequest from "@/services/data/request/auth/login_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type Auth from "@/services/data/response/auth/auth";
import { useCentralStore } from "@/store";
import { showToast } from "@/utils";
import { login as loginBridge } from "./auth_bridge";

interface IUseAuth {
  login: UseMutateFunction<ApiResponse<Auth>, unknown, LoginRequest, unknown>;
  isLoadingLogin: boolean;
  account: Auth | undefined;
}

export const useAuth = (): IUseAuth => {
  const [account, setAccount] = useState<Auth>();

  const { isDarkMode } = useCentralStore();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation(
    loginBridge,
    {
      onSuccess: async (value) => {
        showToast({
          message: value.message,
          status: "success",
          isDark: isDarkMode,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      },
      onError: async (error: AxiosError<ApiResponse<Auth>> | any) => {
        showToast({
          message: error?.message,
          status: "error",
          isDark: isDarkMode,
        });
      },
    }
  );

  useEffect(() => {
    const authService = new AuthService();
    setAccount(authService.getAccount());
  }, []); // No dependencies

  return {
    account,
    login,
    isLoadingLogin,
  };
};
