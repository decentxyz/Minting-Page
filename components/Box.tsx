import { TheBox } from "@decent.xyz/the-box";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useAccount, useSigner } from "wagmi";

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const { data: signer } = useSigner();

  return <div>
    <div className='text-xl font-[400] pb-4'>Mint:</div>
    {/* ----------------------------------------------------------- */}
    <TheBox
      className={``}
      signer={signer || null}
      nftParams={{
        address: "0xc14F5c50AE7fE363855EFC8DFa55d2833586c893",
        chainId: 42161,
        paymentToken: ethers.constants.AddressZero,
        mintParams: {
          abi: "function purchaseTo(address _to, uint256 _projectId) payable",
          // Cellular Genesis project id; was able to find ID by searching the contract name in opensea and clicking on the nft to find 5600
          params: [account, 56],
          cost: ethers.utils.parseEther("0.01"),
          endSupply: {
            maxCap: 10,
          }
        },
        displayCost: `0.01 ETH`
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