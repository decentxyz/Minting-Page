import Image from "next/image";
import Link from "next/link";

const MarketplaceButtons = (props:any) => {

  return <div className="flex gap-4 items-center mt-4 w-full justify-center">
    <p className="font-[500] tracking-widest text-sm">View on:</p>
    <Link href={`https://opensea.io/collection/${props.openseaLink}`} target="_blank" rel="noreferrer">
    <Image src="/images/opensea.png" height={18} width={18} alt="opensea"/></Link>
    {/* this repo currently only supports Decent's editions contract */}
    <Link href={`https://hq.decent.xyz/${props.chain}/Editions/${props.contractAddress}`} target="_blank" rel="noreferrer">
    <Image src="/images/decent-icon.png" height={18} width={22} alt="decent"/></Link>
  </div>
}

export default MarketplaceButtons;