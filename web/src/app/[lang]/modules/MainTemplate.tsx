"use client";

import type { ReactNode } from "react";
import React from "react";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Bounce, ToastContainer } from "react-toastify";

import type { IDictionaries } from "@/types/dictionaries";

import type { Locale } from "../dictionaries";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const dehydratedState = dehydrate(queryClient);

const MainTemplate = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale; className: string; t: IDictionaries };
}>): ReactNode => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <html lang={params.lang}>
          <head>
            <title>{params.t.head.title}</title>
            <meta name="description" content={params.t.head.description} />
          </head>
          <body className={`${params.className} h-screen`}>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </body>
        </html>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MainTemplate;
