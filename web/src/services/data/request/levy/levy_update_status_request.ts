type LevyUpdateStatusRequest = {
  id: string;
  voucher_status: "PAID" | "UNPAID" | "REEDEMED";
};

export default LevyUpdateStatusRequest;
