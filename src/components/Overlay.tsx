import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Overlay (props:any) {
    return (
        <div className="overlay">
             <nav className="overlay-menu">
                <ul className="overlay-menu-ul">
                    <li className="overlay-menu-li">Staking</li>
                    <li className="overlay-menu-li"> <a href="https://sibe-finance.github.io/sibe-docs/">Docs</a></li>
                    <li className="overlay-menu-li">Sibe paper</li>
                    <li className="overlay-menu-li">Sibe NFT</li>
                    <li className="overlay-menu-li">Roadmap</li>
                </ul>
            </nav>
            <WalletMultiButton className="overlay-connect-wallet"></WalletMultiButton>
        </div>
    )
};
