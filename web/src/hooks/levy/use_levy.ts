/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError } from "axios";

import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
} from "react-query";
import { useMutation } from "react-query";
import StorageKey from "@/constants/storageKey";
import type LevyRequest from "@/services/data/request/levy/levy_request";
import type LevyUpdateStatusRequest from "@/services/data/request/levy/levy_update_status_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type LevyDetail from "@/services/data/response/levy/levy";
import LocalStorage from "@/services/storage/localStorage";

import type PaymentMethod from "@/types/payment_method";
import { showToast } from "@/utils";
import {
  levy as levyBridge,
  updateLevy as updateLevyBridge,
  useGetLevyQuery,
} from "./levy_bridge";

interface IUseLevy {
  levy: UseMutateFunction<
    ApiResponse<LevyDetail>,
    unknown,
    LevyRequest,
    unknown
  >;
  isLoadingLevy: boolean;
  levyDetail: ApiResponse<LevyDetail> | undefined;
  refetchLevy: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<LevyDetail>, unknown>>;
  levyId: string | undefined;
  setLevyId: Dispatch<SetStateAction<string | undefined>>;
  isLevySuccess: boolean;

  updateLevy: UseMutateFunction<
    ApiResponse<LevyDetail>,
    any,
    LevyUpdateStatusRequest,
    unknown
  >;
  isLoadingUpdateLevy: boolean;
  isUpdateLevySuccess: boolean;
  paymentMethodData: PaymentMethod | undefined;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
}

export const useLevy = (): IUseLevy => {
  const [levyId, setLevyId] = useState<string>();

  const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethod>();

  const router = useRouter();

  const { data: levyDetail, refetch: refetchLevy } = useGetLevyQuery(
    levyId ?? ""
  );

  const setPaymentMethod = (paymentMethod: PaymentMethod): void => {
    LocalStorage.set(StorageKey.PAYMENT_METHOD, paymentMethod);

    const method = LocalStorage.get<PaymentMethod>(
      StorageKey.PAYMENT_METHOD
    ) as PaymentMethod | null;

    setPaymentMethodData(method!);
  };

  const {
    mutate: levy,
    isLoading: isLoadingLevy,
    isSuccess: isLevySuccess,
  } = useMutation(levyBridge, {
    onSuccess: async (value) => {
      showToast({
        message: value.message,
        status: "success",
        isDark: false,
      });

      setTimeout(() => {
        router.push(`/payment/${value.data.id}`);
      }, 2000);
    },
    onError: async (error: AxiosError<ApiResponse<LevyDetail>> | any) => {
      showToast({
        message: error?.message,
        status: "error",
        isDark: false,
      });
    },
  });

  const {
    mutate: updateLevy,
    isLoading: isLoadingUpdateLevy,
    isSuccess: isUpdateLevySuccess,
  } = useMutation(updateLevyBridge, {
    onSuccess: async (value) => {
      showToast({
        message: value.message,
        status: "success",
        isDark: false,
      });

      setTimeout(() => {
        router.replace(`/levy/${value.data.id}`);
      }, 2000);
    },
    onError: async (error: AxiosError<ApiResponse<LevyDetail>> | any) => {
      showToast({
        message: error?.message,
        status: "error",
        isDark: false,
      });
    },
  });

  useEffect(() => {
    if (levyId) {
      refetchLevy();
    }
  }, [levyId]);

  useEffect(() => {
    const method = LocalStorage.get<PaymentMethod>(
      StorageKey.PAYMENT_METHOD
    ) as PaymentMethod | undefined;

    if (method) {
      setPaymentMethodData(method!);
    }
  }, []);

  return {
    levy,
    isLoadingLevy,
    levyDetail,
    refetchLevy,
    isLevySuccess,
    levyId,
    setLevyId,
    isLoadingUpdateLevy,
    isUpdateLevySuccess,
    updateLevy,
    paymentMethodData,
    setPaymentMethod,
  };
};
