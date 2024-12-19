import * as Yup from "yup";

// Function to get today's date at midnight
const getStartOfToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00
  return today;
};

const levyValidation = Yup.object().shape({
  user: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    no_passport: Yup.string().required("Passport number is required"),
    arrival_date: Yup.date()
      .required("Arrival date is required")
      .min(getStartOfToday(), "Arrival date must be today or in the future"),
  }),
  levy: Yup.object().shape({
    voucher_code: Yup.string().required("Voucher code is required"),
    levy_expired_at: Yup.date()
      .required("Levy expiration date is required")
      .min(new Date(), "Levy expiration date must be in the future"),
    levy_status: Yup.string()
      .oneOf(["ACTIVE", "UNPAID"], "Invalid levy status")
      .required("Levy status is required"),
  }),
});

export default levyValidation;
