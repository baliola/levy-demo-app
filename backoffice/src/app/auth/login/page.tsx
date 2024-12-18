"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import Images from "@/src/constants/images";
import { useAuth } from "@/src/hooks/useAuth";
import { LoginForm } from "./components/LoginForm";

export default function Login(): ReactElement {
  const router = useRouter();

  const { showPassword, setShowPassword, handleLogin } = useAuth(router);

  return (
    <main className="h-screen w-screen bg-auth-bg bg-cover bg-bottom lg:bg-center flex select-none overflow-hidden">
      <div className="w-full h-full lg:px-32 bg-left-bottom lg:bg-center relative">
        <div className="flex my-auto h-full w-full">
          <div className="flex flex-col my-auto mx-auto w-[80%] justify-center items-center gap-y-12 h-fit">
            <div className="px-1 h-fit">
              {/* <Image 
                src={Images.authTitle}
                alt="Mandala Chain Hub CMS"
                width={100}
                height={100}
                className="w-[80%] lg:w-96 lg:px-8 mx-auto lg:ml-0 lg:mr-auto"
                draggable={false}
                priority
              /> */}
            </div>
            <LoginForm
              props={{
                showPassword,
                setShowPassword,
                handleLogin,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
