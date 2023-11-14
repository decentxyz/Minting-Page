import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getDecentNftDetails, getNftDetails } from '../lib/getReleaseDetails';
import { ChainId } from '@decent.xyz/the-box';
import ConnectWallet from '../components/ConnectWallet';
import SelectFunction from '../components/SelectFunction';
import { useAccount } from 'wagmi';
import NumberTicker from '../components/NumberTicker';
import { TheBox, ActionType } from "@decent.xyz/the-box";
import { toast } from "react-toastify";
import { BoxConfig } from '../lib/types/BoxConfig';

const Home: NextPage = (props: any) => {
  const { nftDetails, constants } = props;
  const { address: sender } = useAccount();
  const [quantity, setQuantity] = useState(1);


  const boxConfigs = [
    { id: 1, name: 'safeMint', signature: "function safeMint(address to)", args: [sender] },
    { id: 2, name: 'multiMint', signature: "function multiMint(uint256 numberOfTokens, address to)", args: [quantity, sender] },
    { id: 3, name: 'allowListSafeMint', signature: "function allowListSafeMint(bytes32[] calldata merkleProof, address to)", args: ['0x', sender] },
    // have to actually generate merkle proof, but this is how it'd look if you could sub in the 0x with the actual proof
    { id: 4, name: 'allowListMultiMint', signature: "function allowListMultiMint(bytes32[] calldata merkleProof, bytes32[] calldata merkleProof, address to)", args: ['0x', quantity, sender] },
  ];

  const [selectedSig, setSelectedSig] = useState<BoxConfig>({
    id: 1,
    name: 'Connect Wallet',
    signature: "",
    args: []
  });

    useEffect(() => {
      if (sender) {
        setSelectedSig(boxConfigs[0])
      }
    }, [sender])

  return <>
    <main className='p-8'>
      <div className='flex w-full justify-end'>
        <ConnectWallet />
      </div>
      <div className='flex gap-4 items-start'>
        <p className='font-medium pt-2'>Select Function: </p>
        <SelectFunction signatures={boxConfigs} selectedSig={selectedSig} setSelectedSig={setSelectedSig}  />
      </div>
      <div className='py-8'>
        <span className='font-medium'>Configuration:</span>
        {JSON.stringify(selectedSig)}
      </div>
      <div className="p-4 w-[500px]">
        <TheBox
          className=""
          paymentButtonText={`Mint ${quantity}`}
          actionType={ActionType.NftPreferMint}
          actionConfig={{
            contractAddress: constants.address,
            chainId: constants.chainId,
            signature: selectedSig.signature,
            args: selectedSig.args,
            cost: {
              isNative: true,
              amount: 10000000000000000n,
            },
            supplyConfig: {
              maxCap: 15000
            }
          }}
          onTxReceipt={() => toast.success("Successfully minted!")}
          apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
          chains={[ChainId.ARBITRUM, ChainId.BASE, ChainId.AVALANCHE, ChainId.POLYGON, ChainId.ETHEREUM, ChainId.OPTIMISM]}
        />
        <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10} />
      </div>
    </main>
  </>
};

export default Home;

export async function getStaticProps() {
  let constants = {
    decentNft: false,
    address: '0xA35f30A0ffD33f2bC847C4a3Cbf83b41DA2ddA44',
    chainId: ChainId.OPTIMISM,
    mintPrice: "0.01",
    maxCap: 15000
  }

  // ignore
  let nftDetails;
  if (constants.decentNft) {
    nftDetails = await getDecentNftDetails(constants.chainId, constants.address);
  } else {
    nftDetails = await getNftDetails(constants.chainId, constants.address);
  }

  return {
    props: {
      nftDetails,
      constants
    }
  };
};