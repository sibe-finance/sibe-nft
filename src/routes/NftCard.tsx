import { useParams } from "react-router-dom";


export default function NftCard() {
    const params = useParams();
    const token:any = {"id":1797186,"token_add":"BWpJp69ZevquUihzch5bXae46PLxe6PSVo62UG7NjNSA","price":18,"for_sale":1,"link_img":"https://arweave.net/LCoeTg6sLewFdnDMWyvHnwWghLx2Z9QFI9082ol214k","name":"Aurorian #4676","escrowAdd":"HEMwh3bNYn8zbkZDPKf1GZcp8nZBdUWX3LXgNCXh9TWV","seller_address":"Cx9ffMi61YCishvbKQEPL1T3KPsS5injkckM7ovTYZP1","attributes":"Background: Base Background,Skin: Human,Cloth: Base Cloth,Mouth: Base Mouth,Eyes: Red Eyes,Hair: Pigtails,Type: Aurorian,generation: 1","skin":null,"type":"aurory","ranking":null,"lastSoldPrice":18};
    const attr = [ 
        {key : "Background", value: "Base Background"},
        {key : "Skin", value: "Human"},
        {key : "Cloth", value: "Jacket"},
        {key : "Necklace", value:"Flower Necklace"},
]

    return (
        <div className="body">
            <h1 className="nft-card-h1">aurory</h1>
            <div className="nft-card-wrapper">
                <div className="nft-card-container ">
                    <img src={token.link_img} alt="" className="nft-card-img" />
                    <button className="nft-card-buy">Buy now <span> {token.price.toFixed(2)} SOL</span></button>
                </div>
                <div className="nft-card-container">
                    <span className="nft-card-id"># <span> {token.id} </span></span>
                    <h2 className="nft-card-name">{token.name}</h2>
                    <h4 className="nft-card-collection">{params.collectionId}</h4>
                    <span className="nft-card-owner">
                        Owned by <h4 className="nft-card-owner-address">{token.seller_address.slice(0, 26) + '...'}</h4>
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
                    <button className="mobile-nft-card-buy" >Buy now <span> {token.price.toFixed(2)} SOL</span></button>
                </div>
            </div>
        </div>
    )
}
