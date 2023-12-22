import "@decent.xyz/the-box/index.css";
import '@rainbow-me/rainbowkit/styles.css'; 
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  phantomWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  zora,
  optimism,
  base,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { BoxHooksContextProvider } from "@decent.xyz/box-hooks";
 

const { chains, publicClient } = configureChains(
  [mainnet, optimism, base, zora],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }),
    publicProvider()
  ]
);

const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string;
const connectors = connectorsForWallets([
  {
    groupName: 'Box Based Wallets',
    wallets: [
      injectedWallet({ chains }),
      phantomWallet({ chains }),
      rainbowWallet({ projectId: walletConnectId, chains }),
      metaMaskWallet({ projectId: walletConnectId, chains }),
      coinbaseWallet({ chains, appName: 'Based NFTs' }),
      walletConnectWallet({ projectId: walletConnectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
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
      <BoxHooksContextProvider
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
      >
        <Component {...pageProps} />
        <ToastContainer />
      </BoxHooksContextProvider>
    </RainbowKitProvider>
  </WagmiConfig>
  );
}

export default MyApp;