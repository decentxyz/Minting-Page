import { useContext, createContext, Dispatch, SetStateAction, ReactNode, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { ChainId, TokenInfo, ethGasToken } from "@decent.xyz/box-hooks";
import { nftInfo } from "../utils/nftInfo";
import { useEffect, useRef } from "react";

export interface SourceContext {
  srcChainId: number;
  setSrcChainId: Dispatch<SetStateAction<ChainId>>;
  srcToken: TokenInfo;
  setSrcToken: Dispatch<SetStateAction<TokenInfo>>;
};

export const SourceContext = createContext<SourceContext>({
  srcChainId: nftInfo.dstChainId,
  setSrcChainId: () => {},
  srcToken: ethGasToken,
  setSrcToken: () => {},
});

export const SourceContextProvider = ({ children }: { children: ReactNode }) => {
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [srcChainId, setSrcChainId] = useState(chain?.id || ChainId.OPTIMISM);
  const [srcToken, setSrcToken] = useState(ethGasToken);

  const prevSrcChainId = useRef<number | undefined>();
  const prevChainId = useRef<number | undefined>();

  useEffect(() => {
    async function updateChain() {
      if (chain && chain?.id !== srcChainId) {
        setSrcChainId(chain.id);
      }
      if (srcChainId !== prevSrcChainId.current && srcChainId !== chain?.id) {
        switchNetworkAsync?.(srcChainId);
      }
      prevSrcChainId.current = srcChainId;
      prevChainId.current = chain?.id;
    }
    updateChain();
  }, [chain, srcChainId, switchNetworkAsync, setSrcChainId]);

  return(
    <SourceContext.Provider value={{ srcChainId, setSrcChainId, srcToken, setSrcToken }}>
      {children}
    </SourceContext.Provider>
  );
};

export const useSourceContext = () => useContext(SourceContext);