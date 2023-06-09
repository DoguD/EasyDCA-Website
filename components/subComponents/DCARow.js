import styles from "../../styles/Home.module.css";
import {MONTHS, TOKEN_LOGOS, TOKEN_MAP} from "../../helpers/Constants";
import React from "react";

export default function DCARow(props) {
    let lastPurchase = new Date(props.dca.lastPurchase * 1000);
    let nextPurchase = new Date(props.dca.treshold * 1000);

    function getPeriodOption(period) {
        let text;
        if (period < (24 * 60 * 60)) {
            text = ' seconds'
        } else if (period < (7 * 24 * 60 * 60)) {
            period /= (24 * 60 * 60)
            text = ' days'
        } else if (period < (30 * 24 * 60 * 60)) {
            period /= (7 * 24 * 60 * 60)
            text = ' weeks'
        } else {
            period /= (30 * 24 * 60 * 60)
            text = ' months'
        }
        return period.toString() + text;
    }

    return (
        <div className={styles.claimableBackupsRow} style={{backgroundColor: props.active ? "#ffffff" : "lightgrey"}}>
            <p className={styles.dcaNoText}><b>Stable
                Amount: </b>{props.dca.amount}
            </p>
            <img src={TOKEN_LOGOS[props.dca.stableCoin]} style={{marginLeft: 8}} width={22} height={22}/>

            <p className={styles.dcaNoText} style={{marginLeft: 16}}><b>Target
                Coin: </b>{TOKEN_MAP[props.dca.targetCoin]}
            </p>
            <img src={TOKEN_LOGOS[props.dca.targetCoin]} style={{marginLeft: 8}} width={22} height={22}/>

            <p className={styles.dcaNoText} style={{marginLeft: 16}}><b>Purchase
                Period:</b>{getPeriodOption(props.dca.frequency)}
            </p>

            <p className={styles.dcaNoText} style={{marginLeft: 16}}><b>Last
                Purchase:</b>{lastPurchase.getDate() + " " + MONTHS[lastPurchase.getMonth()] + ", " + lastPurchase.getFullYear()}
            </p>

            {props.active ?
                <p className={styles.dcaNoText} style={{marginLeft: 16}}><b>Next
                    Purchase:</b>{nextPurchase.getDate() + " " + MONTHS[nextPurchase.getMonth()] + ", " + nextPurchase.getFullYear()}
                </p> : null}
        </div>
    )
}
