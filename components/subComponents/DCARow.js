import styles from "../../styles/Home.module.css";
import {MONTHS, TOKEN_DECIMALS, TOKEN_LOGOS, TOKEN_MAP} from "../../helpers/Constants";
import React, {useEffect, useState} from "react";
import {AiFillDelete, AiOutlineWarning} from "react-icons/ai";
import {toast} from "react-hot-toast";
import {ClipLoader} from "react-spinners";
import {ethers} from "ethers";
import {ERC20_ABI} from "../../contracts/InProduction/ERC20";
import {DCA_ADDRESS} from "../../contracts/DCA";

export default function DCARow(props) {
    let lastPurchase = new Date(props.dca.lastPurchase * 1000);
    let nextPurchase = new Date(props.dca.treshold * 1000);

    const [isLoading, setIsLoading] = useState(false);
    const [approvalNeeded, setApprovalNeeded] = useState(false);
    const [balanceNeeded, setBalanceNeeded] = useState(false);

    useEffect(() => {
        checkBalanceAndApproval()
    }, [props.dca]);

    async function checkBalanceAndApproval() {
        try {
            let tokenContract = new ethers.Contract(props.dca.stableCoin, ERC20_ABI, props.provider);
            let balance = parseInt(await tokenContract.balanceOf(props.walletAddress), 10) / 10 ** TOKEN_DECIMALS[props.dca.stableCoin];
            let allowance = parseInt(await tokenContract.allowance(props.walletAddress, DCA_ADDRESS), 10) / 10 ** TOKEN_DECIMALS[props.dca.stableCoin];

            if (balance < props.dca.amount) {
                setBalanceNeeded(true);
            }
            if (allowance === 0) {
                setApprovalNeeded(true);
            }
        } catch (e) {
            console.log("Check Balance and Approval Error:");
            console.log(e);
        }
    }

    async function approve() {
        try {
            let tokenContract = new ethers.Contract(props.dca.stableCoin, ERC20_ABI, props.provider);
            let tokenContractWithSigner = tokenContract.connect(props.provider.getSigner());
            let transaction = await tokenContractWithSigner.approve(DCA_ADDRESS, "115792089237316195423570985008687907853269984665640564039457584007913129639935");
            setListener(transaction.hash, 'approval');
        } catch (e) {
            toast.error("Approval Failed!");
            setIsLoading(false);
            console.log("Approve error: ");
            console.log(e);
        }
    }

    async function deleteDCA(id) {
        try {
            setIsLoading(true);
            let tx = await props.dcaContractWithSigner.deleteDCA(id);
            setListener(tx.hash, 'delete');
        } catch (e) {
            console.log("Delete DCAs Error:");
            console.log(e);
        }
    }

    function setListener(txHash, type) {
        props.provider.once(txHash, async (transaction) => {
            if (type === 'delete') {
                toast.success("Successfully deleted the DCA strategy!");
                await props.getDCAs();
                setIsLoading(false);
            } else if (type === 'approval') {
                toast.success("Successfully approved the DCA strategy!");
                checkBalanceAndApproval();
                setApprovalNeeded(false);
                setIsLoading(false);
            }
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
        <>
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
            {approvalNeeded ?
                <div className={styles.rowNoMarginNoPadding} style={{cursor: 'pointer', marginTop: 8, alignItems: 'flex-start', justifyContent: 'flex-start'}}
                     onClick={async () => approve()}>
                    <AiOutlineWarning size={22} color={"darkred"} style={{marginRight: 8}}/>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className={styles.dcaNoText} style={{marginLeft: 0, color: "darkred"}}>You currently don't have
                        enough allowance for this strategy. You can approve by clicking to this message.</p>
                </div>
                :
                balanceNeeded ?
                    <div className={styles.rowNoMarginNoPadding} style={{marginTop: 8, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <AiOutlineWarning size={22} color={"darkred"} style={{marginRight: 8}}/>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className={styles.dcaNoText} style={{marginLeft: 0, color: "darkred"}}>You currently don't have
                            enough {TOKEN_MAP[props.dca.stableCoin]} in your wallet for this strategy.</p>
                    </div>
                    : null
            }
        </>
    )
}
