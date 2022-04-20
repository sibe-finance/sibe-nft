import "../styles/HeaderFooter.css";
import Burger from "./BurgerButton";
import github from "../img/github.svg";
import telegram from "../img/telegram.svg";
import twitter from "../img/twitter.svg";
import discord from "../img/discord.svg";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


export default function Header (props:any) {
    const wallet = useWallet();

    return (
        <div className="header" style={{backgroundColor: props.open && "#191919"  }}>
            <a href="|" className="header-logo">
            </a>
            <nav className="header-menu">
                <ul className="header-menu-ul">
                    <li className="header-menu-li" onClick={props.staking}>Staking</li>
                    <li className="header-menu-li"> <a href="https://sibe-finance.github.io/sibe-docs/">Docs</a></li>
                    <li className="header-menu-li">Sibe paper</li>
                    <li className="header-menu-li" onClick={props.nft}>Sibe NFT</li>
                    <li className="header-menu-li">Roadmap</li>
                </ul>
            </nav>
            <nav className="header-socials">
                <ul className="header-socials-ul">
                    <li className="header-socials-li"><a href="github"><img src={github} alt="https://github.com/sibe-finance" /></a></li>
                    <li className="header-socials-li"><a href="telegram"><img src={telegram} alt="https://t.me/SIBEprotocol" /></a></li>
                    <li className="header-socials-li"><a href="twitter"><img src={twitter} alt="https://twitter.com/SibeGameFi?t=P1crNdFCL3F3p71_31zpLA&s=09" /></a></li>
                    <li className="header-socials-li"><a href="discord"><img src={discord} alt="https://discord.com/invite/yE3Q6mG9De" /></a></li>
                </ul>
            </nav>
            <WalletMultiButton className="header-connect-wallet"></WalletMultiButton>
            <Burger open={props.open} setOpen={props.setOpen} />
        </div>
    )
};