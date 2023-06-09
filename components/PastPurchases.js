import styles from "../styles/Home.module.css";
import React, {useEffect, useState} from "react";
import PastPurchaseRow from "./subComponents/PastPurchaseRow";
import {TOKEN_DECIMALS, TOKEN_MAP} from "../helpers/Constants";


export default function PastPurchases(props) {
    const [purchaseDict, setPurchaseDict] = useState({});

    useEffect(() => {
        let purchaseDict = {};
        for (let i = 0; i < props.purchases.length; i++) {
            let currentPurchase = props.purchases[i];
            let key = TOKEN_MAP[currentPurchase.stableCoin] + "-" + TOKEN_MAP[currentPurchase.targetCoin];
            if (typeof purchaseDict[key] === "undefined") {
                purchaseDict[key] = [];
            }
            purchaseDict[key].push(currentPurchase);
        }
        console.log(purchaseDict);
        console.log(Object.keys(purchaseDict));
        setPurchaseDict(purchaseDict);
    }, [props.purchases]);

    function getAveragePurchase(purchases) {
        let total = 0;
        for (let i = 0; i < purchases.length; i++) {
            total += (purchases[i].targetAmount / (10 ** TOKEN_DECIMALS[purchases[i].targetCoin]));
        }
        return (total / purchases.length).toFixed(4) + " USD per " + TOKEN_MAP[purchases[0].targetCoin];
    }

    return (
        <>
            <p className={styles.dcaTitle} style={{marginTop: 32}}>Your Past Purchases</p>
            {props.purchases.length === 0 ?
                // eslint-disable-next-line react/no-unescaped-entities
                <p className={styles.dcaNoText}>Your DCA strategies hasn't made any purchases yet. Create one to start
                    growing your crypto holdings
                    right now.</p>
                :
                <>
                    {
                        Object.keys(purchaseDict).map((key, index) =>
                            // eslint-disable-next-line react/jsx-key
                            <>
                                <p className={styles.dcaNoText}
                                   style={{fontSize: 20, marginLeft: 24, marginTop: 16, marginBottom: 8}}>
                                    <b>Pair: </b>{key}</p>
                                <p className={styles.dcaNoText} style={{marginLeft: 24}}><b>Total
                                    Purchases: </b>{props.purchases.length}</p>
                                <p className={styles.dcaNoText} style={{marginLeft: 24}}><b>Average Purchase
                                    Price: </b>{getAveragePurchase(purchaseDict[key])}</p>
                                {
                                    purchaseDict[key].map((purchase, index) =>
                                        // eslint-disable-next-line react/jsx-key
                                        <PastPurchaseRow purchase={purchase}/>
                                    )
                                }
                            </>
                        )
                    }
                </>
            }
        </>);
}
