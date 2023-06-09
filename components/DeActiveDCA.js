import styles from "../styles/Home.module.css";
import React from "react";
import DCARow from "./subComponents/DCARow";

export default function DeActiveDCA(props) {
    return (
        props.dcas.length === 0 ? null :
            <>
                <p className={styles.dcaTitle}>Disabled DCA Strategies</p>
                <p className={styles.dcaNoText}>These are your deactivated DCA orders which are not currently running.
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    If you don't have enough coins or approval for that coin at the time of purchase, DCA orders get
                    deactivated automatically.</p>
                {
                    props.dcas.map((dca, index) =>
                        // eslint-disable-next-line react/jsx-key
                        <DCARow dca={dca} active={false}/>
                    )
                }
            </>
    )
}
