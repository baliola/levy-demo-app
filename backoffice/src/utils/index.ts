import { navigation } from "../config/data";
import type { IUserLoggedInData } from "../interfaces/auth.interface";

export function classNames (...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const getPageName = (href: string): string => {
  const names = navigation.filter((item) => {
    if (item.href === href) {
      return item;
    }
  });

  return names[0].name ?? "";
};

export const checkUserPermission = (userLoggedIn: IUserLoggedInData | null | undefined, permission: string): boolean => {
  if (!userLoggedIn?.permissions) return false
  return Boolean(userLoggedIn?.permissions.includes(permission))
}