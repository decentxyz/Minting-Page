import { 
  useBoxAction,
  UseBoxActionArgs,
  EvmTransaction,
  ActionType,
  getChainExplorerTxLink,
  useBridgeReceipt,
  ethGasToken
} from "@decent.xyz/box-hooks";

import {
  EstimateGasParameters,
  Hex,
  parseUnits,
  TransactionReceipt
} from 'viem';
import { useAccount } from 'wagmi';
import {
  getAccount,
  getPublicClient,
  sendTransaction,
  waitForTransaction
} from '@wagmi/core';

import { useState } from 'react';

import { useSourceContext } from "./contexts/SourceContext";
import { nftInfo } from "./utils/nftInfo";
import { toast } from "react-toastify";

const MintButton = () => {
  const { srcChainId, srcToken } = useSourceContext();
  const { address: sender } = useAccount();

  const keyManager = '0x81Dd955D02D337DB81BA6c9C5F6213E647672052'; // believe this is alwasy the contract creator (?)

  const boxActionArgs: UseBoxActionArgs = {
    actionType: ActionType.NftPreferMint,
    actionConfig: {
      contractAddress: nftInfo.address,
      chainId: nftInfo.dstChainId,
      signature: nftInfo.signature,
      args: [
        [parseUnits(nftInfo.mintPrice, 18)],
        [sender],
        [sender],
        [keyManager],
        ['0x'],
      ],
      cost: {
        isNative: true,
        amount: parseUnits(nftInfo.mintPrice, 18)
      },
      supplyConfig: {
        // NOTE: only need this section on NftPreferMint action config; could just do NftMint - difference is this version will source secondary listings once mint concludes.  Mint can conclude in 1 of two ways highlighted below (contract was unverified, so I just harcoded something):
        maxCap: nftInfo.maxCap,
        // sellOutDate: nftInfo.sellOutDate
      },
    },
    srcChainId: srcChainId,
    sender: sender!,
    slippage: 1, // 1%
    srcToken: srcToken.address,
    dstToken: ethGasToken.address,
    dstChainId: nftInfo.dstChainId
  };
  const { actionResponse, isLoading, error } = useBoxAction(boxActionArgs);

  const [hash, setHash] = useState<Hex>();
  const bridgeId = actionResponse?.bridgeId;
  const [srcTxReceipt, setSrcTxReceipt] = useState<TransactionReceipt>();
  const { receipt: _dstTxReceipt } = useBridgeReceipt({
    bridgeId,
    srcChainId,
    dstChainId: nftInfo.dstChainId,
    srcTxHash: hash,
  });
  const dstTxReceipt = _dstTxReceipt as TransactionReceipt;

  return (
    <div className={'max-w-4xl'}>
      <button
        className="px-8 py-2 rounded-full bg-black text-white hover:opacity-80"
        onClick={async () => {
          try {
            const account = getAccount();
            const publicClient = getPublicClient();
            const tx = actionResponse?.tx as EvmTransaction;
            const gas = await publicClient.estimateGas({
              account,
              ...tx,
            } as unknown as EstimateGasParameters);
            const { hash } = await sendTransaction({
              ...tx,
              gas,
            });
            setHash(hash);
            toast.success("Successfully minted!");
            try {
              const receipt = await waitForTransaction({ hash });
              setSrcTxReceipt(receipt);
            } catch (e) {}
          } catch (e: any) {
            console.error(e);
            toast.error(`Error minting: ${e.message}.  Please check console for more information & reivew your boxActionArgs.`)
          }
        }}
      >
        {isLoading ? 'Loading...' : error ? 'Error fetching route.' : 'Mint!'}
      </button>
      {hash && (
        <div className={'mt-6'}>
          <a
            href={getChainExplorerTxLink(srcChainId, hash)}
            className={'text-blue-500'}
          >
            View source txn
          </a>
        </div>
      )}
      {srcTxReceipt && srcChainId !== nftInfo.dstChainId && (
        <div className={'mt-6'}>
          {dstTxReceipt?.transactionHash && (
            <a
              href={getChainExplorerTxLink(
                nftInfo.dstChainId,
                dstTxReceipt?.transactionHash
              )}
              className={'text-blue-500'}
            >
              View destination txn
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default MintButton;