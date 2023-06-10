import styles from "../styles/Home.module.css";
import React from "react";
import {MONTHS, TOKEN_DECIMALS, TOKEN_LOGOS} from "../helpers/Constants";
import DCARow from "./subComponents/DCARow";
import {toast} from "react-hot-toast";
import {ethers} from "ethers";
import {ERC20_ABI} from "../contracts/InProduction/ERC20";
import {DCA_ADDRESS} from "../contracts/DCA";


export default function ActiveDCA(props) {
    return (
        props.dcas.length === 0 ? null :
            <>
                <p className={styles.dcaTitle} style={{marginTop: 32}}>Your Active DCA Strategies</p>
                {props.dcas.length === 0 ?
                    // eslint-disable-next-line react/no-unescaped-entities
                    <p className={styles.dcaNoText}>Your don't have any active. Create one to start
                        growing your crypto holdings
                        right now.</p>
                    : props.dcas.map((dca, index) =>
                        // eslint-disable-next-line react/jsx-key
                        <DCARow dca={dca} active={true} provider={props.provider}
                                dcaContractWithSigner={props.dcaContractWithSigner}
                                getDCAs={async () => await props.getDCAs()}
                                walletAddress={props.walletAddress}/>
                    )
                }
            </>
    );
}
