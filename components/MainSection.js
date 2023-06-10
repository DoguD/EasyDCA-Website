import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import React from "react";

export default function MainSection(props) {
    return (
        <div className={styles.mainBackground}>
            <NavBar/>
            <div className={styles.rowNoMarginNoPadding} style={{width: 1400, alignItems: 'center'}}>
                <div className={styles.colFlex1} style={{paddingRight: 24}}>
                    <p className={styles.mainTitle}>Dolar-Cost-Average into Crypto Easily</p>
                    <p className={styles.mainText}>DCA and grow your crypto holdings without needing Centralized Exchanges</p>
                </div>
                <div className={styles.colFlex1} style={{paddingLeft: 24}}>
                    <div className={styles.mainInnerContainer}>
                        <div className={styles.mainInnerRow}>
                            <img src={"/mainIcons/Bitcoin.png"} className={styles.mainIcon}/>
                            <p className={styles.mainInnerNumber}>1</p>
                            <p className={styles.mainInnerText}>Choose the coin you want to buy</p>
                        </div>
                        <div className={styles.mainInnerRow}>
                            <img src={"/mainIcons/Time.png"} className={styles.mainIcon}/>
                            <p className={styles.mainInnerNumber}>2</p>
                            <p className={styles.mainInnerText}>Choose the period you want to buy</p>
                        </div>
                        <div className={styles.mainInnerRow}>
                            <img src={"/mainIcons/chainlink.png"} className={styles.mainIcon}/>
                            <p className={styles.mainInnerNumber}>3</p>
                            <p className={styles.mainInnerText}>Sit back and relax! Your DCA will work automatically</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
