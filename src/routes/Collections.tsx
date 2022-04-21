import { useState } from 'react';
import {
    Link
  } from "react-router-dom";
import coll from '../collections.json';

export default function Collections(props:any) {
    const [collections, setCollections] = useState(coll.result.data);
    
    return (
        <div className="collections-wrapper">
        {collections?.map((collection)=> (
          <Link to={`aurory`} key={collection.name} className="collection-item-wrapper">
            <div className="collection-item-logo"></div>
            <h3 className="collection-item-header">{collection.name}</h3>
            <div className="collection-item-volume volume">
                    <h4 className="collection-item-volume-h4 volume-h4">Volume</h4>
                    <span className="collection-item-volume-data volume-data"> {collection.items} </span>
                </div>
          </Link>
        ))}
      </div>
    );
}