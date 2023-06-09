import styles from "../styles/Home.module.css";
import React, {useEffect, useState} from 'react'
import {Button, Dropdown} from 'semantic-ui-react';
import {ethers} from "ethers";
import {ERC20_ABI} from "../contracts/InProduction/ERC20";
import {DEPLOY_BLOCK, TOKEN_MAP} from "../helpers/Constants";
import PastPurchases from "./PastPurchases";
import CreateDCA from "./CreateDCA";
import ActiveDCA from "./ActiveDCA";
import DeActiveDCA from "./DeActiveDCA";

let tokenContract;
let tokenContractWithSigner;

let discountedUserOracle;

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function CreateBackupBox(props) {
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
                        userEvents.push(currentPurchase);
                    }
                }
                console.log('User Events', userEvents);
                setPurchases(userEvents);
                firstBlockNumber += 1000;
            }
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
            <ActiveDCA dca={activeDCAs}/>
            <DeActiveDCA dca={deactivatedDCAs}/>
            <PastPurchases purchases={purchases}/>
        </div>
    );
}
