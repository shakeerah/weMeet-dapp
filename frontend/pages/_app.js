import {useState} from 'react'
import Layout from "../components/Layout";
import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import ApolloClient from "../apollo-client"

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const { chains, provider } = configureChains(
  [chain.polygon, chain.goerli, chain.mainnet ],
  [infuraProvider({infuraId}), publicProvider()]
)

const { connectors } = getDefaultWallets({appName: "WeMeet", chains})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export default function MyApp({ Component, pageProps }) {
  const [darkToggle, setDarkToggle] = useState(false)

  function handleThemeToggle(){
    setDarkToggle(!darkToggle)
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={ApolloClient}>
          <Layout theme={darkToggle} handleThemeToggle={handleThemeToggle}>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
