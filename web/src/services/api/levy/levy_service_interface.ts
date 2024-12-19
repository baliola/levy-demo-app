import type LevyRequest from "@/services/data/request/levy/levy_request";
import type LevyUpdateStatusRequest from "@/services/data/request/levy/levy_update_status_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type LevyDetail from "@/services/data/response/levy/levy";

export interface ILevyService {
  getLevy(id: string): Promise<ApiResponse<LevyDetail>>;
  levy(request: LevyRequest): Promise<ApiResponse<LevyDetail>>;
  levyUpdateStatus(
    request: LevyUpdateStatusRequest
  ): Promise<ApiResponse<LevyDetail>>;
}
