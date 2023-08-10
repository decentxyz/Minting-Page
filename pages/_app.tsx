import "@decent.xyz/the-box/dist/the-box-base.css";
import '@rainbow-me/rainbowkit/styles.css'; 
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configureChains, WagmiConfig, createClient } from 'wagmi';
import { arbitrum, optimism, mainnet, polygon } from "wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets, lightTheme } from "@rainbow-me/rainbowkit";
 
const configureChainsConfig = configureChains(
  [
    optimism,
    arbitrum,
    polygon,
    mainnet,
  ],
  [
    alchemyProvider({
      apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

const { chains, provider, webSocketProvider } = configureChainsConfig;

const { connectors } = getDefaultWallets({
  appName: 'Minting Page',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string,
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      modalSize="compact"
      theme={lightTheme({
        accentColor: '#9969FF',
        accentColorForeground: 'white',
        borderRadius: 'small',
        fontStack: 'system',
        overlayBlur: 'small',
      })}
      >
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </RainbowKitProvider>
  </WagmiConfig>
  );
}

export default MyApp;