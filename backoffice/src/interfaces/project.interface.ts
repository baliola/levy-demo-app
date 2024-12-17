import type { IApiResponse, IPaginationResponse } from "./api.interface";

export interface IProjectService {
  getProjectList(params: IParamsProjectList): Promise<IProjectListResponse | void>;
  getAllProjectTag(): Promise<IProjectTagListResponse | void>;
  createProject(data: FormData): Promise<IProjectCreateResponse | void>;
  editProject(id: string, data: FormData): Promise<IProjectEditResponse | void>;
  deleteProject(id: string): Promise<IProjectDeleteResponse | void>;
}

export interface IParamsProjectList {
  page: number,
  limit: number
  order: 'asc' | 'desc'
  sort: string
  search?: string
  filter?: string
}

export interface IProjectData {
  id: string
  name: string
  description: string
  tvl: number
  users: number
  year: number;
  tags: string[]
  logo: string | null
}

export interface IProjectPayload {
  name: string
  description: string
  tvl: number
  users: number
  year: number;
  tags: string[]
  logo: File | string | null
}

export type IProjectListResponse = IApiResponse<IPaginationResponse & { projects: IProjectData[] }>
export type IProjectTagListResponse = IApiResponse<{tags: string[]}>
export type IProjectCreateResponse = IApiResponse<null>
export type IProjectEditResponse = IApiResponse<null>
export type IProjectDeleteResponse = IApiResponse<null>