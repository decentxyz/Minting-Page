import { TheBox } from "@decent.xyz/the-box";
import { ActionType, ChainId } from "@decent.xyz/box-common";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";

const Box = (props:any):JSX.Element => {
  
  const [quantity, setQuantity] = useState(1);
  const price = parseFloat(props.constants.mintPrice) * quantity;

  return <div className="max-w-[500px] text-sm">
    <TheBox
      className="bg-[#e5e7eb]"
      paymentButtonText={`Mint ${quantity}`}
      actionType={ActionType.NftMint}
      chains={[
        ChainId.OPTIMISM, 
        // ChainId.ZORA, 
        ChainId.BASE, 
        ChainId.ETHEREUM
      ]}
      actionConfig={{
        contractAddress: props.constants.address,
        chainId: props.constants.chainId,
        signature: "function mint(address to, uint256 numberOfTokens)",
        args: [props.account, quantity],
        cost: {
          isNative: true,
          amount: parseUnits(price.toString(), 18),
        },
        supplyConfig: {
          sellOutDate: props.constants.sellOutDate
        }
      }}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
    <div className="px-4">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={1000000} />
    </div>
  </div>
};

export default Box;