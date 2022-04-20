import * as anchor from '@project-serum/anchor';
import {
    awaitTransactionSignatureConfirmation,
    CandyMachineAccount,
    CANDY_MACHINE_PROGRAM,
    getCandyMachineState,
    mintOneToken,
  } from '../scripts/candy-machine';
import { AlertState, getAtaForMint, toDate } from '../scripts/utils';
import { GatewayProvider } from '@civic/solana-gateway-react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { MintButton } from '../components/MintButton';
import { PublicKey, Transaction } from '@solana/web3.js';
import { sendTransaction } from '../scripts/connection';
import box from '../img/box.svg';


export interface MintCompProps {
    candyMachineId?: anchor.web3.PublicKey;
    connection: anchor.web3.Connection;
    txTimeout: number;
    rpcHost: string;
}

export default function MintComponent(props:MintCompProps) {
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
      });
    const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
    const [discountPrice, setDiscountPrice] = useState<anchor.BN>();
    const [endDate, setEndDate] = useState<Date>();
    const [isUserMinting, setIsUserMinting] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [itemsRemaining, setItemsRemaining] = useState<number>();
    const [isWhitelistUser, setIsWhitelistUser] = useState(false);
    const [isPresale, setIsPresale] = useState(false);

    const rpcUrl = props.rpcHost;
    const wallet = useWallet();
  
    const anchorWallet = useMemo(() => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }
  
      return {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      } as anchor.Wallet;
    }, [wallet]);


    const refreshCandyMachineState = useCallback(async () => {
        if (!anchorWallet) {
          return;
        }
    
        if (props.candyMachineId) {
          try {
            const cndy = await getCandyMachineState(
              anchorWallet,
              props.candyMachineId,
              props.connection,
            );
            let active =
              cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
            let presale = false;
            // whitelist mint?
            if (cndy?.state.whitelistMintSettings) {
              // is it a presale mint?
              if (
                cndy.state.whitelistMintSettings.presale &&
                (!cndy.state.goLiveDate ||
                  cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
              ) {
                presale = true;
              }
              // is there a discount?
              if (cndy.state.whitelistMintSettings.discountPrice) {
                setDiscountPrice(cndy.state.whitelistMintSettings.discountPrice);
              } else {
                setDiscountPrice(undefined);
                // when presale=false and discountPrice=null, mint is restricted
                // to whitelist users only
                if (!cndy.state.whitelistMintSettings.presale) {
                  cndy.state.isWhitelistOnly = true;
                }
              }
              // retrieves the whitelist token
              const mint = new anchor.web3.PublicKey(
                cndy.state.whitelistMintSettings.mint,
              );
              const token = (await getAtaForMint(mint, anchorWallet.publicKey))[0];
    
              try {
                const balance = await props.connection.getTokenAccountBalance(
                  token,
                );
                let valid = parseInt(balance.value.amount) > 0;
                // only whitelist the user if the balance > 0
                setIsWhitelistUser(valid);
                active = (presale && valid) || active;
              } catch (e) {
                setIsWhitelistUser(false);
                // no whitelist user, no mint
                if (cndy.state.isWhitelistOnly) {
                  active = false;
                }
                console.log('There was a problem fetching whitelist token balance');
                console.log(e);
              }
            }
            // datetime to stop the mint?
            if (cndy?.state.endSettings?.endSettingType.date) {
              setEndDate(toDate(cndy.state.endSettings.number));
              if (
                cndy.state.endSettings.number.toNumber() <
                new Date().getTime() / 1000
              ) {
                active = false;
              }
            }
            // amount to stop the mint?
            if (cndy?.state.endSettings?.endSettingType.amount) {
              let limit = Math.min(
                cndy.state.endSettings.number.toNumber(),
                cndy.state.itemsAvailable,
              );
              if (cndy.state.itemsRedeemed < limit) {
                setItemsRemaining(limit - cndy.state.itemsRedeemed);
              } else {
                setItemsRemaining(0);
                cndy.state.isSoldOut = true;
              }
            } else {
              setItemsRemaining(cndy.state.itemsRemaining);
            }
    
            if (cndy.state.isSoldOut) {
              active = false;
            }
    
            setIsActive((cndy.state.isActive = active));
            setIsPresale((cndy.state.isPresale = presale));
            setCandyMachine(cndy);
          } catch (e) {
            console.log('There was a problem fetching Candy Machine state');
            console.log(e);
          }
        }
      }, [anchorWallet, props.candyMachineId, props.connection]);
    
      const onMint = async (
        beforeTransactions: Transaction[] = [],
        afterTransactions: Transaction[] = [],
      ) => {
        try {
          setIsUserMinting(true);
          document.getElementById('#identity')?.click();
          if (wallet.connected && candyMachine?.program && wallet.publicKey) {
            let mintOne = await mintOneToken(
              candyMachine,
              wallet.publicKey,
              beforeTransactions,
              afterTransactions,
            );
    
            const mintTxId = mintOne[0];
    
            let status: any = { err: true };
            if (mintTxId) {
              status = await awaitTransactionSignatureConfirmation(
                mintTxId,
                props.txTimeout,
                props.connection,
                true,
              );
            }
    
            if (status && !status.err) {
              // manual update since the refresh might not detect
              // the change immediately
              let remaining = itemsRemaining! - 1;
              setItemsRemaining(remaining);
              setIsActive((candyMachine.state.isActive = remaining > 0));
              candyMachine.state.isSoldOut = remaining === 0;
              setAlertState({
                open: true,
                message: 'Congratulations! Mint succeeded!',
                severity: 'success',
              });
            } else {
              setAlertState({
                open: true,
                message: 'Mint failed! Please try again!',
                severity: 'error',
              });
            }
          }
        } catch (error: any) {
          let message = error.msg || 'Minting failed! Please try again!';
          if (!error.msg) {
            if (!error.message) {
              message = 'Transaction Timeout! Please try again.';
            } else if (error.message.indexOf('0x137')) {
              console.log(error);
              message = `SOLD OUT!`;
            } else if (error.message.indexOf('0x135')) {
              message = `Insufficient funds to mint. Please fund your wallet.`;
            }
          } else {
            if (error.code === 311) {
              console.log(error);
              message = `SOLD OUT!`;
              window.location.reload();
            } else if (error.code === 312) {
              message = `Minting period hasn't started yet.`;
            }
          }
    
          setAlertState({
            open: true,
            message,
            severity: 'error',
          });
          // updates the candy machine state to reflect the lastest
          // information on chain
          refreshCandyMachineState();
        } finally {
          setIsUserMinting(false);
        }
      };
      
      useEffect(() => {
        refreshCandyMachineState();
      }, [
        anchorWallet,
        props.candyMachineId,
        props.connection,
        refreshCandyMachineState,
      ]);


    return (
        <>
                {(
            <div className="mint-section">
                <h1 className="mint-header">Sibe Protocol <br /> white list </h1>
                <div className="mint-volume volume">
                    <h4 className="mint-volume-h4 volume-h4">Volume</h4>
                    <span className="mint-volume-data volume-data">6666</span>
                </div>
                {itemsRemaining && <span className="volume">Items remaining {itemsRemaining}</span>}
                {candyMachine?.state.isActive &&
                candyMachine?.state.gatekeeper &&
                wallet.publicKey &&
                wallet.signTransaction ? (
                    <GatewayProvider
                    wallet={{
                        publicKey:
                        wallet.publicKey ||
                        new PublicKey(CANDY_MACHINE_PROGRAM),
                        //@ts-ignore
                        signTransaction: wallet.signTransaction,
                    }}
                    gatekeeperNetwork={
                        candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                    }
                    clusterUrl={rpcUrl}
                    handleTransaction={async (transaction: Transaction) => {
                        setIsUserMinting(true);
                        const userMustSign = transaction.signatures.find(sig =>
                        sig.publicKey.equals(wallet.publicKey!),
                        );
                        if (userMustSign) {
                        setAlertState({
                            open: true,
                            message: 'Please sign one-time Civic Pass issuance',
                            severity: 'info',
                        });
                        try {
                            transaction = await wallet.signTransaction!(
                            transaction,
                            );
                        } catch (e) {
                            setAlertState({
                            open: true,
                            message: 'User cancelled signing',
                            severity: 'error',
                            });
                            // setTimeout(() => window.location.reload(), 2000);
                            setIsUserMinting(false);
                            throw e;
                        }
                        } else {
                        setAlertState({
                            open: true,
                            message: 'Refreshing Civic Pass',
                            severity: 'info',
                        });
                        }
                        try {
                        await sendTransaction(
                            props.connection,
                            wallet,
                            transaction,
                            [],
                            true,
                            'confirmed',
                        );
                        setAlertState({
                            open: true,
                            message: 'Please sign minting',
                            severity: 'info',
                        });
                        } catch (e) {
                        setAlertState({
                            open: true,
                            message:
                            'Solana dropped the transaction, please try again',
                            severity: 'warning',
                        });
                        console.error(e);
                        // setTimeout(() => window.location.reload(), 2000);
                        setIsUserMinting(false);
                        throw e;
                        }
                        await onMint();
                    }}
                    broadcastTransaction={false}
                    options={{ autoShowModal: false }}
                    >
                    <MintButton
                        candyMachine={candyMachine}
                        isMinting={isUserMinting}
                        setIsMinting={val => setIsUserMinting(val)}
                        onMint={onMint}
                        isActive={isActive || (isPresale && isWhitelistUser)}
                    />
                    </GatewayProvider>
                ) : (
                    <MintButton
                    candyMachine={candyMachine}
                    isMinting={isUserMinting}
                    setIsMinting={val => setIsUserMinting(val)}
                    onMint={onMint}
                    isActive={isActive || (isPresale && isWhitelistUser)}
                    />
                )}
                <img src={box} alt="box-img" className="box-img" />
            </div>)}
        </>

    )
}