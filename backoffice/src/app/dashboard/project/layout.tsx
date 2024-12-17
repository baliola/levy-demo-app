import type { Metadata } from "next";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Project | Mandala Hub CMS"
};

export default function ProjectLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <>{children}</>
  );
}
