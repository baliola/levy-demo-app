type LevyRequest = {
  user: {
    name: string;
    email: string;
    no_passport: string;
    arrival_date: string;
  };
  levy: {
    voucher_code: string;
    levy_expired_at: string;
    levy_status: string;
  };
};

export default LevyRequest;
