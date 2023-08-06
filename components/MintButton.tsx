import { DecentSDK, chain, edition } from "@decent.xyz/sdk";
import { useNetwork, useSwitchNetwork, useAccount, useSigner } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import NumberTicker from "./NumberTicker";

const MintButton = () => {
  const { chain: activeChain } = useNetwork();
  const { data: signer } = useSigner();
  const { switchNetwork } = useSwitchNetwork();
  const { address: account } = useAccount();
  const [ balance, setBalance ] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (signer) {
      signer.getBalance().then((balance) => {
        setBalance(ethers.utils.formatEther(balance));
      });
    };
  }, [signer]);

  const mint = async () => {
    let tx;
    if (activeChain && activeChain.id != 10) {
      toast.error(`Wrong network. Please switch to Optimism.`);
      switchNetwork?.(10)
    } else if (!signer) {
      toast.error(`Please connect your wallet.`);
    } else if (parseFloat(balance) < 0.0006) {
      toast.error(`Insufficient funds. Please add funds to your wallet.`);
    } else {
      const sdk = new DecentSDK(chain.optimism, signer);
      console.log(sdk)
      const nft = await edition.getContract(sdk, "0x0A7AD1eafE5586787f217F5c57684a4494B0D5a5");
      console.log(nft)
      tx = await nft.mint(account, quantity, { value: ethers.utils.parseEther('0.00044').mul(quantity) });
      const receipt = await tx.wait();
      if (receipt) toast.success("Successfully minted!");
    };
  };

  return (
    <><div className="pb-6">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={10} />
    </div>
    <button className="w-full py-3 rounded-md bg-black text-white" onClick={() => mint()}>Mint</button></>
  )
}

export default MintButton;