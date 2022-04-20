/* eslint-disable react-hooks/exhaustive-deps */
import NFTItem from '../components/NFTItem';
import useFetch from '../hooks/useFetch';
import React, {useState, useEffect} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

export default function NFTMarketplace () {
    const [connectedNft, setConnectedNft] = useState(false);
    const [nftCollection, setNftCollection] = useState<any[]>([]);
    const wallet = useWallet();
    const {get, loader} = useFetch();
    const params = useParams();
    const collection = params.collectionId;

    useEffect(() => {
      get(`https://qzlsklfacc.medianetwork.cloud/nft_for_sale?collection=${collection}`)
      .then((data:any) => {
        console.log(data);
        setNftCollection(data);
        return nftCollection;
      })
      .catch(error => console.error(error)) 
    }, []) 

    const myNftButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setConnectedNft(true);
        event.preventDefault();
    };

    const nftButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setConnectedNft(false);
        event.preventDefault();
    };

    return (

        <div className="body">
            <div className="nft-marketplace-wrapper">
                <h1 className="nft-marketplace-header">{params.collectionId}</h1>
                <div className="nft-marketplace-items-wrapper">
                    <div className="decor"></div>
                    <h2 style={{color: "white"}}>{loader ? <Loader /> : ""}</h2>
                    {connectedNft && <div className="nft-items-wrapper">
                    </div> }
                    { !connectedNft && <div className="nft-items-wrapper">
                    {nftCollection?.map((nft, index) => {
                         return <NFTItem id={nft.id} token_add={nft.token_add} price={nft.price} img={nft.link_img} name={nft.name} owner={nft.seller_address} attr={nft.attributes} collectionId={params.collectionId} key={index} />
                    }
                    )}
                    </div>}

                    <div className="arrows">

                    </div>
                </div>
            </div>
        </div>
    )
}
