import styles from "../../styles/Home.module.css";
import React from "react";
import {MONTHS, TOKEN_DECIMALS, TOKEN_LOGOS, TOKEN_MAP} from "./Constants";
import {Button} from "semantic-ui-react";

function PastPurchaseRow(props) {
    let dt = new Date(props.purchase.timestamp * 1000);
    return (
        <div className={styles.claimableBackupsRow}>
            <p className={styles.dcaNoText}><b>Purchase
                Date: </b>{dt.getDate() + " " + MONTHS[dt.getMonth()] + ", " + dt.getFullYear()}</p>

            <p className={styles.dcaNoText} style={{marginLeft: 32}}><b>Purchased
                Amount: </b>{(props.purchase.targetAmount / (10 ** TOKEN_DECIMALS[props.purchase.targetCoin])).toFixed(4)}
            </p>
            <img src={TOKEN_LOGOS[props.purchase.targetCoin]} style={{marginLeft: 8}} width={22} height={22}/>

            <p className={styles.dcaNoText} style={{marginLeft: 32}}><b>Spent Stable
                Amount: </b>{(props.purchase.stableAmount / (10 ** TOKEN_DECIMALS[props.purchase.stableCoin])).toFixed(4)}
            </p>
            <img src={TOKEN_LOGOS[props.purchase.stableCoin]} style={{marginLeft: 8}} width={22} height={22}/>
        </div>
    )
}

export default function PastPurchases(props) {
    console.log(props.purchases)
    return (
        <>
            <p className={styles.dcaTitle}>Your Past Purchases</p>
            {props.purchases.length === 0 ?
                // eslint-disable-next-line react/no-unescaped-entities
                <p className={styles.dcaNoText}>Your DCA strategies hasn't made any purchases yet. Create one to start
                    growing your crypto holdings
                    right now.</p>
                : props.purchases.map((purchase, index) =>
                    // eslint-disable-next-line react/jsx-key
                    <PastPurchaseRow purchase={purchase}/>
                )
            }
        </>);
}
