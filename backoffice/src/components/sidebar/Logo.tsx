import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import Images from "@/src/constants/images";

const Logo = (): ReactElement => {
  const version = 'v1.1.0'
  return (
    <div className="flex h-16 shrink-0 items-center">
      <Link 
        href={'https://www.mandalachain.io/'} 
        target="_blank"
        className="w-full flex items-center gap-x-4"
      >
        <Image
          alt="Mandala Chain"
          title="Mandala Chain"
          src={Images.mandalaChainLogo}
          width={50}
          height={50}
        />
        <span className="flex flex-col justify-center uppercase text-[#1364F1] w-full">
          <span className="font-bold mx-auto tracking-[0.3em] leading-4 text-xl">Mandala</span>
          <span className="w-full flex relative">
            <span className="mx-auto text-xs font-semibold tracking-widest">Chain</span>
            <span className="absolute right-2 lg:right-4 bottom-0 text-[9px] mx-auto">{version}</span>
          </span>
        </span>
      </Link>
    </div>
  )
}

export default Logo