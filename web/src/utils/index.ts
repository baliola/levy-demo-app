/* eslint-disable indent */

import type { ToastOptions } from "react-toastify";
import { Bounce, toast } from "react-toastify";
import type { Locale } from "@/app/[lang]/dictionaries";
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
