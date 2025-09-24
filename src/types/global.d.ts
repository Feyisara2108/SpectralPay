// export {};

// declare global {
//   interface Window {
//     starknet_argentX?: any;
//     starknet_braavos?: any;
//   }
// }




export {};

declare global {
  interface Window {
    starknet_argentX?: StarknetWindowObject;
    starknet_braavos?: StarknetWindowObject;
  }
}

// Minimal wallet interface (no any, just unknown if you no sabi the real type yet)
interface StarknetWindowObject {
  enable: () => Promise<void>;
  isConnected?: boolean;
  account?: {
    address: string;
    signMessage?: (msg: unknown) => Promise<unknown>;
  };
}
