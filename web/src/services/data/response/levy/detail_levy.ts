type TransactionHistory = {
  status: string;
  created_at: string; // Consider using Date type if you will parse this into a Date object
  asset_hash: string;
  transaction_hash: string;
  onchain_url: string;
  algorithm: string;
  signature: string;
};

type User = {
  name: string;
  email: string;
  no_passport: string;
  arrival_date: string; // Consider using Date type if you will parse this into a Date object
};

type Levy = {
  voucher_code: string;
  levy_expired_at: string; // Consider using Date type if you will parse this into a Date object
  levy_status: string;
};

type DetailLevy = {
  id: string;
  user: User;
  levy: Levy;
  signature: string;
  transaction_histories: TransactionHistory[];
};

export default DetailLevy;
