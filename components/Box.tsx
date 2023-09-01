import { TheBox, ActionType } from "@decent.xyz/the-box";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount } from "wagmi";
// import { getContractFee } from "../lib/getContractFee";
import { parseUnits } from "viem";

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const [quantity, setQuantity] = useState(1);
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
        contractAddress: props.constants.address,
        chainId: props.constants.chainId,
        signature: "function purchase(uint256[] _values, address[] _recipients, address[] _referrers, address[] _keyManagers, bytes[] _data) payable returns (uint256[] tokenIds)",
        args: [
          [parseUnits(props.constants.mintPrice, 18)],
          [account],
          [account],
          [keyManager],
          ['0x'],
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