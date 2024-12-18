"use client";

import React from "react";
import PrimaryInput from "@/components/input/PrimaryInput";
import Images from "@/constants/images";

const LoginForm = () => {
  return (
    <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 w-1/3 ">
      <div className="px-4 py-6 sm:p-8 flex flex-col items-center justify-center">
        <img alt="" src={Images.logo} className="size-32 object-scale-down" />
        <p className="text-2xl mb-4">Login</p>
        <div className="w-full flex-col flex space-y-6">
          <PrimaryInput
            label="Email"
            value={""}
            onChange={(e) => {}}
            type="email"
          />
          <PrimaryInput
            label="Password"
            value={""}
            onChange={(e) => {}}
            type="password"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-1/2"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
