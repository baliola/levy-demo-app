import ApiService from "./api.service";
import type { 
  IAuthLoginPayload,
  IAuthLoginResponse,
  IAuthService, 
} from "../interfaces/auth.interface";

export class AuthService implements IAuthService {
  async login (data: IAuthLoginPayload): Promise<IAuthLoginResponse | void> {
    try {
      const response = await ApiService.fetchData<IAuthLoginResponse>({
        method: 'POST',
        url: '/auth/login',
        data: data,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}