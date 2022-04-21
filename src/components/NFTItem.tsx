import {useState} from "react";
import {Link} from "react-router-dom";

export default function NFTMarketplace (props: any) {
    const {collectionId, ...rest} = props;
    const [token, settoken]= useState({...rest})

    const mint = props.token_add;
    return (
        <Link to={`Aurorian%204978`} state={{token : token}} className="nft-item-wrapper">
            <img src={props.img} alt="nft-item" className="nft-item-img" />
            <h3 className="nft-item-name">{props.name}</h3>
            <div className="nft-item-token-address">
                <div className="nft-item-logo"></div>
                <p className="nft-item-address">{mint.slice(0, 5) + '...' + mint.slice(-5)}</p>
            </div>
        </Link>
    )
}
