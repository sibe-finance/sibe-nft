import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function NftCard() {
    const params = useParams();
    const location:any = useLocation();
    const token = location.state.token;
    const attr = [ 
        {key : "Background", value: "Base Background"},
        {key : "Skin", value: "Human"},
        {key : "Cloth", value: "Jacket"},
        {key : "Necklace", value:"Flower Necklace"},
        {key : "Mouth", value: "Plague Mask"},
        {key : "Eyes", value: "Red Eyes"},
        {key : "Hair", value: "Pigtails"},
        {key : "Type", value: "Aurorian"},
]

    return (
        <div className="body">
            <h1 className="nft-card-h1">{params.collectionId}</h1>
            <div className="nft-card-wrapper">
                <div className="nft-card-container ">
                    <img src={token.img} alt="" className="nft-card-img" />
                    <button className="nft-card-buy" onClick={()=>console.log(attr)}>Buy now <span> {token.price.toFixed(2)} SOL</span></button>
                </div>
                <div className="nft-card-container">
                    <span className="nft-card-id"># <span> {token.id} </span></span>
                    <h2 className="nft-card-name">{token.name}</h2>
                    <h4 className="nft-card-collection">{params.collectionId}</h4>
                    <span className="nft-card-owner">
                        Owned by <h4 className="nft-card-owner-address">{token.owner.slice(0, 26) + '...'}</h4>
                    </span>
                    <div className="nft-card-attributes">
                       {attr.map((at, index) => {
                            return (<div className="attributes-wrapper" key={index}>
                                <span className="rarity">10% rarity</span>
                                <h4 className="attr-name">{at.key}</h4>
                                <h4 className="attr-data">{at.value}</h4>
                            </div>)
                        })}
                    </div>
                    <button className="mobile-nft-card-buy" onClick={()=>console.log(attr)}>Buy now <span> {token.price.toFixed(2)} SOL</span></button>
                </div>
            </div>
        </div>
    )
}
