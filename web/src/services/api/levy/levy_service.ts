/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "@/config/api";
import type ApiResponse from "@/services/data/response/api_base_response";
import type DetailLevy from "@/services/data/response/levy/detail_levy";
import type Levy from "@/services/data/response/levy/levy";
import type { ILevyService } from "./levy_service_interface";

export class LevyService implements ILevyService {
  async levy(request: LevyRequest): Promise<ApiResponse<Levy>> {
    const uri = "/levy";

    try {
      const response: AxiosResponse<ApiResponse<Levy>> = await api.post(
        uri,
        request
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<Levy>> | any) {
      console.error("====================================");
      console.error("ERROR LEVY --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async getLevy(id: string): Promise<ApiResponse<DetailLevy>> {
    const uri = `/levy/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<DetailLevy>> = await api.get(
        uri
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<DetailLevy>> | any) {
      console.error("====================================");
      console.error("ERROR DETAIL LEVY --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }
}
