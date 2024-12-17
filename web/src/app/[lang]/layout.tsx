import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Locale } from "./dictionaries";
import { getDictionary } from "./dictionaries";
import MainTemplate from "./modules/MainTemplate";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>): Promise<ReactNode> {
  const t = await getDictionary(params.lang);

  return (
    <MainTemplate
      params={{ t: t, className: inter.className, lang: params.lang }}
    >
      {children}
    </MainTemplate>
  );
}
