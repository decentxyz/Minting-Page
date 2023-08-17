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

  const nftAddress = '0x9B97B5A22BCde0414b3b675D1161259366c47C32';
  const nftId = 2 // ID 2 off an 1155
  const proof = '0x0000000000000000000000000000000000000000000000000000000000000000' // no allowlist for this release
  const allocation = 1; 

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
        signature: "mint(address _nft_addr,uint256 _token_id,uint256 _num_mint,address _receiver,bytes32[] _proof,uint256 _allowlist_allocation)",
        args: [nftAddress, nftId, quantity, account, proof, allocation],
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