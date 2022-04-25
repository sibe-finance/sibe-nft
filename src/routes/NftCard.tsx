import box from '../img/box.svg';
import useFetch from '../hooks/useFetch';

export default function NftCard() {
    const token:any = {"id":1797186,"token_add":"BWpJp69ZevquUihzch5bXae46PLxe6PSVo62UG7NjNSA","price":18,"for_sale":1,"link_img":"https://arweave.net/LCoeTg6sLewFdnDMWyvHnwWghLx2Z9QFI9082ol214k","name":"Aurorian #4676","escrowAdd":"HEMwh3bNYn8zbkZDPKf1GZcp8nZBdUWX3LXgNCXh9TWV","seller_address":"Cx9ffMi61YCishvbKQEPL1T3KPsS5injkckM7ovTYZP1","attributes":"Background: Base Background,Skin: Human,Cloth: Base Cloth,Mouth: Base Mouth,Eyes: Red Eyes,Hair: Pigtails,Type: Aurorian,generation: 1","skin":null,"type":"aurory","ranking":null,"lastSoldPrice":18};

    return (
        <div className="body">
            <div className="nft-card-wrapper">
                <img src={token.link_img} alt="" className="nft-card-img" />
                <div className="nft-card-desc">
                    <div className="nft-card-price-attr">
                        <div className="nft-card-price"> <span>{token.price}</span> SOL</div>
                        <div className="nft-price-attr">Legendary</div>
                    </div>
                    <h3 className="nft-card-name">{token.name}</h3>
                    <div className="nft-card-owner">
                        Owned by <span>{token.seller_address.slice(0, 30) + '...'}</span>
                    </div>
                    <div className="nft-card-hr" />
                    <p className="nft-card-par">Вы можете получить эту или другие NFT купив сундук , тем самым вы попадете в White List</p>
                    <a href="/" className="nft-card-buy">
                    <img src={box} alt="box-img" className="nft-card-box-img" />
                        Buy now <span>0.25 SOL</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
