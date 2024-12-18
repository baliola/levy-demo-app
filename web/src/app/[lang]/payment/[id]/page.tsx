/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import type { ReactElement } from "react";
import React, { useEffect } from "react";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton copy";
import PrimaryInput from "@/components/input/PrimaryInput";
import { useLevy } from "@/hooks/levy/use_levy";
import { formatDateOnly } from "@/utils";

const Payment = (): ReactElement => {
  const params = useParams();

  const router = useRouter();

  const {
    levyDetail,
    setLevyId,
    updateLevy,
    levyId,
    isLoadingUpdateLevy,
    paymentMethodData,
  } = useLevy();

  useEffect(() => {
    setLevyId((params as any).id);
  }, [params]);

  const handleSubmit = (): void => {
    updateLevy({ id: levyId ?? "", voucher_status: "PAID" });
  };

  return (
    <div className="p-20 flex justify-center items-center w-full h-full bg-gray-400">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 w-1/3 ">
        <div className="flex flex-col w-full p-6">
          <p className="text-xl font-bold">Payment Confirmation</p>

          <div className="flex flex-col space-y-4 mt-6">
            <PrimaryInput
              label="No. Passport"
              value={levyDetail?.data.user.no_passport ?? ""}
              disabled
            />
            <PrimaryInput
              label="Name"
              value={levyDetail?.data.user.name ?? ""}
              disabled
            />
            <PrimaryInput
              label="Email"
              value={levyDetail?.data.user.email ?? ""}
              disabled
            />
            <PrimaryInput
              label="Arrival Date"
              value={formatDateOnly(
                levyDetail?.data.user.arrival_date ?? new Date().toISOString()
              )}
              disabled
            />
            <PrimaryInput label="Total Price" value={"Rp 25.000"} disabled />
            <PrimaryInput
              label="Payment Method"
              value={paymentMethodData?.label ?? "BCA"}
              disabled
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-8 sm:px-8">
          <SecondaryButton
            label="Back"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          />
          <PrimaryButton
            label="Continue To Pay"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            loading={isLoadingUpdateLevy}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
