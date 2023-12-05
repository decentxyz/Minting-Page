import { TheBox } from "@decent.xyz/the-box";
import { ActionType } from "@decent.xyz/box-common";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount } from "wagmi";
// import { getContractFee } from "../lib/getContractFee";
import { parseUnits } from "viem";

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const SUPER_MINTER = '0x0000000000CF4558c36229ac0026ee16D3aE35Cd';
  // const mintPrice = parseFloat(props.constants.mintPrice);
  // const chainId = props.constants.chainId;
  // const contractFee:number = chainId && getContractFee(chainId);
  // const total = (mintPrice + contractFee) * quantity;
  // const price = total.toString();\

  let p;

  return <div className="max-w-[500px]">
    <TheBox
      className=""
      paymentButtonText={`Mint ${quantity}`}
      actionType={ActionType.NftPreferMint}
      actionConfig={{
        contractAddress: SUPER_MINTER,
        chainId: props.constants.chainId,
        signature: "function mintTo(tuple p)",
        args: [
          [p = {"affiliate":"0x0000000000000000000000000000000000000000","affiliateProof":[],"allowlistProof":[],"allowlisted":"0x0000000000000000000000000000000000000000","allowlistedQuantity":4294967295,"attributionId":"0","edition":`${props.constants.address}`,"quantity":quantity,"scheduleNum":0,"signature":"0x0000000000000000000000000000000000000000","signedClaimTicket":0,"signedDeadline":0,"signedPrice":"0","signedQuantity":0,"tier":1,"to":`${account}`}]
        ],
        cost: {
          isNative: true,
          amount: parseUnits(props.constants.mintPrice, 18),
        },
        supplyConfig: {
          sellOutDate: props.constants.sellOutDate
        }
      }}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
    <div className="px-4">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10} />
    </div>
  </div>
};

export default Box;