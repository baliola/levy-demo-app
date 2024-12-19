"use client";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import RadioInput from "@/components/input/RadioInput";
import { useAuth } from "@/hooks/auth/use_auth";
import { useLevy } from "@/hooks/levy/use_levy";
import type LevyRequest from "@/services/data/request/levy/levy_request";
import type PaymentMethod from "@/types/payment_method";
import levyValidation from "../validation/levy_validation";

const ExemptionForm: React.FC = () => {
  const { isLoadingLevy, levy, setPaymentMethod } = useLevy();
  const { login } = useAuth();

  // Get the current date
  const currentDate = new Date();

  // Set the expiration date to one month later
  const levyExpiredAt = new Date(currentDate);
  levyExpiredAt.setMonth(currentDate.getMonth() + 1);

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChangePaymentMethod = (paymentMethod: PaymentMethod): void => {
    setSelectedValue(paymentMethod.value);
    setPaymentMethod(paymentMethod);
  };

  const [levyRequest, setLevyRequest] = useState<LevyRequest>({
    levy: {
      levy_status: "UNPAID",
      levy_expired_at: levyExpiredAt.toISOString(),
      voucher_code: `LEVY${getRandomInt(0, 1000)}`,
    },
    user: {
      arrival_date: new Date().toISOString(),
      email: "",
      name: "",
      no_passport: "",
    },
  });

  const handleSubmitLevy = (request: LevyRequest): void => {
    levy(request);
  };

  useEffect(() => {
    login({ email: "levydemo@test.com", password: "p9D3iISGPSttoWB" });
  }, []);

  return (
    <div className="p-10">
      {/* <h1 className="text-2xl font-bold mb-4">Exemption Form</h1>
      <div className="mb-4">
        {`Please enter the applicant's detail.`}
        <br />
        {`For multiple applicants, click "Add More Applicant". (Max 9 applicants)`}
      </div> */}

      <div className="flex xl:flex-row flex-col flex-wrap w-full mt-14">
        <Formik
          initialValues={levyRequest}
          onSubmit={handleSubmitLevy}
          validationSchema={levyValidation}
          suppressHydrationWarning={true}
        >
          {({ errors, handleChange, handleSubmit, values }) => (
            <Form className="bg-white xl:w-1/2 w-full  rounded-lg shadow-sm ring-1 ring-gray-900/5 p-4 mr-10 mb-10">
              <h2 className="text-lg font-bold mb-2">Tourist Levy Form</h2>

              <div className="mb-4">
                <PrimaryInput
                  label="Passport Number"
                  placeholder="Axxxxxx"
                  value={values.user.no_passport}
                  onChange={handleChange("user.no_passport")}
                  error={errors.user?.no_passport ?? undefined}
                />
              </div>

              <div className="mb-4">
                <PrimaryInput
                  label="Name"
                  placeholder="Same as Passport"
                  value={values.user.name}
                  onChange={handleChange("user.name")}
                  error={errors.user?.name ?? undefined}
                />
              </div>

              <div className="mb-4">
                <PrimaryInput
                  type="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  value={values.user.email}
                  onChange={handleChange("user.email")}
                  error={errors.user?.email ?? undefined}
                />
              </div>

              <div className="mb-4">
                <PrimaryInput
                  type="date"
                  label="Arrival Date"
                  value={values.user.arrival_date}
                  onChange={handleChange("user.arrival_date")}
                  error={errors.user?.arrival_date ?? undefined}
                />
              </div>

              <div className="mb-4">
                <PrimaryInput
                  type="text"
                  label="Voucher Code"
                  placeholder="LEVY***"
                  disabled
                  value={values.levy.voucher_code}
                  onChange={handleChange("levy.voucher_code")}
                  error={errors.levy?.voucher_code ?? undefined}
                />
              </div>
              <div className="mb-4">
                <PrimaryInput
                  label="Total Price"
                  value={"Rp 25.000"}
                  disabled
                />
              </div>

              <div className="p-4 space-y-4">
                <RadioInput
                  label="VISA"
                  value="visa"
                  checked={selectedValue === "visa"}
                  onChange={(e) => {
                    handleChangePaymentMethod({ label: "VISA", value: e });
                  }}
                />
                <RadioInput
                  label="Master Card"
                  value="mastercard"
                  checked={selectedValue === "mastercard"}
                  onChange={(e) => {
                    handleChangePaymentMethod({
                      label: "Master Card",
                      value: e,
                    });
                  }}
                />
                <RadioInput
                  label="BCA"
                  value="bca"
                  checked={selectedValue === "bca"}
                  onChange={(e) => {
                    handleChangePaymentMethod({ label: "BCA", value: e });
                  }}
                />
                <RadioInput
                  label="BPD Bali Channel"
                  value="bpd"
                  checked={selectedValue === "bpd"}
                  onChange={(e) => {
                    handleChangePaymentMethod({
                      label: "BPD Bali Channel",
                      value: e,
                    });
                  }}
                />
                <RadioInput
                  label="Bank Transfer"
                  value="transfer"
                  checked={selectedValue === "transfer"}
                  onChange={(e) => {
                    handleChangePaymentMethod({
                      label: "Bank Transfer",
                      value: "transfer",
                    });
                  }}
                />
                <RadioInput
                  label="QRIS"
                  value="qris"
                  checked={selectedValue === "qris"}
                  onChange={(e) => {
                    handleChangePaymentMethod({ label: "QRIS", value: e });
                  }}
                />
              </div>

              <div className="mb-4">
                <PrimaryButton
                  label="Pay Now"
                  onSubmit={handleSubmit}
                  loading={isLoadingLevy}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ExemptionForm;
