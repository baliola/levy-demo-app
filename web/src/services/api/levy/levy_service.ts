/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "@/config/api";
import type LevyRequest from "@/services/data/request/levy/levy_request";
import type LevyUpdateStatusRequest from "@/services/data/request/levy/levy_update_status_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type LevyDetail from "@/services/data/response/levy/levy";
import type { ILevyService } from "./levy_service_interface";

export class LevyService implements ILevyService {
  async levy(request: LevyRequest): Promise<ApiResponse<LevyDetail>> {
    const uri = "/levy/levy-usecase";

    try {
      const response: AxiosResponse<ApiResponse<LevyDetail>> = await api.post(
        uri,
        request
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<LevyDetail>> | any) {
      console.error("====================================");
      console.error("ERROR LEVY --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async getLevy(id: string): Promise<ApiResponse<LevyDetail>> {
    const uri = `/levy/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<LevyDetail>> = await api.get(
        uri
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<LevyDetail>> | any) {
      console.error("====================================");
      console.error("ERROR DETAIL LEVY --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async levyUpdateStatus(
    request: LevyUpdateStatusRequest
  ): Promise<ApiResponse<LevyDetail>> {
    const uri = `/levy/${request.id}`;

    try {
      const response: AxiosResponse<ApiResponse<LevyDetail>> = await api.patch(
        uri,
        request
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<LevyDetail>> | any) {
      console.error("====================================");
      console.error("ERROR UPDATE LEVY --> ", error.response.data);
      console.error("====================================");
      throw error.response.data;
    }
  }
}
