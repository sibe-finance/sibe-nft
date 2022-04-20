import './styles/App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Overlay from './components/Overlay';
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import * as anchor from '@project-serum/anchor';
import { useMemo, useState, useRef } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import NftCard from './routes/NftCard';
import NFTMarketplace from './routes/NFTMarketplace';
import HomePage from './routes/HomePage';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');


const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!,
    );

    return candyMachineId;
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet'),
);

const txTimeoutInMilliseconds = 30000;

const App = () => {
  const [open, setOpen] = useState(false);
  const node = useRef(); 
  useOnClickOutside(node, () => setOpen(false));
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [],
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <Header open={open} setOpen={setOpen} />
            { open ? <Overlay /> : 
            <Routes>
              <Route path="/sibe-nft/" element={ <HomePage candyMachineId={candyMachineId}
                connection={connection}
                txTimeout={txTimeoutInMilliseconds}
                rpcHost={rpcHost}/>} > 
              </Route>
              <Route path="/sibe-nft/:collectionId" element={<NFTMarketplace />}> 
              </Route>
              <Route path="/sibe-nft/:collectionId/:itemId" element={<NftCard />} />
          </Routes> }
            { !open && <Footer />}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
