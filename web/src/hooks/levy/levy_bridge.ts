import type { AxiosError } from "axios";
import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";
import { LevyService } from "@/services/api/levy/levy_service";
import type LevyRequest from "@/services/data/request/levy/levy_request";
import type LevyUpdateStatusRequest from "@/services/data/request/levy/levy_update_status_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type LevyDetail from "@/services/data/response/levy/levy";

const levy_service = new LevyService();
const TAG_ERROR = "Error during :";

export const levy = async (
  request: LevyRequest
): Promise<ApiResponse<LevyDetail>> => {
  const response = await levy_service
    .levy(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<LevyDetail>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} LEVY`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const updateLevy = async (
  request: LevyUpdateStatusRequest
): Promise<ApiResponse<LevyDetail>> => {
  const response = await levy_service
    .levyUpdateStatus(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<LevyDetail>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} UPDATE LEVY`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const getLevy = async (id: string): Promise<ApiResponse<LevyDetail>> => {
  const response = await levy_service
    .getLevy(id)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<LevyDetail>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DETAIL LEVY`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetLevyQuery = (
  id: string
): UseQueryResult<ApiResponse<LevyDetail>, unknown> =>
  useQuery("detailLevy", () => getLevy(id), { enabled: false });
