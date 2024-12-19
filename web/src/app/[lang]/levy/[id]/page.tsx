/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import type { ReactElement } from "react";
import React, { useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import PrimaryButton from "@/components/button/PrimaryButton";
import Images from "@/constants/images";
import { useLevy } from "@/hooks/levy/use_levy";
import { formatDateOnly } from "@/utils";

const LevyPage = (): ReactElement => {
  const params = useParams();

  const { levyDetail, setLevyId } = useLevy();

  useEffect(() => {
    setLevyId((params as any).id);
  }, [params]);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Levy_voucher_${(params as any).id}`,
    pageStyle: `
      @page {
        size: 210mm 297mm;  /* A4 size */
        margin: 0;
      }
      @media print {
        body {
          height: 100vh;
          margin: 0;
        }
       
      }
    `,
  });

  useEffect(() => {
    if (levyDetail?.data) {
      handlePrint();
    }
  }, [levyDetail?.data]);

  return (
    <div className="bg-gray-400 pb-10">
      <div className="p-10 flex flex-col justify-center items-center w-full">
        {levyDetail?.data && (
          <PrimaryButton
            label="Download"
            onClick={handlePrint}
            className="w-1/4"
          />
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="xl:w-1/2 xl:px-0 px-10">
          {levyDetail?.data && (
            <div ref={componentRef} className="h-full">
              {/* <Page size="A4"> */}
              <div className="flex flex-col justify-between items-center bg-white border border-gray-300 rounded-lg overflow-hidden h-full">
                <div className="flex flex-col items-center p-5 w-3/4">
                  <img
                    src={Images.logoBali}
                    alt="Bali Logo"
                    className="w-32 h-20 object-contain"
                  />
                  <h1 className="text-lg font-bold mt-3">Levy Voucher!</h1>
                  <p className="text-sm mb-5 text-center">
                    {` Protect Bali's Paradise: Your Contribution Matters`}
                  </p>

                  <div className="flex my-8">
                    <QRCode
                      size={256}
                      value={
                        levyDetail.data.onchain_url ??
                        "https://nbs-explorer.mandalachain.io/tx/0x3d126d9ea3d83d4237758d66cfba1875b60b2d69e1380798d8f14ca4fa94fe8c"
                      }
                    />
                  </div>
                  <div className="flex flex-col w-full mt-10">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-sm w-2/5">
                        No Passport:
                      </span>
                      <span className="text-sm">
                        {levyDetail.data.user.no_passport}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-sm w-2/5">Email:</span>
                      <span className="text-sm">
                        {levyDetail.data.user.email}
                      </span>
                    </div>{" "}
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-sm w-2/5">Name:</span>
                      <span className="text-sm">
                        {levyDetail.data.user.name}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-sm w-2/5">
                        Arrival Date:
                      </span>
                      <span className="text-sm">
                        <span className="text-sm">
                          {formatDateOnly(
                            levyDetail.data.user.arrival_date ??
                              new Date().toISOString()
                          )}
                        </span>{" "}
                      </span>
                    </div>{" "}
                  </div>
                </div>

                <div className="w-full mt-4">
                  <img
                    src={Images.levyFooter}
                    alt="Levy Footer"
                    className="w-full object-cover"
                  />
                </div>
              </div>
              {/* </Page>{" "} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevyPage;
