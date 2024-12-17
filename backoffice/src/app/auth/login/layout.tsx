import type { Metadata } from "next";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Login | Mandala Hub CMS"
};

export default function LoginLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <>{children}</>
  );
}
