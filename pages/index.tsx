import type { NextPage } from 'next';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
// import CountdownText from '../components/CountdownText';
import Box from "../components/Box";
import { Autochiptune } from "../utils/Autochiptune";
import MarketplaceButtons from '../components/MarketplaceButtons';
import Navbar from '../components/Navbar/Navbar';

const Home: NextPage = () => {
  const blurRef = useRef<HTMLDivElement | null>(null);
  const noEnd = 4294967295;
  const [nftsMinted, setNftsMinted] = useState("");

  return <>
    <Head>
      <title>{Autochiptune.name}</title>
      <meta
        name="description"
        content={Autochiptune.description}
      />
      <link rel="icon" href={Autochiptune.image} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://featured.decent.xyz/"} />
      <meta property='og:image' content={Autochiptune.image} />
      <meta property='og:title' content={Autochiptune.name} />
      <meta property='og:description' content={Autochiptune.description} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://featured.decent.xyz/"} />
      <meta name='twitter:title' content={Autochiptune.name} />
      <meta name='twitter:description' content={Autochiptune.description} />
      <meta name='twitter:image' content={Autochiptune.image} />
    </Head>
    <Navbar />
    <main className={`${styles.main} md:mt-0 sm:mt-16 mt-28`}>
      <div className='w-full flex flex-wrap'>
        <div className='md:border-r border-black w-full md:w-2/5 relative md:h-[80vh] overflow-y-auto'>
          <h1 className='px-8 2xl:text-6xl md:text-7xl text-6xl flex-items-center text-[#A378FF] pb-4 pt-8 md:mb-0 mb-4'>{Autochiptune.name}</h1>
          <div className='p-8'>
            {Autochiptune.description}
          </div>
          <div className='px-8 border-black border-t pt-8 md:inline-block w-full hidden pb-16'>
            <div className='w-full'> 
            {/* -------------------------MAKE SURE TO UPDATE THE BOX-------------------------- */}
            <Box />
            {/* ------------------------------------------------------------------------------ */}
            </div>
          </div>
        </div>

        <div className='md:w-3/5 collectionBannerFlex flex items-center relative'>
          <Image className="drop-shadow-lg rounded-lg" src={Autochiptune.image} fill alt={'nft'} />
          <div ref={blurRef} className="blurrer"></div>
          <div className='space-y-3'>
            <div className='flex justify-center'>
              <Image className="drop-shadow-lg rounded-lg" src={Autochiptune.image} height={600} width={600} alt={'nft'} />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center my-12 md:hidden'>
          {/* -------------------------THE BOX-------------------------- */}
          <Box />
          {/* ----------------------------------------------------------- */}
        </div>
      </div>
    </main>

    <footer className='md:fixed bottom-0 w-full h-[10vh] border-t border-black justify-center flex items-center bg-white relative gap-12'>
      {/* if open indefinitely, replace sale countdown */}
      <div className='hidden sm:inline-block'>
        <MarketplaceButtons decentLink={"https://decent.xyz"} />
      </div>
    </footer>
  </>
};

export default Home;