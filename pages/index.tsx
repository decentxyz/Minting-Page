import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getDecentNftDetails, getNftDetails } from '../lib/getReleaseDetails';
import CountdownText from '../components/CountdownText';
import BoxModal from "../components/BoxModal";
import Box from '../components/Box';
import { ChainId } from '@decent.xyz/the-box';
import ConnectWallet from '../components/ConnectWallet';
import { formatAddress } from '../lib/formatAddress';

const Home: NextPage = (props: any) => {
  const { nftDetails, constants } = props;
  const endDate = new Date(constants.sellOutDate * 1000);
  const [nftsMinted, setNftsMinted] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function loadMints() {
      if (constants.decentNft) {
        let contract = await getNftDetails(constants.chainId, constants.address);
        if (contract) setNftsMinted(contract.data.totalSupply?.toLocaleString() || "0");
      }
    }
    loadMints();
  }, [constants.address, constants.chainId, constants.decentNft])

  return <>
    <Head>
      <title>{nftDetails.metadata.title}</title>
      <meta
        name="description"
        content={nftDetails.metadata.description}
      />
      <link rel="icon" href={nftDetails.metadata.image} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://squid.decent.xyz/"} />
      <meta property='og:image' content={nftDetails.metadata.image} />
      <meta property='og:title' content={nftDetails.metadata.title} />
      <meta property='og:description' content={nftDetails.metadata.description} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://squid.decent.xyz/"} />
      <meta name='twitter:title' content={nftDetails.metadata.name} />
      <meta name='twitter:description' content={nftDetails.metadata.description} />
      <meta name='twitter:image' content={nftDetails.metadata.image} />
    </Head>

    <main>
      <BoxModal className="bg-white md:w-1/3 md:max-w-[500px] sm:w-2/3 w-full" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box constants={constants} />
      </BoxModal>
      <div className='w-full flex flex-wrap-reverse min-h-screen overflow-y-auto'>
        <div className='md:w-1/2 w-full bg-black text-white uppercase p-8'>
          <h1 className='text-[58px]'>{nftDetails.metadata.title}</h1>
          <p className='text-[28px] py-4'>by {formatAddress(nftDetails.creator.address)}</p>

          <h1 className='text-[34px] leading-[40px]'>{nftDetails?.metadata?.description}</h1>
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
                  <Image className="drop-shadow-lg rounded-lg" src={nftDetails?.metadata.image} height={500} width={500} alt={'nft'} />
                  <div className='flex justify-center'>
                    <div>
                      <button className='px-20 py-[7px] text-2xl text-white bg-black rounded-full' onClick={() => setIsOpen(true)}>Mint</button>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <div className='flex gap-4 font-medium'>
                      <p className='text-right'>{constants.decentNft ? nftsMinted : nftDetails.data.totalSupply.toLocaleString()} | OPEN</p>
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
  let constants = {
    decentNft: false,
    address: '0x0651996b6a6eebd1fc697e5735a2dca541bbe06b',
    chainId: ChainId.BASE,
    mintPrice: "0.000777",
    sellOutDate: 4294967295
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