/* eslint-disable indent */
import { ethers } from "ethers";
import type { ToastOptions } from "react-toastify";
import { Bounce, toast } from "react-toastify";
import type { Locale } from "@/app/[lang]/dictionaries";
import { navigation } from "@/config/data";
import StorageKey from "@/constants/storageKey";
import LocalStorage from "@/services/storage/localStorage";
import type { TypeToastStatus } from "@/types";

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const getThemeHandler = ({
  setIsDarkMode,
}: {
  setIsDarkMode: (value: boolean) => void;
}): void => {
  const isDarkMode = LocalStorage.get(StorageKey.IS_DARK_MODE) === "true";
  setIsDarkMode(isDarkMode);

  if (isDarkMode) {
    if (!document.body.classList.contains("dark")) {
      document.body.classList.toggle("dark");
      return;
    }
  } else {
    if (document.body.classList.contains("dark")) {
      document.body.classList.toggle("dark");
      return;
    }
  }
};

export const changeThemeHandler = ({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}): void => {
  setIsDarkMode(!isDarkMode);
  LocalStorage.set(StorageKey.IS_DARK_MODE, `${!isDarkMode}`);
  document.body.classList.toggle("dark");
};

export const getPathname = (href: string): string => {
  if (href === "/en" || href === "/id") {
    return "/";
  }

  return href.slice(3);
};

export const getPageName = (href: string): string => {
  href = removeLocaleFromPath(href);

  const names = navigation.filter((item) => {
    if (item.href === removeLocaleFromPath(href)) {
      return item.name;
    }
  });

  return names[0].name ?? "";
};

export const removeLocaleFromPath = (path: string): string => {
  const validLocales: Locale[] = ["en", "id"];
  const normalizedPath = path.replace(/^\/|\/$/g, "");
  const segments = normalizedPath.split("/");

  if (validLocales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  return `/${segments.join("/")}`;
};

export const capitalizeEachWord = (str: string): string => {
  return str
    .toLowerCase()
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatNumberWithDots = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatMillisecondsToSeconds = (milliseconds: number): string => {
  const seconds = milliseconds / 1000;
  return `${seconds.toFixed(2)} s`;
};

export const formatBalance = (value: bigint, fixed?: boolean): string => {
  if (fixed) return parseFloat(ethers.utils.formatEther(value)).toFixed(3);

  return `${parseFloat(ethers.utils.formatEther(value))}`;
};

export function truncateAddress(address: string): string {
  const start = address.slice(0, 6);
  const end = address.slice(-6);

  return `${start}.....${end}`;
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}

export function showToast({
  isDark,
  message,
  status,
}: {
  message: string;
  isDark: boolean;
  status: TypeToastStatus;
}): void {
  const toastOption: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: isDark ? "dark" : "light",
    transition: Bounce,
  };

  switch (status) {
    case "success":
      toast.success(message, toastOption);
      break;
    case "warn":
      toast.warn(message, toastOption);
      break;
    case "error":
      toast.error(message, toastOption);
      break;
    case "info":
      toast.info(message, toastOption);
      break;
    default:
      toast.info(message, toastOption);
      break;
  }
}
