import styles from "../styles/Home.module.css";
import React from "react";
import PastPurchaseRow from "./subComponents/PastPurchaseRow";


export default function PastPurchases(props) {
    return (
        <>
            <p className={styles.dcaTitle} style={{marginTop: 32}}>Your Past Purchases</p>
            {props.purchases.length === 0 ?
                // eslint-disable-next-line react/no-unescaped-entities
                <p className={styles.dcaNoText}>Your DCA strategies hasn't made any purchases yet. Create one to start
                    growing your crypto holdings
                    right now.</p>
                :
                <><p className={styles.dcaNoText}><b>Total Purchases: </b>{props.purchases.length}</p>
                    {
                        props.purchases.map((purchase, index) =>
                            // eslint-disable-next-line react/jsx-key
                            <PastPurchaseRow purchase={purchase}/>
                        )
                    }
                </>
            }
        </>);
}
