import React, { useEffect } from "react";
import type { DataDetailLevy } from "@/src/interfaces/levy.interface";
import { useLevy } from "@/src/hooks/useLevy";
import { Skeleton } from "@/src/components/skeleton/Skeleton";

const LevyDetail = ({ id }: { id: string }): React.ReactElement => {
  const { levyDetail, fetchLevyDetail, loading } = useLevy();

  useEffect(() => {
    // if (id) {
    fetchLevyDetail(id);
    return;
    // }
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      {/* {loading &&  flow} */}
      {levyDetail && (
        <div className="flex flex-col">
          {/* User Information */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Name:</label>
            <p className="text-gray-700">{levyDetail.user.name}</p>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Email:</label>
            <p className="text-gray-700">{levyDetail.user.email}</p>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Passport Number:</label>
            <p className="text-gray-700">{levyDetail.user.no_passport}</p>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Arrival Date:</label>
            <p className="text-gray-700">
              {new Date(levyDetail.user.arrival_date).toLocaleDateString()}
            </p>
          </div>

          {/* Levy Information */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Voucher Code:</label>
            <p className="text-gray-700">{levyDetail.levy.voucher_code}</p>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Levy Expiry Date:</label>
            <p className="text-gray-700">
              {new Date(levyDetail.levy.levy_expired_at).toLocaleDateString()}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold">Levy Status:</label>
            <p
              className={`text-white px-3 py-1 max-w-24 rounded ${
                levyDetail.levy.levy_status === "UNPAID"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {levyDetail.levy.levy_status}
            </p>
          </div>

          {/* Signature */}
          {/* <div className="mb-4">
            <label className="text-sm font-semibold">Signature:</label>
            <p className="text-gray-700 break-words">{levyDetail.signature}</p>
          </div> */}

          {/* Transaction Histories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Transaction Histories</h3>
            {levyDetail.transaction_histories.map((transaction, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-4 bg-gray-100 shadow-sm"
              >
                <div className="mb-2">
                  <label className="text-sm font-semibold">Status:</label>
                  <p className="text-gray-700">{transaction.status}</p>
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold">Created At:</label>
                  <p className="text-gray-700">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold">Asset Hash:</label>
                  <p className="text-gray-700 break-words">
                    {transaction.asset_hash}
                  </p>
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold">
                    Transaction Hash:
                  </label>
                  <p className="text-gray-700 break-words">
                    {transaction.transaction_hash}
                  </p>
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold">Onchain URL:</label>
                  <a
                    href={transaction.onchain_url}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Transaction
                  </a>
                </div>
                <div className="mb-2">
                  <label className="text-sm font-semibold">Algorithm:</label>
                  <p className="text-gray-700">{transaction.algorithm}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold">Signature:</label>
                  <p className="text-gray-700 break-words">
                    {transaction.signature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LevyDetail;
