import type { IApiResponse } from "./api.interface";

export interface BaseResponse<T> {
  data: T;
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface IBaseRequestParams {
  page: number;
  limit: number;
  order?: string;
  search?: string;
  filter?: string;
  sort?: string;
}

export interface ILevyServices<Response> {
  getLevyList(params: IBaseRequestParams): Promise<Response | void>;
  getLevyDetail(id: string): Promise<Response | void>;
  getTotalLevy(): Promise<Response>;
}

export interface LevyDatas {
  datas: LevyData[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
export type LevyData = {
  id: string;
  user: User;
  levy: Levy;
  created_at: string;
};

export interface TotalDataLevy {
  total_paid: number;
  total_retribution: number;
}

export interface Levy {
  voucher_code: string;
  levy_expired_at: string;
  levy_status: string;
}

export interface User {
  name: string;
  email: string;
  no_passport: string;
  arrival_date: Date;
}

export interface DataDetailLevy {
  id: string;
  user: User;
  levy: Levy;
  signature: string;
  transaction_histories: TransactionHistory[];
}
export interface TransactionHistory {
  status: string;
  created_at: Date;
  asset_hash: string;
  transaction_hash: string;
  onchain_url: string;
  algorithm: string;
  signature: string;
}

export type ILevyDetailResponse = IApiResponse<DataDetailLevy>;
export type ILevyListResponse = BaseResponse<LevyDatas>;
export type ILevyTotalTotal = IApiResponse<TotalDataLevy>;

export type ILevyResponse =
  | ILevyDetailResponse
  | ILevyListResponse
  | ILevyTotalTotal;
