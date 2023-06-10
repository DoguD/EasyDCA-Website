import styles from "../styles/Home.module.css";
import React, {useEffect, useState} from "react";
import {TOKEN_MAP} from "../helpers/Constants";
import PastPurchasePair from "./subComponents/PastPurchasePair";


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

    return (
        props.purchases.length === 0 ? null :
            <>
                <p className={styles.dcaTitle} style={{width: '100%', textAlign: 'center'}}>Your Past Purchases</p>
                {props.purchases.length === 0 ?
                    // eslint-disable-next-line react/no-unescaped-entities
                    <p className={styles.dcaNoText}>Your DCA strategies hasn't made any purchases yet. Create one to
                        start
                        growing your crypto holdings
                        right now.</p>
                    :
                    <>
                        {
                            Object.keys(purchaseDict).map((key, index) =>
                                // eslint-disable-next-line react/jsx-key
                                <PastPurchasePair pair={key} purchaseDict={purchaseDict[key]}/>
                            )
                        }
                    </>
                }
            </>);
}
