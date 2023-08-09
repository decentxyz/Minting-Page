import { TheBox, ActionType, ChainId } from "@decent.xyz/the-box";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount } from "wagmi";
import { getContractFee } from "../lib/getContractFee";
import { parseUnits } from "viem";

{/* IMPORTANT UPDATE: need to make sure the mint params are valid for your NFT.  The information below is works for all Decent NFTs & should serve as a good example of what correct inputs look like.  If you are using a Decent NFT, you do not need to change this!  If you are not, then you do need to update the abi and params -- the rest of the information SHOULD be set in getStaticProps on index.tsx, but be sure to double check. */}

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const mintPrice = parseFloat(props.constants.mintPrice);
  const chainId = props.constants.chainId;
  const contractFee:number = chainId && getContractFee(chainId);
  const total = (mintPrice + contractFee) * quantity;
  const price = total.toString();

  return <div>
    <div className='text-xl font-[400] pb-4'>Mint:</div>
    {/* Can delete maxQuantity if you do not want to limit the number of NFTs a person can mint at once */}
    <div className="pb-6">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10} />
    </div>
    {/* ----------------------------------------------------------- */}
    <TheBox
      className="rounded-lg border shadow-md bg-white dark"
      paymentButtonText="Pay now"
      actionType={ActionType.NftMint}
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
      }}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
    {/* ----------------------------------------------------------- */}
  </div>
};

export default Box;