type MetaPage = {
  page: number;
  limit: number;
  isLastPage: boolean;
  total: number;
};

export interface IApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  metaPage?: MetaPage | undefined;
}

export interface IPaginationResponse {
  currentPage: number
  pageSize: number
  total: number
  totalPages: number
}