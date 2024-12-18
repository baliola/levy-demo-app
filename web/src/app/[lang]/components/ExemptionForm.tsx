"use client";

import { Form, Formik } from "formik";
import React, { useState } from "react";
import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import { useLevy } from "@/hooks/levy/use_levy";
import levyValidation from "../validation/levy_validation";

const ExemptionForm: React.FC = () => {
  const { isLoadingLevy, levy } = useLevy();

  // Get the current date
  const currentDate = new Date();

  // Set the expiration date to one month later
  const levyExpiredAt = new Date(currentDate);
  levyExpiredAt.setMonth(currentDate.getMonth() + 1);

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [levyRequest, setLevyRequest] = useState<LevyRequest>({
    levy: {
      levy_status: "UNPAID",
      levy_expired_at: levyExpiredAt.toISOString(),
      voucher_code: `LEVY${getRandomInt(0, 100)}`,
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

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Exemption Form</h1>
      <div className="mb-4">
        {`Please enter the applicant's detail.`}
        <br />
        {`For multiple applicants, click "Add More Applicant". (Max 9 applicants)`}
      </div>

      <div className="flex xl:flex-row flex-col flex-wrap w-full mt-14">
        <Formik
          initialValues={levyRequest}
          onSubmit={handleSubmitLevy}
          validationSchema={levyValidation}
          suppressHydrationWarning={true}
        >
          {({ errors, handleChange, handleSubmit, values }) => (
            <Form className="bg-white xl:w-1/2 w-full  rounded-lg shadow-sm ring-1 ring-gray-900/5 p-4 mr-10 mb-10">
              <h2 className="text-lg font-bold mb-2">Applicant Detail</h2>

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
                  onChange={handleChange(".levy.voucher_code")}
                  error={errors.levy?.voucher_code ?? undefined}
                />
              </div>

              <div className="mb-4">
                <PrimaryButton
                  label="Apply"
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
