/* eslint-disable no-unused-vars */

import { FolderIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import type { INavigationItem } from "../types";

export enum RoleName {
  SUPER_ADMIN = "Super Admin",
  ADMIN = "Admin",
}

export enum PermissionName {
  // CMS Permission
  PERMISSION_BACKOFFICE_SHOW_PROJECT = "permission-backoffice-show-project",
  PERMISSION_BACKOFFICE_CREATE_PROJECT = "permission-backoffice-create-project",
  PERMISSION_BACKOFFICE_UPDATE_PROJECT = "permission-backoffice-update-project",
  PERMISSION_BACKOFFICE_DELETE_PROJECT = "permission-backoffice-delete-project",

  // Account Permission
  PERMISSION_BACKOFFICE_SHOW_ACCOUNT = "permission-backoffice-show-account",
  PERMISSION_BACKOFFICE_CREATE_ACCOUNT = "permission-backoffice-create-account",
  PERMISSION_BACKOFFICE_UPDATE_ACCOUNT = "permission-backoffice-update-account",
  PERMISSION_BACKOFFICE_DELETE_ACCOUNT = "permission-backoffice-delete-account",
  PERMISSION_BACKOFFICE_RESET_ACCOUNT_PASSWORD = "permission-backoffice-reset-account-password",
}

export const navigation: INavigationItem[] = [
  {
    name: "login",
    href: "/auth/login",
    blank: false,
    current: false,
    icon: FolderIcon,
    hidden: true,
  },
  {
    name: "Penida Voucher",
    href: "/dashboard/penida-voucher",
    blank: false,
    current: false,
    icon: UserGroupIcon,
    permission: PermissionName.PERMISSION_BACKOFFICE_SHOW_ACCOUNT,
  },
];

export const forbiddenPage = {
  title: "Access to this page is restricted",
  description: "Please contact admin for any further information.",
};
