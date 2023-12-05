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

  return <div className="max-w-[500px]">
    <TheBox
      className=""
      paymentButtonText={`Mint ${quantity}`}
      actionType={ActionType.NftPreferMint}
      actionConfig={{
        contractAddress: SUPER_MINTER,
        chainId: props.constants.chainId,
        signature: `function mintTo((\
          address edition,\
          uint8 tier,\
          uint8 scheduleNum,\
          address to,\
          uint32 quantity,\
          address allowlisted,\
          uint32 allowlistedQuantity,\
          bytes32[] allowlistProof,\
          uint96 signedPrice,\
          uint32 signedQuantity,\
          uint32 signedClaimTicket,\
          uint32 signedDeadline,\
          bytes signature,\
          address affiliate,\
          bytes32[] affiliateProof,\
          uint256 attributionId\
        )) payable`,
        args: [
          {
             edition: props.constants.address,
             tier: 1,
             scheduleNum: 0,
             to: account,
             quantity: quantity,
             allowlisted: "0x0000000000000000000000000000000000000000",
             allowlistedQuantity: 4294967295,
             allowlistProof: [],
             signedPrice: 0,
             signedQuantity: 0,
             signedClaimTicket: 0,
             signedDeadline: 0,
             signature: [],
             affiliate: "0x0000000000000000000000000000000000000000",
             affiliateProof: [],
             attributionId: 0,
          }
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