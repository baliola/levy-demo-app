"use client";

import Image from "next/image";
import { type ReactElement, useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { PiMoneyWavy } from "react-icons/pi";
import RestrictedPage from "@/src/components/RestrictedPage";
import { PermissionName } from "@/src/config/data";
import Images from "@/src/constants/images";
import useAccount from "@/src/hooks/useAccount";
import { useLevy } from "@/src/hooks/useLevy";
import { useCentralStore } from "@/src/store";
import { checkUserPermission } from "@/src/utils";
import { AccountTable } from "./components/AccountTable";
import { FilterAccount } from "./components/FilterAccount";
import type { StatusFilter } from "./components/FilterLevyStatus";
import { FilterLevy } from "./components/FilterLevyStatus";
import { LevyTable } from "./components/LevyTable";
import { ModalAddAccount } from "./components/ModalAddAccount";
import { SearchAccount } from "./components/SearchAccount";
import { SearchLevy } from "./components/SearchLevy";
import { SortAccount } from "./components/SortAccount";
import StatItem from "./components/StatsItem";

const accountLevyOptions: StatusFilter[] = [
  { id: 1, name: "unpaid" },
  { id: 2, name: "paid" },
];

export default function Account(): ReactElement {
  const {
    fetchLevyDetail,
    fetchLevyList,
    fetchTotalLevy,
    levyList,
    limitLevy,
    loading,
    pageLevy,
    selectedLevy,
    setLevyList,
    setLimitLevy,
    setPageLevy,
    setSelectedLevy,
    setTotalLevy,
    levySearchQuery,
    totalLevy,
    totalSummary,
    levySortIsAscending,
    levyInputValue,
    levySelectedSort,
    levyDetail,
    setLevyInputValue,
    setLevySearchQuery,
    getLevyList,
    loadingSearch,
    setLoadingSearch,
    accountSelectedLevyFilter,
    setAccountSelectedLevyFilter,
    showFilterModal,
    setShowFilterModal,
  } = useLevy();

  useEffect(() => {
    fetchLevyList();
  }, [pageLevy]);
  console.log("levy", levyList);
  useEffect(() => {
    fetchTotalLevy();
  }, []);
  return (
    <main className="overflow-x-hidden min-h-[calc(100vh-6rem)]">
      <div className="p-6 sm:p-8 lg:p-12 flex flex-col gap-y-6 lg:gap-y-10 h-full">
        {/* {userLoggedIn !== undefined ? ( */}
        <>
          <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 sm:gap-x-2">
            <StatItem
              props={{
                name: `Total Retribution`,
                icon: FaRegFileAlt,
                value: totalSummary
                  ? (totalSummary?.total_retribution as unknown as string)
                  : "0",
                isTime: true,
              }}
            />{" "}
            <StatItem
              props={{
                name: `Total Paid`,
                icon: PiMoneyWavy,
                value: totalSummary
                  ? (totalSummary?.total_paid as unknown as string)
                  : "0",
                isTime: true,
              }}
            />{" "}
          </div>

          <>
            <div className="flex flex-col lg:flex-row gap-3 items-end">
              <div className="w-full">
                <SearchLevy
                  props={{
                    limitLevy,
                    levySortIsAscending,
                    levySelectedSort,
                    levyInputValue,
                    levySearchQuery,
                    setLevyInputValue,
                    setLevySearchQuery,
                    getLevyList,
                    loading,
                  }}
                />
              </div>
              <div className="w-full flex gap-3 items-end">
                <div className="grow">
                  <FilterLevy
                    props={{
                      accountLevyOptions,
                      levySearchQuery,
                      accountSelectedLevyFilter,
                      getLevyList,
                      levySelectedSort,
                      levySortIsAscending,
                      limitLevy,
                      setAccountSelectedLevyFilter,
                      setShowFilterModal,
                      showFilterModal,
                    }}
                  />
                </div>
                <div className="grow">
                  {/* <SortAccount
                    props={{
                      pageAccount,
                      limitAccount,
                      accountSortIsAscending,
                      accountSortOptions,
                      accountSelectedSort,
                      accountSearchQuery,
                      accountSelectedRoleFilter,
                      showSortModal,
                      setAccountSortIsAscending,
                      setAccountSelectedSort,
                      setShowSortModal,
                      getAccountList,
                    }}
                  /> */}
                </div>
              </div>
            </div>{" "}
            {!loading ? (
              <LevyTable
                props={{
                  levyList,
                  levySortIsAscending,
                  levySelectedSort,
                  levyInputValue,
                  levySearchQuery,
                  totalLevy,
                  pageLevy,
                  limitLevy,
                  loading,
                  selectedLevy,
                  setPageLevy,
                  getLevyList,
                }}
              />
            ) : (
              <div className="flex flex-col justify-between w-full h-full">
                <Image
                  src={Images.mandalaChainLoader}
                  alt="Loader"
                  width={100}
                  height={100}
                  className="m-auto"
                />
              </div>
            )}
            {/* <AccountTable
              props={{
                accounts,
                totalAccount,
                pageAccount,
                limitAccount,
                accountSortIsAscending,
                accountSelectedSort,
                accountInputValue,
                accountSearchQuery,
                accountSelectedRoleFilter,
                accountRoleOptions,
                loadingStatus,
                selectedAccount,
                setPageAccount,
                setAccountSearchQuery,
                setAccountInputValue,
                setAccountSelectedRoleFilter,
                getAccountList,
                createAccount,
                editAccountRole,
                activateAccount,
                deactivateAccount,
                deleteAccount,
              }}
            /> */}
          </>
        </>
        {/* ) : (
          <div className="flex flex-col justify-between w-full h-full">
            <Image
              src={Images.mandalaChainLoader}
              alt="Loader"
              width={100}
              height={100}
              className="m-auto"
            />
          </div>
        )} */}
      </div>
    </main>
  );
}
