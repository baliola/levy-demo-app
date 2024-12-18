import { setCookie } from "cookies-next";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { IAuthLoginPayload } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { useCentralStore } from "../store";

interface IUseAuth {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  handleLogin: (data: IAuthLoginPayload) => Promise<void>;
}

const authService = new AuthService();

export const useAuth = (router: AppRouterInstance): IUseAuth => {
  const { setUserLoggedIn } = useCentralStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data: IAuthLoginPayload): Promise<void> => {
    try {
      const response = await authService.login(data);
      console.log("reponse", response?.data.access_token);
      if (!response) return;
      toast.success(response.message);
      setCookie("accessToken", response?.data.access_token, { maxAge: 3600 });
      router.push("/dashboard/levy");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  return {
    showPassword,
    setShowPassword,
    handleLogin,
  };
};
