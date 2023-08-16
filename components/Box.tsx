import { TheBox, ActionType } from "@decent.xyz/the-box";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount } from "wagmi";
import { getContractFee } from "../lib/getContractFee";
import { parseUnits } from "viem";

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const mintPrice = parseFloat(props.constants.mintPrice);
  const chainId = props.constants.chainId;
  const contractFee:number = chainId && getContractFee(chainId);
  const total = (mintPrice + contractFee) * quantity;
  const price = total.toString();

  return <div>
    <TheBox
      className=""
      paymentButtonText={`Mint ${quantity}`}
      actionType={ActionType.NftPreferMint}
      actionConfig={{
        contractAddress: props.constants.address,
        chainId: props.constants.chainId,
        // --- 
        signature: "function mint(address to,uint256 numberOfTokens) payable",
        args: [account, quantity],
        //---
        cost: {
          isNative: true,
          amount: parseUnits(price, 18),
        },
        supplyConfig: {
          sellOutDate: props.constants.sellOutDate
        }
      }}
      onTxPending={() => props.setIsOpen(false)}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
    <div className="px-4">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10} />
    </div>
  </div>
};

export default Box;