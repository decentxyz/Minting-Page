import type { NextPage } from 'next';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MarketplaceButtons from '../components/MarketplaceButtons';
import { getDecentNftDetails, getNftDetails } from '../lib/getReleaseDetails';
import CountdownText from '../components/CountdownText';
import BoxModal from "../components/BoxModal";
import Box from '../components/Box';
import { ChainId } from '@decent.xyz/the-box';

const Home: NextPage = (props: any) => {
  const endDate = new Date(props.nftDetails.saleTimes?.saleEnd);
  const [nftsMinted, setNftsMinted] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function loadMints() {
      if (props.constants.decentNft) {
        let contract = await getNftDetails(props.constants.chainId, props.constants.address);
        if (contract) setNftsMinted(contract.data.totalSupply?.toLocaleString() || "0");
      }
    }
    loadMints();
  }, [props.constants.address, props.constants.chainId, props.constants.decentNft])

  const paragraphs = props.nftDetails.metadata.description.split('\n\n');
  const renderedParagraphs = paragraphs.map((paragraph: string, index: number) => (
    <p className='py-2' key={index}>{paragraph}</p>
  ));

  return <>
    <Head>
      <title>{props.nftDetails.metadata.title}</title>
      <meta
        name="description"
        content={props.nftDetails.metadata.description}
      />
      <link rel="icon" href={props.nftDetails.metadata.image} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://squid.decent.xyz/"} />
      <meta property='og:image' content={props.nftDetails.metadata.image} />
      <meta property='og:title' content={props.nftDetails.metadata.title} />
      <meta property='og:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://squid.decent.xyz/"} />
      <meta name='twitter:title' content={props.nftDetails.metadata.name} />
      <meta name='twitter:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:image' content={props.nftDetails.metadata.image} />
    </Head>

    <main className={`${styles.main}`}>
      <BoxModal className="bg-white md:w-1/3 sm:w-2/3 w-full" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box constants={props.constants} setIsOpen={setIsOpen} />
      </BoxModal>
      <div className='w-full flex flex-wrap-reverse'>
        <div className='w-1/2'>
          <button onClick={() => setIsOpen(true)}>open</button>
          <h1 className='px-8 2xl:text-6xl md:text-7xl text-6xl flex-items-center text-[#A378FF] pb-4 pt-8 md:mb-0 mb-4'>{props.nftDetails.metadata.title}</h1>
          <div className='p-8'>
            {renderedParagraphs}
          </div>
        </div>

        <div className='w-1/2'>
          <div className='space-y-3'>
            <div className='flex justify-center'>
              <Image className="drop-shadow-lg rounded-lg" src={props.nftDetails?.metadata.image} height={500} width={500} alt={'nft'} />
            </div>
          </div>
        </div>

          

      </div>
    </main>

    {/* <footer className='md:fixed bottom-0 w-full h-[10vh] border-t border-black justify-center flex items-center bg-white relative gap-12'>
      <div className='flex gap-4'>
        <p>Claimed:</p>
        <p className='text-right text-[#A378FF]'>{props.constants.decentNft ? nftsMinted : props.nftDetails.data.totalSupply} | Open</p>
      </div>
      <div className='flex gap-4'>
        <p>Sale Ends:</p>
        <CountdownText className='text-[#A378FF] sm:w-40' dropTime={endDate} />
      </div>
    </footer> */}
  </>
};

export default Home;

export async function getStaticProps() {
  {/* -------------------------NFT Settings-------------------------- */}
  // change constants to fetch your NFT & set data that cannot be determined dynamically
  let constants = {
    decentNft: true,
    address: '0x3146975BFCCAE722F802BC0Cd540dB1e6c178D1F',
    chainId: ChainId.POLYGON,
    mintPrice: "0.0",
    sellOutDate: 1693400400
  }
  {/* --------------------------------------------------------------- */}

  // NOTE: to retrieve metadata for non-Decent NFTs, at least 1 NFT from the collection must already be minted!!
  let nftDetails;
  if (constants.decentNft) {
    nftDetails = await getDecentNftDetails(constants.chainId, constants.address);
  } else {
    nftDetails = await getNftDetails(constants.chainId, constants.address);
  };

  return {
    props: {
      nftDetails,
      constants
    }
  };
};