import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { navigation } from "@/src/config/data";
import { useCentralStore } from "@/src/store";
import { checkUserPermission, classNames } from "@/src/utils";

const RedirectList = (): ReactElement => {
  const pathname = usePathname();
  const { userLoggedIn, setIsSidebarOpen } = useCentralStore()

  const getClassName = (pathname: string, href: string): string => {
    return classNames(
      pathname === href
        ? "bg-gradient-active-sidebar text-primary"
        : "text-primary hover:bg-gradient-active-sidebar hover:text-primary",
      "group flex gap-x-3 rounded-md p-2 text-base font-medium leading-6 capitalize"
    );
  };

  const getIcon = (
    item: {
      name: string;
      href: string;
      blank: boolean;
      current: boolean;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    },
    pathname: string
  ): ReactElement => {
    return (
      <item.icon
        aria-hidden="true"
        className={classNames(
          pathname === item.href
            ? ""
            : "group-hover:text-primary",
          "h-6 w-6 shrink-0 text-primary"
        )}
      />
    );
  };

  return (
    <ul role="list" className="space-y-3">
      {navigation.filter((item) => (
        !item.hidden
      )).map((item) => (
        <li key={item.name}>
          {
            checkUserPermission(userLoggedIn, item.permission ?? '') &&
              <Link
                href={item.href}
                className={getClassName(pathname, item.href)}
                target={`${item.blank ? "_blank" : "_self"}`}
                onClick={() => { setIsSidebarOpen(false) }}
              >
                {getIcon(item, pathname)}
                {item.name}
              </Link>
          }
        </li>
      ))}
    </ul>
  );
};

export default RedirectList;
