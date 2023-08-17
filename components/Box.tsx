import { TheBox, ActionType, ChainId } from "@decent.xyz/the-box";
import { parseUnits } from "viem";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();

  return <div>
    <div className='text-xl font-[400] pb-4'>Mint:</div>
    <TheBox
      className="text-xs md:max-w-[500px] bg-white"
      paymentButtonText="Pay now"
      actionType={ActionType.NftPreferMint}
      actionConfig={{
        contractAddress: "0x17DAE2898317246F1bb194CA93C33B012f020CF4",
        chainId: ChainId.ARBITRUM,
        signature: "function purchaseToBatch(address[] _toList,uint256 _projectId)",
        args: [[account], 96],
        cost: {
          isNative: true,
          amount: parseUnits('0.0009', 18),
        },
        supplyConfig: {
          maxCap: 10,
        },
      }}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
  </div>
};

export default Box;