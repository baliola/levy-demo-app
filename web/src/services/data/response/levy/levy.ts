type TransactionHistory = {
  status: "UNPAID" | "PAID" | "REDEEMED";
  created_at: string; // The creation date of the transaction (in ISO format)
  asset_hash: string; // The hash of the asset associated with the transaction
  transaction_hash: string; // The hash of the transaction
  onchain_url: string; // The URL to view the transaction on-chain
  algorithm: string; // The hashing algorithm used (e.g., Keccak-256)
  signature: string; // The signature associated with the transaction
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

type LevyDetail = {
  id: string;
  user: User;
  levy: Levy;
  asset_hash: string;
  transaction_hash: string;
  onchain_url: string;
  algorithm: string;
  signature: string;
  transaction_histories?: TransactionHistory[] | null;
};
export default LevyDetail;
