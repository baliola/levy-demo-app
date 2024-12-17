import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import type { ReactElement } from "react";
import "./globals.css";
import { ToastContainer } from "./modules/ToastContainer";

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Mandala Hub CMS",
  description: "Content Management System for manage assets in Mandala Chain Hub",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html>
      <body className={`${inter.className} h-screen`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
