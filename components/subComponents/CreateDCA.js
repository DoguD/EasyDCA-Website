import styles from "../../styles/Home.module.css";
import React, {useEffect, useState} from "react";
import {PERIOD_OPTIONS, STABLE_TOKENS, TARGET_TOKENS, TOKENS} from "./Constants";
import {Dropdown} from "semantic-ui-react";
import {ClipLoader} from "react-spinners";
import {ERC20_ABI} from "../../contracts/InProduction/ERC20";
import {ethers} from "ethers";
import {DCA_ADDRESS} from "../../contracts/DCA";

export default function CreateDCA(props) {
    // DCA Options
    const [amount, setAmount] = useState();
    const [token, setToken] = useState();
    const [period, setPeriod] = useState();
    const [periodOption, setPeriodOption] = useState();
    // UI Controllers
    const [approvalNeeded, setApprovalNeeded] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.walletAddress !== "") {
            getAllowance();
        }
    }, [props.walletAddress]);

    async function getAllowance() {
        try {
            let tokenContract = new ethers.Contract(token, ERC20_ABI, props.provider);
            console.log(props.walletAddress, DCA_ADDRESS)
            let allowance = parseInt(await tokenContract.allowance(props.walletAddress, DCA_ADDRESS), 10);
            setApprovalNeeded(allowance === 0); // Any approval would work
        } catch (e) {
            console.log("Get Allowance Error:");
            console.log(e);
        }
    }

    async function approve() {
        setIsLoading(true);
        try {
            let transaction = await tokenContractWithSigner.approve(DCA_ADDRESS, "115792089237316195423570985008687907853269984665640564039457584007913129639935");
            setListener(transaction.hash);
        } catch (e) {
            setIsLoading(false);
            console.log("Approve error: ");
            console.log(e);
        }
    }

    // Transaction Listener
    function setListener(txHash) {
        props.provider.once(txHash, (transaction) => {
            setIsLoading(false);
        })
    }

    return (<>
        <p className={styles.dcaTitle}>Create a new DCA</p>
        <div className={styles.rowNoMarginNoPadding}>
            <p className={styles.dcaCreationText}>I want to buy </p>
            <input className={styles.basicInput} type={"text"} id={"backup-amount"}
                   value={amount}
                   placeholder={"10"}
                   onChange={(b) => {
                       setAmount(b.target.value)
                   }}>
            </input>
            <p className={styles.dcaCreationText}>USD worth of</p>
            <div style={{width: 160, marginLeft: 8, marginRight: 8}}>
                <Dropdown
                    placeholder='Select Token'
                    fluid
                    selection
                    options={TARGET_TOKENS}
                    onChange={(e, {value}) => {
                        setToken(value);
                    }}
                />
            </div>
            <p className={styles.dcaCreationText}>with</p>
            <div style={{width: 160, marginLeft: 8, marginRight: 8}}>
                <Dropdown
                    placeholder='Select Token'
                    fluid
                    selection
                    options={STABLE_TOKENS}
                    onChange={(e, {value}) => {
                        setToken(value);
                    }}
                />
            </div>
            <p className={styles.dcaCreationText}>every</p><
            input className={styles.basicInput} type={"text"} id={"backup-amount"}
                  value={period}
                  placeholder={"7"}
                  onChange={(b) => {
                      setPeriod(b.target.value)
                  }}></input>
            <div style={{width: 160}}>
                <Dropdown
                    placeholder='Select Token'
                    fluid
                    selection
                    options={PERIOD_OPTIONS}
                    onChange={(e, {value}) => {
                        setPeriodOption(value);
                    }}
                />
            </div>
        </div>
        <div className={styles.rowNoMarginNoPadding}>
            <div className={styles.mintButton}
                 onClick={() => {
                     if (props.walletAddress === "") {
                         props.connectWalletHandler();
                     } else if (approvalNeeded) {
                         approve();
                     } else {
                         createBackup();
                     }
                 }}>
                {
                    <p className={styles.mintText}>
                        {
                            props.walletAddress === "" ? "Connect Wallet" :
                                approvalNeeded ?
                                    "Approve" :
                                    "Create DCA Order"
                        }</p>}
            </div>
        </div>
    </>);
}
