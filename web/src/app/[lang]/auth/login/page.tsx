import type { ReactElement } from "react";
import React from "react";
import LoginForm from "./components/LoginForm";
import { getDictionary, type Locale } from "../../dictionaries";

const LoginPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<ReactElement> => {
  const t = await getDictionary(lang);

  return (
    <div className="p-20 flex justify-center items-center w-full h-full">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
