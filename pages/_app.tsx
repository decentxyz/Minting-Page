import "@decent.xyz/the-box/dist/the-box-base.css";
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PrivyProvider} from '@privy-io/react-auth';
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains } from 'wagmi';
import { arbitrum, optimism, mainnet, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

function MyApp({ Component, pageProps }: AppProps) {
  
  const handleLogin = (user:any) => {
    console.log(`User ${user.id} logged in!`)
  };

  const configureChainsConfig = configureChains(
    [arbitrum, optimism, mainnet, polygon],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }),
    ]
  )

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      onSuccess={handleLogin}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
      }}
    >
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}

export default MyApp;