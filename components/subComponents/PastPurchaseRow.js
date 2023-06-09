import styles from "../../styles/Home.module.css";
import {MONTHS, TOKEN_DECIMALS, TOKEN_LOGOS} from "../../helpers/Constants";
import React from "react";
import {BiLinkExternal} from "react-icons/bi";

export default function PastPurchaseRow(props) {
    let dt = new Date(props.purchase.timestamp * 1000);

    function timeToTwoDigits(time) {
        if (time < 10) {
            return "0" + time;
        }
        return time;
    }

    return (
        <div className={styles.dcaRowContainer}>
            <p className={styles.dcaNoText}><b>Purchase
                Date: </b>{dt.getDate() + " " + MONTHS[dt.getMonth()] + ", " + dt.getFullYear() + " " + timeToTwoDigits(dt.getHours()) + ":" + timeToTwoDigits(dt.getMinutes())}
            </p>

            <p className={styles.dcaNoText} style={{marginLeft: 32}}>
                <b>Amount: </b>{(props.purchase.targetAmount / (10 ** TOKEN_DECIMALS[props.purchase.targetCoin])).toFixed(4)}
            </p>
            <img src={TOKEN_LOGOS[props.purchase.targetCoin]} style={{marginLeft: 8}} width={22} height={22}/>

            <p className={styles.dcaNoText} style={{marginLeft: 32}}>
                <b>Spent: </b>{(props.purchase.stableAmount / (10 ** TOKEN_DECIMALS[props.purchase.stableCoin])).toFixed(4)}
            </p>
            <img src={TOKEN_LOGOS[props.purchase.stableCoin]} style={{marginLeft: 8}} width={22} height={22}/>
            <p className={styles.dcaNoText} style={{marginLeft: 32}}>
                <b>Price: </b>${((props.purchase.stableAmount / (10 ** TOKEN_DECIMALS[props.purchase.stableCoin])) / ((props.purchase.targetAmount / (10 ** TOKEN_DECIMALS[props.purchase.targetCoin])))).toFixed(4)}
            </p>
            <div style={{flex: 1}}/>
            <a href={"https://ftmscan.com/tx/" + props.purchase.transactionHash}
               target={"_blank"} rel={"noreferrer"}>
                <BiLinkExternal
                    size={22} color={"#1a5df5"} style={{cursor: 'pointer'}}/>
            </a>
        </div>
    )
}
