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
};

export interface TotalDataLevy {
  total_paid: number;
  total_retribution: number;
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

export const dummyResponse: LevyData[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "johndoe@example.com",
      no_passport: "A1234567",
      arrival_date: new Date("2024-01-15"),
    },
    levy: {
      voucher_code: "VOUCHER123",
      levy_expired_at: new Date("2024-02-15"),
      levy_status: "paid",
    },
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      no_passport: "B9876543",
      arrival_date: new Date("2024-02-20"),
    },
    levy: {
      voucher_code: "VOUCHER456",
      levy_expired_at: new Date("2024-03-20"),
      levy_status: "unpaid",
    },
  },
  {
    id: "3",
    user: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      no_passport: "C7654321",
      arrival_date: new Date("2024-01-25"),
    },
    levy: {
      voucher_code: "VOUCHER789",
      levy_expired_at: new Date("2024-03-01"),
      levy_status: "unpaid",
    },
  },
];

export type ILevyDetailResponse = IApiResponse<LevyData>;
export type ILevyListResponse = BaseResponse<LevyDatas>;
export type ILevyTotalTotal = IApiResponse<TotalDataLevy>;

export type ILevyResponse =
  | ILevyDetailResponse
  | ILevyListResponse
  | ILevyTotalTotal;

export const dummyResponseDetail: DataDetailLevy = {
  id: "84f1e659-1f3b-427d-9a2a-a2934fdc77c9",
  user: {
    name: "Backend Testing 18-12-2024-2",
    email: "johndoe@gmail.com",
    no_passport: "A123456",
    arrival_date: new Date("2024-03-01"),
  },
  levy: {
    voucher_code: "LEVY12345",
    levy_expired_at: new Date("2026-03-01"),
    levy_status: "UNPAID",
  },
  signature:
    "0x1fffe84b6707c52da2d61a2c12987406a2da282aa542e40a2e8ae3107aa1a9aa12b4bff3bb025a8b2362156d8f27c7850ce7a315e6b3e8c0375cbb57976411eb1b",
  transaction_histories: [
    {
      status: "UNPAID",
      created_at: new Date("2024-03-01"),
      asset_hash:
        "0x678072ff5093ed72c5d0d583e090152a758e1ff6b18dbe269b3f8cfcdaf681a9",
      transaction_hash:
        "0x7764553afc249ffd95c83e177cf3886f26a0aed80bb428715f5587cfeadb037c",
      onchain_url:
        "https://nbs-explorer.mandalachain.io/tx/0x7764553afc249ffd95c83e177cf3886f26a0aed80bb428715f5587cfeadb037c",
      algorithm: "Keccak-256",
      signature:
        "0x1fffe84b6707c52da2d61a2c12987406a2da282aa542e40a2e8ae3107aa1a9aa12b4bff3bb025a8b2362156d8f27c7850ce7a315e6b3e8c0375cbb57976411eb1b",
    },
  ],
};
