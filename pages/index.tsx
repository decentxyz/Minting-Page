import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getDecentNftDetails, getNftDetails } from '../lib/getReleaseDetails';
import CountdownText from '../components/CountdownText';
import ConnectWallet from '../components/ConnectWallet';
import Box from '../components/Box';
import Modal from '../components/BoxModal';
import { useAccount } from 'wagmi';

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
      <Modal className="bg-white md:w-1/3 md:max-w-[500px] sm:w-2/3 w-full" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box constants={props.constants} account={account} />
      </Modal>

      <div className='w-full flex flex-wrap-reverse min-h-screen overflow-y-auto'>

        <div className='md:w-1/2 w-full bg-black text-white p-8'>
          <div className='w-full flex justify-start py-4'>
            <Image src='/optimism-logo.svg' height={30} width={120} alt='optimism' />
          </div>
          <h1 className='text-[68px] mt-12'>{props.nftDetails?.metadata?.title}</h1>
          <p className='text-[28px] py-12'>{props.nftDetails?.metadata?.description}</p>
        </div>

        <div className='md:w-1/2 w-full p-8'>
          <div className='w-full flex justify-end'>
            <div className='w-fit'>
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
                    playsInline
                    className='drop-shadow-lg rounded-lg' 
                    src='/superchain.MP4' />

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