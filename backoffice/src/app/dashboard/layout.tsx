import type { ReactElement } from "react";
import { MainTemplate } from "./modules/MainTemplate";

export default function DashboardLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <MainTemplate>
      {children}
    </MainTemplate>
  );
}
