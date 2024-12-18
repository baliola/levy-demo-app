import type ApiResponse from "@/services/data/response/api_base_response";
import type DetailLevy from "@/services/data/response/levy/detail_levy";
import type Levy from "@/services/data/response/levy/levy";

export interface ILevyService {
  getLevy(id: string): Promise<ApiResponse<DetailLevy>>;
  levy(request: LevyRequest): Promise<ApiResponse<Levy>>;
}
