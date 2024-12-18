"use client";

import type { ReactElement } from "react";
import React from "react";
import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import Images from "@/constants/images";
import { useAuth } from "@/hooks/auth/use_auth";

const LoginForm = (): ReactElement => {
  const { isLoadingLogin, login } = useAuth();

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
        <PrimaryButton
          label="Login"
          onSubmit={(e) => {}}
          loading={isLoadingLogin}
        />
      </div>
    </form>
  );
};

export default LoginForm;
