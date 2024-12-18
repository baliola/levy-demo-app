import type { AxiosError } from "axios";
import type { UseQueryResult } from "react-query";
import { useQuery } from "react-query";
import { LevyService } from "@/services/api/levy/levy_service";
import type ApiResponse from "@/services/data/response/api_base_response";
import type DetailLevy from "@/services/data/response/levy/detail_levy";
import type Levy from "@/services/data/response/levy/levy";

const levy_service = new LevyService();
const TAG_ERROR = "Error during :";

export const levy = async (
  request: LevyRequest
): Promise<ApiResponse<Levy>> => {
  const response = await levy_service
    .levy(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Levy>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} LEVY`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const getLevy = async (id: string): Promise<ApiResponse<DetailLevy>> => {
  const response = await levy_service
    .getLevy(id)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<DetailLevy>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DETAIL LEVY`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetLevyQuery = (
  id: string
): UseQueryResult<ApiResponse<DetailLevy>, unknown> =>
  useQuery("detailLevy", () => getLevy(id));
