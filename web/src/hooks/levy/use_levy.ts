/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError } from "axios";

import { useEffect, useState } from "react";
import type { UseMutateFunction } from "react-query";
import { useMutation } from "react-query";
import type ApiResponse from "@/services/data/response/api_base_response";
import type Levy from "@/services/data/response/levy/levy";
import { useCentralStore } from "@/store";
import { showToast } from "@/utils";
import { levy as levyBridge, useGetLevyQuery } from "./levy_bridge";

interface IUseLevy {
  levy: UseMutateFunction<ApiResponse<Levy>, unknown, LevyRequest, unknown>;
  isLoadingLevy: boolean;
}

export const useLevy = (): IUseLevy => {
  const { isDarkMode } = useCentralStore();

  const [levyData, setLevyData] = useState<Levy>();

  // const { } = useGetLevyQuery();

  const {
    mutate: levy,
    isLoading: isLoadingLevy,
    isSuccess: isLevySuccess,
  } = useMutation(levyBridge, {
    onSuccess: async (value) => {
      setLevyData(value.data);

      showToast({
        message: value.message,
        status: "success",
        isDark: isDarkMode,
      });

      setTimeout(() => {
        window.location.href = "/payment";
      }, 2000);
    },
    onError: async (error: AxiosError<ApiResponse<Levy>> | any) => {
      showToast({
        message: error?.message,
        status: "error",
        isDark: isDarkMode,
      });
    },
  });

  useEffect(() => {
    if (isLevySuccess) {
    }
  }, [isLevySuccess]);

  return {
    levy,
    isLoadingLevy,
  };
};
