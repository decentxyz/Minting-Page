import { TheBox, ActionType } from "@decent.xyz/the-box";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount } from "wagmi";
// import { getContractFee } from "../lib/getContractFee";
import { parseUnits } from "viem";

const Box = (props:any):JSX.Element => {
  const { chainId, address, mintPrice, sellOutDate } = props.constants;
  const { address: account } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const pp = parseFloat(mintPrice);
  const total = pp * quantity;
  const price = total.toString();


  return <div className="max-w-[500px]">
    <TheBox
      className=""
      paymentButtonText={`Mint ${quantity}`}
      actionType={ActionType.NftPreferMint}
      actionConfig={{
        contractAddress: address,
        chainId: chainId,
        signature: "function mintWithRewards(address recipient,uint256 quantity,string comment,address mintReferral) payable returns (uint256)",
        args: [
          account,
          quantity,
          "Minted with The Box.",
          "0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E",
        ],
        cost: {
          isNative: true,
          amount: parseUnits(price, 18),
        },
        supplyConfig: {
          sellOutDate: sellOutDate
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