import styles from "../../styles/Home.module.css";
import {TOKEN_DECIMALS, TOKEN_LOGOS_FROM_NAME} from "../../helpers/Constants";
import {AiOutlineCaretDown, AiOutlineCaretUp} from "react-icons/ai";
import PastPurchaseRow from "./PastPurchaseRow";
import React, {useState} from "react";

export default function PastPurchasePair(props) {
    const [open, setOpen] = useState(false);


    function getAveragePurchase(purchases) {
        let total = 0;
        for (let i = 0; i < purchases.length; i++) {
            total += (purchases[i].targetAmount / (10 ** TOKEN_DECIMALS[purchases[i].targetCoin]));
        }
        return (1 / (total / purchases.length)).toFixed(4);
    }

    return (
        <>
            <div className={styles.rowNoMarginNoPadding} style={{
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 0,
                marginTop: 40
            }}>
                <p className={styles.dcaNoText}
                   style={{fontSize: 20}}>{props.pair.split("-")[1]}</p>
                <img src={TOKEN_LOGOS_FROM_NAME[props.pair.split("-")[1]]}
                     style={{marginLeft: 2, marginRight: 4, width: 20}}/>
                <p className={styles.dcaNoText}
                   style={{fontSize: 20}}> / {props.pair.split("-")[0]}
                </p>
                <img src={TOKEN_LOGOS_FROM_NAME[props.pair.split("-")[0]]}
                     style={{marginLeft: 2, marginRight: 0, width: 20}}/>
                <p className={styles.dcaNoText} style={{marginLeft: 24, fontSize: 20}}><span style={{fontWeight: 600}}>Purchase
                    Count:</span> {props.purchaseDict.length}</p>
                <p className={styles.dcaNoText} style={{marginLeft: 24, fontSize: 20}}><span style={{fontWeight: 600}}>Average
                    Price: </span>${getAveragePurchase(props.purchaseDict)}</p>
                <div style={{flex: 1}}/>
                {open ?
                    <AiOutlineCaretUp size={22} style={{cursor: "pointer", margin: 0}}
                                      onClick={() => {
                                          setOpen(false)
                                      }}/>
                    :
                    <AiOutlineCaretDown size={24} style={{marginLeft: 16, cursor: "pointer", marginTop: -4}}
                                        onClick={() => {
                                            setOpen(true)
                                        }}/>
                }
            </div>
            <div style={{height: 1, width: "100%", backgroundColor: "#e0e0e0", marginTop: 8}}/>
            {open ?
                props.purchaseDict.map((purchase, index) =>
                    // eslint-disable-next-line react/jsx-key
                    <PastPurchaseRow purchase={purchase}/>
                )
                : null
            }
        </>
    );
}
