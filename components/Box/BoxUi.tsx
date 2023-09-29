import {
  ChainSelector,
  TokenSelector,
  TokenInfo
} from "@decent.xyz/box-ui";
import { useSourceContext } from "./contexts/SourceContext";
import { ChainId } from "@decent.xyz/box-ui";

const SourceSelectors = () => {
  const { srcChainId, setSrcChainId, srcToken, setSrcToken } = useSourceContext();

  return (
    <>
      <div className='space-y-2 mb-4 flex items-center gap-8'>
        {/* Headless network selector so can style accordingly; know this might not factor into Unlock designs */}
        <ChainSelector srcChainId={srcChainId} setSrcChainId={setSrcChainId} chains={[ChainId.ETHEREUM, ChainId.ARBITRUM, ChainId.OPTIMISM, ChainId.POLYGON, ChainId.BASE]} />
        
        {/* Similarly: headless token selector, returning user's balances on each chain.  Know this might not directly factor into Unlock designs, but you will likely want to use our method of retreiving token balances */}
        {tokens && <TokenSelector srcToken={srcToken} setSrcToken={setSrcToken} tokens={tokens} />}
      </div>
    </>
  )
}

export default SourceSelectors;