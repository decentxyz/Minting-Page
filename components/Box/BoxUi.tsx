import {
  ChainSelector,
  TokenSelector,
} from "@decent.xyz/box-ui";
import { useSourceContext } from "./contexts/SourceContext";
import { ChainId } from "@decent.xyz/box-ui";
import { useAccount } from "wagmi";

// NOTE: this section I believe you have your own designs for; however, including here for comple

const SourceSelectors = () => {
  const { srcChainId, setSrcChainId, srcToken, setSrcToken } = useSourceContext();
  const { address: sender } = useAccount();

  return (
    <>
      <div className='space-y-2 mb-4 flex items-center gap-8'>
        <ChainSelector srcChainId={srcChainId} setSrcChainId={setSrcChainId} chains={[ChainId.ETHEREUM, ChainId.ARBITRUM, ChainId.OPTIMISM, ChainId.POLYGON, ChainId.BASE]} />
        
        <TokenSelector selectedToken={srcToken} setSelectedToken={setSrcToken} chainId={srcChainId} address={sender} />
      </div>
    </>
  )
}

export default SourceSelectors;