import styles from "../styles/Home.module.css";
import React from "react";

export default function DeActiveDCA(props) {
    return (
        <>
            <p className={styles.dcaTitle}>Disabled DCA Strategies</p>
            {props.dca.length === 0 ?
                // eslint-disable-next-line react/no-unescaped-entities
                <p className={styles.dcaNoText}>Your don't have any active. Create one to start
                    growing your crypto holdings
                    right now.</p>
                : props.dca.map((purchase, index) =>
                    // eslint-disable-next-line react/jsx-key
                    <PastPurchaseRow purchase={purchase}/>
                )
            }
        </>
    )
}
