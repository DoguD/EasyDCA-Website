import styles from "../styles/Home.module.css";
import React, {useEffect, useState} from 'react'
import {DEPLOY_BLOCK} from "../helpers/Constants";
import PastPurchases from "./PastPurchases";
import CreateDCA from "./CreateDCA";
import ActiveDCA from "./ActiveDCA";
import DeActiveDCA from "./DeActiveDCA";

let tokenContract;

export default function CreateDCABox(props) {
    const [purchases, setPurchases] = useState([]);
    const [activeDCAs, setActiveDCAs] = useState([]);
    const [deactivatedDCAs, setDeactivatedDCAs] = useState([]);

    useEffect(() => {
        if (props.walletAddress !== "") {
            getPastPurchases(props.walletAddress);
            getDCAs(props.walletAddress);
        }
    }, [props.walletAddress]);

    async function getPastPurchases(walletAddress) {
        try {
            let latestBlockNumber = await props.provider.getBlockNumber();
            let userEvents = [];
            let firstBlockNumber = DEPLOY_BLOCK;
            while (firstBlockNumber < latestBlockNumber) {
                let events = await props.dcaContract.queryFilter("Purchase",
                    firstBlockNumber,
                    firstBlockNumber + 1000);
                for (let i = 0; i < events.length; i++) {
                    let event = events[i];
                    if (event.args[0] === props.walletAddress) {
                        let currentPurchase = {};
                        currentPurchase.address = event.args[0];
                        currentPurchase.stableCoin = event.args[1];
                        currentPurchase.targetCoin = event.args[2];
                        currentPurchase.stableAmount = parseInt(event.args[3], 10);
                        currentPurchase.targetAmount = parseInt(event.args[4], 10);
                        currentPurchase.timestamp = parseInt(event.args[5], 10);
                        currentPurchase.transactionHash = event.transactionHash;
                        userEvents.push(currentPurchase);
                    }
                }
                firstBlockNumber += 1000;
            }
            setPurchases(userEvents);
        } catch (e) {
            console.log("Past purchases error: ");
            console.log(e);
            await getPastPurchases(walletAddress);
        }
    }

    async function getDCAs(walletAddress) {
        let dcaCount = parseInt(await props.dcaContract.userDCACount(walletAddress), 10);
        let activeDCAs = [];
        let deactivatedDCAs = [];

        for (let i = 0; i < dcaCount; i++) {
            let dcaIndex = parseInt(await props.dcaContract.userDCAs(walletAddress, i), 10)
            let dca = await props.dcaContract.dcaList(dcaIndex);

            let currentDCA = {
                from: dca[0],
                stableCoin: dca[1],
                targetCoin: dca[2],
                amount: parseInt(dca[3], 10),
                frequency: parseInt(dca[4], 10),
                lastPurchase: parseInt(dca[5], 10),
                treshold: parseInt(dca[6], 10),
                isActive: dca[7],
                id: dcaIndex
            }

            if (currentDCA.isActive) {
                activeDCAs.push(currentDCA);
            } else {
                deactivatedDCAs.push(currentDCA);
            }
        }
        setActiveDCAs(activeDCAs);
        setDeactivatedDCAs(deactivatedDCAs);
    }

    async function getBalance(decimal) {
        try {
            setBalance(parseInt(await tokenContract.balanceOf(props.walletAddress), 10) / 10 ** decimal);
        } catch (e) {
            console.log("Backup Box, get allowance error:");
            console.log(e);
        }
    }

    return (
        <div className={styles.createBackupContainer}>
            <CreateDCA provider={props.provider}
                       walletAddress={props.walletAddress}
                       connectWalletHandler={() => props.connectWalletHandler()}
                       dcaContract={props.dcaContract}
                       dcaContractWithSigner={props.dcaContractWithSigner}

                       getLastPurchases={async () => await getPastPurchases(props.walletAddress)}
                       getDCAs={async () => await getDCAs(props.walletAddress)}/>
            <ActiveDCA provider={props.provider}
                       dcas={activeDCAs}
                       dcaContractWithSigner={props.dcaContractWithSigner}
                       getLastPurchases={async () => await getPastPurchases(props.walletAddress)}
                       getDCAs={async () => await getDCAs(props.walletAddress)}/>
            <DeActiveDCA dcas={deactivatedDCAs}/>
            <PastPurchases purchases={purchases}/>
        </div>
    );
}
