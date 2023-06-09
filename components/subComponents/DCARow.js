import styles from "../../styles/Home.module.css";
import {MONTHS, TOKEN_LOGOS, TOKEN_MAP} from "../../helpers/Constants";
import React from "react";
import {AiFillDelete} from "react-icons/ai";
import {toast} from "react-hot-toast";
import {ClipLoader} from "react-spinners";

export default function DCARow(props) {
    let lastPurchase = new Date(props.dca.lastPurchase * 1000);
    let nextPurchase = new Date(props.dca.treshold * 1000);

    const [isLoading, setIsLoading] = React.useState(false);

    async function deleteDCA(id) {
        try {
            setIsLoading(true);
            let tx = await props.dcaContractWithSigner.deleteDCA(id);
            setListener(tx.hash);
        } catch (e) {
            console.log("Delete DCAs Error:");
            console.log(e);
        }
    }

    function setListener(txHash) {
        props.provider.once(txHash, async (transaction) => {
            toast.success("Successfully deleted the DCA strategy!");
            await props.getDCAs();
            setIsLoading(false);
        })
    }

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
        <div className={styles.dcaRowContainer} style={{backgroundColor: props.active ? "#ffffff" : "lightgrey"}}>
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
            {props.active ? <>
                <div style={{flex: 1}}/>
                {isLoading ? <ClipLoader size={22} color={'red'}/> :
                    <AiFillDelete size={22} color={"red"} style={{cursor: 'pointer'}} onClick={() => {
                        confirm("Are you sure you want to delete this DCA strategy? If you do so, automatic purchases will no longer happen for this strategy.") && deleteDCA(props.dca.id)
                    }}/>}
            </> : null}
        </div>
    )
}
