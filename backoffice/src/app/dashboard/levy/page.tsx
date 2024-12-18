"use client";

import Image from "next/image";
import { type ReactElement, useEffect } from "react";
import RestrictedPage from "@/src/components/RestrictedPage";
import { PermissionName } from "@/src/config/data";
import Images from "@/src/constants/images";
import useAccount from "@/src/hooks/useAccount";
import { useCentralStore } from "@/src/store";
import { checkUserPermission } from "@/src/utils";
import { AccountTable } from "./components/AccountTable";
import { FilterAccount } from "./components/FilterAccount";
import { ModalAddAccount } from "./components/ModalAddAccount";
import { SearchAccount } from "./components/SearchAccount";
import { SortAccount } from "./components/SortAccount";
import StatItem from "./components/StatsItem";
import { CiCircleCheck } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Account(): ReactElement {
  const {
    pageAccount,
    limitAccount,
    totalAccount,
    accountSortIsAscending,
    accountSelectedSort,
    accountInputValue,
    accountSearchQuery,
    accountSelectedRoleFilter,
    accounts,
    accountRoleOptions,
    accountSortOptions,
    showFilterRoleModal,
    showSortModal,
    loadingStatus,
    selectedAccount,
    setPageAccount,
    setAccountInputValue,
    setAccountSearchQuery,
    setAccountSelectedRoleFilter,
    setAccountSortIsAscending,
    setAccountSelectedSort,
    setShowFilterRoleModal,
    setShowSortModal,
    getAccountList,
    getAccountRoleOptions,
    createAccount,
    editAccountRole,
    activateAccount,
    deactivateAccount,
    deleteAccount,
    getAccountProfile,
  } = useAccount();

  const { userLoggedIn } = useCentralStore();

  useEffect(() => {
    if (userLoggedIn) {
      if (
        checkUserPermission(
          userLoggedIn,
          PermissionName.PERMISSION_BACKOFFICE_SHOW_ACCOUNT
        )
      ) {
        getAccountRoleOptions();
        getAccountList({
          page: pageAccount,
          limit: limitAccount,
          sort: accountSelectedSort,
          order: accountSortIsAscending ? "asc" : "desc",
          search: accountSearchQuery,
          filter: accountSelectedRoleFilter.name,
        });
      }
    } else {
      getAccountProfile();
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (accountSelectedRoleFilter.name !== "" || accountSearchQuery !== "")
      setPageAccount(1);
  }, [accountSelectedRoleFilter, accountSearchQuery]);

  return (
    <main className="overflow-x-hidden min-h-[calc(100vh-6rem)]">
      <div className="p-6 sm:p-8 lg:p-12 flex flex-col gap-y-6 lg:gap-y-10 h-full">
        {userLoggedIn !== undefined ? (
          <>
            <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 sm:gap-x-2">
              <StatItem
                props={{
                  name: `Paid`,
                  icon: FaRegCheckCircle,
                  value: "1000",
                  isTime: true,
                }}
              />{" "}
              <StatItem
                props={{
                  name: `Unpaid`,
                  icon: ImCancelCircle,
                  value: "10",
                  isTime: true,
                }}
              />{" "}
            </div>
            {checkUserPermission(
              userLoggedIn,
              PermissionName.PERMISSION_BACKOFFICE_SHOW_ACCOUNT
            ) ? (
              <>
                <div className="flex flex-col lg:flex-row gap-3 items-end"></div>
                <AccountTable
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
                />
              </>
            ) : (
              <RestrictedPage />
            )}
          </>
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
      </div>
    </main>
  );
}
