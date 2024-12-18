"use client";

import { Form, Formik } from "formik";
import type { ReactElement } from "react";
import React, { useState } from "react";
import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import Images from "@/constants/images";
import { useAuth } from "@/hooks/auth/use_auth";
import type LoginRequest from "@/services/data/request/auth/login_request";
import loginValidation from "../validation/login_validation";

const LoginForm = (): ReactElement => {
  const { isLoadingLogin, login } = useAuth();

  const [request, setRequest] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleLogin = (requestLogin: LoginRequest): void => {
    login(requestLogin);
  };

  return (
    <Formik
      initialValues={request}
      onSubmit={handleLogin}
      validationSchema={loginValidation}
      suppressHydrationWarning={true}
    >
      {({ errors, handleChange, handleSubmit, values }) => (
        <Form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 w-1/3 ">
          <div className="px-4 py-6 sm:p-8 flex flex-col items-center justify-center">
            <img
              alt=""
              src={Images.logo}
              className="w-32 h-20 object-scale-down"
            />

            <p className="text-2xl mb-4">Login</p>
            <div className="w-full flex-col flex space-y-6">
              <PrimaryInput
                label="Email"
                value={values.email}
                error={errors.email ?? undefined}
                onChange={handleChange("email")}
                type="email"
              />
              <PrimaryInput
                label="Password"
                value={values.password}
                error={errors.password ?? undefined}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-8 sm:px-8">
            <PrimaryButton
              label="Login"
              onSubmit={handleSubmit}
              loading={isLoadingLogin}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
