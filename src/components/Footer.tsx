import "../styles/HeaderFooter.css";
import github from "../img/github.svg";
import telegram from "../img/telegram.svg";
import twitter from "../img/twitter.svg";
import discord from "../img/discord.svg";


export default function Footer () {
    return <div className="footer"> 
        <nav className="footer-socials">
            <ul className="footer-socials-ul">
                <li className="footer-socials-li"><a href="https://github.com/sibe-finance"><img src={github} alt="github" /></a></li>
                <li className="footer-socials-li"><a href="https://t.me/SIBEprotocol"><img src={telegram} alt="telegram" /></a></li>
                <li className="footer-socials-li"><a href="https://twitter.com/SibeGameFi?t=P1crNdFCL3F3p71_31zpLA&s=09"><img src={twitter} alt="twitter" /></a></li>
                <li className="footer-socials-li"><a href="https://discord.com/invite/yE3Q6mG9De"><img src={discord} alt="discord" /></a></li>
            </ul>
        </nav>
        <nav className="footer-menu">
            <ul className="footer-menu-ul">
            <li className="footer-menu-li"><a href="https://github.com/sibe-finance">Github</a></li>
            <li className="footer-menu-li"><a href="/">Sibe NFT</a></li>
            <li className="footer-menu-li"><a href="/">Docs</a></li>
            <li className="footer-menu-li"><a href="https://sibe-finance.github.io/sibe-docs/">Cispracs</a></li>
            <li className="footer-menu-li"><a href="/">Roadmap</a></li>
            </ul>
        </nav>
    </div>
}