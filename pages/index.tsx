import type { NextPage } from 'next';
import { use, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getDecentNftDetails, getNftDetails } from '../lib/getReleaseDetails';
import CountdownText from '../components/CountdownText';
import BoxModal from "../components/BoxModal";
import Box from '../components/Box';
import ConnectWallet from '../components/ConnectWallet';
import { ChainId } from '@decent.xyz/box-common';

const Home: NextPage = (props: any) => {
  const endDate = new Date(props.constants.sellOutDate * 1000);
  const [nftsMinted, setNftsMinted] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // function checkVideo() {
  //   if (props.nftDetails?.metadata?.mimeType.indexOf("mp4") !== -1) {
  //     setIsVideo(true);
  //   } else {
  //     return;
  //   };
  // };

  useEffect(() => {
    // checkVideo();
    async function loadMints() {
      if (props.constants.decentNft) {
        let contract = await getNftDetails(props.constants.chainId, props.constants.address);
        if (contract) setNftsMinted(contract.data.totalSupply?.toLocaleString() || "0");
      }
    }
    loadMints();
  }, [props.constants.address, props.constants.chainId, props.constants.decentNft]);

  return <>
    <Head>
      <title>{props.nftDetails.metadata.title}</title>
      <meta
        name="description"
        content={props.nftDetails.metadata.description}
      />
      <link rel="icon" href={props.nftDetails.metadata.image} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://decent.xyz/"} />
      <meta property='og:image' content={props.nftDetails.metadata.image} />
      <meta property='og:title' content={props.nftDetails.metadata.title} />
      <meta property='og:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://decent.xyz/"} />
      <meta name='twitter:title' content={props.nftDetails.metadata.name} />
      <meta name='twitter:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:image' content={props.nftDetails.metadata.image} />
    </Head>

    <main>
      <BoxModal className="bg-white md:w-1/3 md:max-w-[500px] sm:w-2/3 w-full" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box constants={props.constants} />
      </BoxModal>
      <div className='w-full flex flex-wrap-reverse min-h-screen overflow-y-auto'>
        <div className='md:w-1/2 w-full bg-black text-white uppercase p-8'>
          <h1 className='text-[58px]'>Test Sound NFT</h1>

          <h1 className='text-[30px] py-24'>{props.nftDetails?.metadata?.description}</h1>
        </div>

        <div className='md:w-1/2 w-full p-8'>
          <div className=' md:flex md:justify-center'>
            <div className='w-full flex justify-end'>
              <div className='w-fit'>
                <ConnectWallet />
              </div>
            </div>

            <div className='md:fixed space-y-6 pt-6'>
              <div className='flex justify-center md:mt-20'>
                <div className='space-y-3'>
                  <Image className="drop-shadow-lg rounded-lg" src={props.nftDetails?.metadata.image} height={500} width={500} alt={'nft'} />
                  <div className='flex justify-center'>
                    <div>
                      <button className='px-20 py-[7px] text-2xl text-white bg-black rounded-full' onClick={() => setIsOpen(true)}>Mint</button>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <div className='flex gap-4 font-medium'>
                      <p className='text-right'>{props.constants.decentNft ? nftsMinted : props.nftDetails.data.totalSupply} | OPEN</p>
                      •
                      <p>ENDS:</p>
                      <CountdownText dropTime={endDate} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  </>
};

export default Home;

export async function getStaticProps() {
  {/* -------------------------NFT Settings-------------------------- */}
  // change constants to fetch your NFT & set data that cannot be determined dynamically
  // information for On the Other Side: https://www.sound.xyz/tk/on-the-other-side-w-trey-smith; https://optimistic.etherscan.io/address/0x77570069ef75035b9d0a433c1627f7372b08939e#readContract
  let constants = {
    decentNft: false,
    address: '0x77570069EF75035b9d0A433C1627F7372b08939E',
    chainId: ChainId.OPTIMISM,
    mintPrice: "0.000777",
    sellOutDate: 1711920600
  }

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