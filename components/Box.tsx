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

  const keyManager = "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E";

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
          [['0x77570069EF75035b9d0A433C1627F7372b08939E',1,0,'0x00005fF8b061293B72E0F49C7eBc066d19e162ad',0,1700778900,4294967295,10000,2147483647,9071,500,0,false,false,'0x0000000000000000000000000000000000000000000000000000000000000000','0x0000000000000000000000000000000000000000000000000000000000000000','0x0000000000000000000000000000000000000000',false]]
,
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