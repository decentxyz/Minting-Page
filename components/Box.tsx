import { TheBox } from "@decent.xyz/the-box";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount, useSigner } from "wagmi";
import { getContractFee } from "../lib/getContractFee";

{/* IMPORTANT UPDATE: need to make sure the mint params are valid for your NFT.  The information below is works for all Decent NFTs & should serve as a good example of what correct inputs look like.  If you are using a Decent NFT, you do not need to change this!  If you are not, then you do need to update the abi and params -- the rest of the information SHOULD be set in getStaticProps on index.tsx, but be sure to double check. */}

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const { data: signer } = useSigner();
  const [quantity, setQuantity] = useState(1);

  return <div>
    <div className='text-xl font-[400] pb-4'>Mint:</div>
    {/* Can delete maxQuantity if you do not want to limit the number of NFTs a person can mint at once */}
    <div className="pb-6">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10} />
    </div>
    {/* ----------------------------------------------------------- */}
    <TheBox
      className={`${props.className}`}
      signer={signer || null}
      nftParams={{
        address: props.constants.address,
        chainId: props.constants.chainId,
        paymentToken: ethers.constants.AddressZero,
        mintParams: {
          abi: "function processCollect(uint256 referrerProfileId, address collector, uint256 profileId, uint256 pubId, bytes calldata data)",
          params: [5218, account, 142, 3031, '0x'],  
          cost: ethers.utils.parseEther(props.constants.mintPrice),
          endSupply: {// only need one of the below
            maxCap: props.constants.maxTokens,
            // sellOutDate: props.constants.sellOutDate,
          }
        },
        displayCost: `${props.constants.mintPrice}${' '}${props.constants.chainId === 137 ? 'MATIC' : "ETH"}`
      }}
      options={{
        allowSecondary: true,
        allowPrimary: true,
        allowBridging: true,
        allowSwapping: true
      }}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
    {/* ----------------------------------------------------------- */}
  </div>
};

export default Box;