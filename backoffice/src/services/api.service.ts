import type { 
  AxiosError, 
  AxiosRequestConfig, 
  AxiosResponse 
} from 'axios';
import axiosInstance from '../config/api';
import type { ICreateAccountPayload, IEditAccountRolePayload, IResetPasswordAccountPayload } from '../interfaces/account.interface';
import type { IApiResponse } from '../interfaces/api.interface';
import type { IAuthLoginPayload } from '../interfaces/auth.interface';
import type { IProjectPayload } from '../interfaces/project.interface';

type IApiIServicePayload = 
  IAuthLoginPayload |
  IProjectPayload |
  ICreateAccountPayload |
  IEditAccountRolePayload |
  FormData |
  IResetPasswordAccountPayload

const ApiService = {
  fetchData<Response = unknown, Request = IApiIServicePayload>(
    param: AxiosRequestConfig<Request>,
  ): Promise<AxiosResponse<Response>> {
    return new Promise<AxiosResponse<Response>>((resolve, reject) => {
      axiosInstance(param)
        .then((response: AxiosResponse<Response>) => {
          resolve(response);
        })
        .catch((error: AxiosError<IApiResponse<Response>>) => {
          console.error('Error API Service', error);

          if (error.response) { // The server responded with a status outside of the 2xx range
            reject({
              message: error.response.data.message || 'An error occurred',
            });
          } else if (error.request) { // The request was made but no response was received
            reject({
              message: 'No response received from the server',
              request: error.request,
            });
          } else { // Something else caused the error
            reject({
              message: error.message || 'An unknown error occurred',
            });
          }
        });
    });
  },
};

export default ApiService;
