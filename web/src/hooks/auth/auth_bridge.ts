import type { AxiosError } from "axios";
import { AuthService } from "@/services/api/auth/auth_service";
import type LoginRequest from "@/services/data/request/auth/login_request";
import type ApiResponse from "@/services/data/response/api_base_response";
import type Auth from "@/services/data/response/auth/auth";

const auth_service = new AuthService();
const TAG_ERROR = "Error during :";

export const login = async (
  request: LoginRequest
): Promise<ApiResponse<Auth>> => {
  const response = await auth_service
    .login(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Auth>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} LOGIN`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};
