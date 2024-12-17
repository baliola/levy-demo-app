/// <reference types="react-scripts" />
import { ExternalProvider } from "@ethersproject/providers";

interface InjectedWeb3 {
  "polkadot-js"?: {
    metadata?: {
      provide: (metadata: {
        chain: string;
        icon: string;
        decimals: number;
        symbol: string;
        upgrade?: { from: number; to: number };
      }) => void;
    };
  };
}

declare global {
  interface Window {
    ethereum?: ExternalProvider;
    injectedWeb3?: InjectedWeb3;
  }
}
