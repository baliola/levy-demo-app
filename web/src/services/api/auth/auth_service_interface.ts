import type LoginRequest from "@/services/data/request/auth/login_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type Auth from "@/services/data/response/auth/auth";

export interface IAuthService {
  getAccount(): Auth;
  login(request: LoginRequest): Promise<ApiResponse<Auth>>;
}
