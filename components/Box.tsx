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
        contractAddress: "0x454A3B647C7e9F4270175285c978dFb9D1f7Af15",
        chainId: ChainId.ETHEREUM,
        signature: "function mint(address _nft_addr,uint256 _token_id,uint256 _num_mint,address _receiver,bytes32[] _proof,uint256 _allowlist_allocation)",
        // where 5 = next token to be minted & 1 = quantity & 10 is max tokens in the collection
        args: ['0x5Ab44D97b0504ED90b8c5b8A325AA61376703c88', 5, 1, account, [], 10],
        cost: {
          isNative: true,
          amount: parseUnits('0.02', 18),
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