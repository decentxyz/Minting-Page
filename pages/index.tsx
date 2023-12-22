import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getDecentNftDetails, getNftDetails } from '../lib/getReleaseDetails';
import CountdownText from '../components/CountdownText';
import ConnectWallet from '../components/ConnectWallet';
import Box from '../components/Box';
import Modal from '../components/BoxModal';
import { Address, useAccount } from 'wagmi';
import BuyCrypto from '../components/BuyCrypto';

const Home: NextPage = (props: any) => {
  const endDate = new Date(props.constants.sellOutDate * 1000);
  const [nftsMinted, setNftsMinted] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { address: account } = useAccount();

  useEffect(() => {
    async function loadMints() {
      if (props.constants.decentNft) {
        let contract = await getNftDetails(props.constants.chainId, props.constants.address);
        if (contract) setNftsMinted(contract.data.totalSupply?.toLocaleString() || "0");
      }
    }
    loadMints();
  }, [props.constants.address, props.constants.chainId, props.constants.decentNft]);

  const statusContent = (
    <>
      <div>
        <p className='text-[20px]'>Editions</p>
        <p className='text-sm'>Open</p>
      </div>
      <div>
        <p className='text-[20px]'>Price</p>
        <p className='text-sm'>Free</p>
        <p className='text-xs'>0.00044 Mint Fee</p>
      </div>
      <div>
        <p className='text-[20px]'>Minted</p>
        <p className='text-sm'>{nftsMinted}</p>
      </div>
      <div>
        <p className='text-[20px]'>Ends</p>
        <CountdownText className='text-sm' dropTime={endDate} />
      </div>
    </>
  )

  return <>
    <Head>
      <title>{props.nftDetails.metadata.title}</title>
      <meta
        name="description"
        content={props.nftDetails.metadata.description}
      />
      <link rel="icon" href='/op-icon.svg' />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://optimism.decent.xyz/"} />
      <meta property='og:image' content={props.nftDetails.metadata.image} />
      <meta property='og:title' content={props.nftDetails.metadata.title} />
      <meta property='og:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://optimism.decent.xyz/"} />
      <meta name='twitter:title' content={props.nftDetails.metadata.name} />
      <meta name='twitter:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:image' content={props.nftDetails.metadata.image} />
    </Head>

    <main>
      <div className='w-full flex flex-wrap-reverse min-h-screen overflow-y-auto'>

        <div className='md:w-1/2 w-full bg-gray-200 p-8 min-h-screen flex flex-col justify-between'>
          <div className='w-full flex justify-start py-4'>
            <Image src='/optimism-logo.svg' height={30} width={120} alt='optimism' />
          </div>
          <h1 className='text-[60px] mt-12'>{props.nftDetails?.metadata?.title}</h1>
          <p className='text-[24px] py-12'>{props.nftDetails?.metadata?.description}</p>

          <div className='border-t border-black flex flex-wrap-reverse justify-center'>
            
            <div className='md:inline-block hidden md:w-1/3 w-full p-4 md:border-r md:border-black space-y-4'>
              {statusContent}
            </div>
            <div className='w-full flex flex-wrap gap-8 items-center justify-between md:hidden py-4 border-t border-black mt-12'>
              {statusContent}
            </div>

            <div className='md:w-2/3 w-full md:px-4'>
              <Box constants={props.constants} account={account} />
            </div>
          </div>
        </div>

        <div className='md:w-1/2 w-full p-8'>
          <div className='w-full flex justify-end'>
            <div className='w-fit flex gap-2'>
              <BuyCrypto account={account!} />
              <ConnectWallet />
            </div>
          </div>
          <div className='md:flex md:justify-center'>
            <div className='md:fixed space-y-6 pt-6'>
              <div className='flex justify-center md:mt-20'>
                <div className='space-y-3'>
                  <video
                    style={{ height: 500, width: 500 }}
                    autoPlay
                    loop
                    className='drop-shadow-lg rounded-lg' 
                    src='/superchain.MP4' 
                  />
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
  let constants = {
    decentNft: true,
    address: '0xe736729Ee572CDF69df6A92eEb751C27311355a5',
    chainId: 10,
    mintPrice: "0.00044",
    sellOutDate: 1705035600
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