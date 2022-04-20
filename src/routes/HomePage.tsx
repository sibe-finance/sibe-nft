import * as anchor from '@project-serum/anchor';
import Collections from '../routes/Collections';
import MintComponent from '../components/MintComponent';

export interface HomeProps {
  candyMachineId?: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  txTimeout: number;
  rpcHost: string;
}

export default function HomePage (props:HomeProps) {
    return (
        <div className="body">
          <div className="gradient"></div>
          <MintComponent candyMachineId={props.candyMachineId}
                connection={props.connection}
                txTimeout={props.txTimeout}
                rpcHost={props.rpcHost}/>
            <h1 className="collection-header">SIBE NFT Collections</h1>
            <Collections />
        </div>
    )
}
