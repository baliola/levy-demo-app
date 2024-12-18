export interface BaseResponse {
  datas: DataElement[];
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
}

export interface ILevyServices<Response> {
  getLevyList(params: Response): Promise<Response | void>;
  getLevyDetail(id: string): Promise<Response | void>;
}

export interface DataElement {
  id: string;
  user: User;
  levy: Levy;
}

export interface Levy {
  voucher_code: string;
  levy_expired_at: Date;
  levy_status: string;
}

export interface User {
  name: string;
  email: string;
  no_passport: string;
  arrival_date: Date;
}
