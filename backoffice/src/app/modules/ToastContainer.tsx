"use client"

import type { ReactElement } from "react";
import { Bounce, ToastContainer as Toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContainer = (): ReactElement => {
  return (
    <Toast
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      transition={Bounce}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
  )
}