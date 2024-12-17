import ApiService from "./api.service";
import type { 
  IParamsProjectList,
  IProjectDeleteResponse,
  IProjectEditResponse,
  IProjectListResponse, 
  IProjectService,
  IProjectTagListResponse
} from "../interfaces/project.interface";

export class ProjectService implements IProjectService {
  async getProjectList(params: IParamsProjectList): Promise<IProjectListResponse> {
    try {
      const response = await ApiService.fetchData<IProjectListResponse>({
        method: 'GET',
        url: '/projects',
        params: {
          ...params,
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllProjectTag(isExist?: boolean): Promise<IProjectTagListResponse> {
    try {
      const response = await ApiService.fetchData<IProjectTagListResponse>({
        method: 'GET',
        url: '/projects/tags',
        params: {
          lang: 'en',
          is_exist: isExist
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createProject(data: FormData): Promise<IProjectDeleteResponse> {
    try {
      const response = await ApiService.fetchData<IProjectDeleteResponse>({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: 'POST',
        url: '/projects',
        data: data as FormData,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async editProject(id: string, data: FormData): Promise<IProjectEditResponse> {
    try {
      const response = await ApiService.fetchData<IProjectEditResponse>({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: 'PUT',
        url: `/projects/${id}`,
        data: data as FormData,
        params: {
          lang: 'en'
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id: string): Promise<IProjectDeleteResponse> {
    try {
      const response = await ApiService.fetchData<IProjectDeleteResponse>({
        method: 'DELETE',
        url: `/projects/${id}`,
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