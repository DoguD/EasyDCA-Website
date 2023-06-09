import styles from "../styles/Home.module.css";
import React, {useEffect, useState} from "react";
import {PERIOD_OPTIONS, STABLE_TOKENS, TARGET_TOKENS, TOKEN_MAP, TOKENS} from "../helpers/Constants";
import {Dropdown} from "semantic-ui-react";
import {ClipLoader} from "react-spinners";
import {ERC20_ABI} from "../contracts/InProduction/ERC20";
import {ethers} from "ethers";
import {DCA_ADDRESS} from "../contracts/DCA";
import {toast} from "react-hot-toast";

export default function CreateDCA(props) {
    // DCA Options
    const [amount, setAmount] = useState();
    const [token, setToken] = useState();
    const [stableToken, setStableToken] = useState();
    const [period, setPeriod] = useState();
    const [periodOption, setPeriodOption] = useState();
    // UI Controllers
    const [approvalNeeded, setApprovalNeeded] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.walletAddress !== "") {
            getAllowance();
        }
    }, [props.walletAddress, stableToken]);

    function isValid() {
        let result = amount != null && token != null && stableToken != null && period != null && periodOption != null;
        return result;
    }

    async function getAllowance() {
        try {
            if (stableToken != null) {
                let tokenContract = new ethers.Contract(stableToken, ERC20_ABI, props.provider);
                console.log(props.walletAddress, DCA_ADDRESS)
                let allowance = parseInt(await tokenContract.allowance(props.walletAddress, DCA_ADDRESS), 10);
                console.log('Allowance', allowance);
                setApprovalNeeded(allowance === 0); // Any approval would work
            }
        } catch (e) {
            console.log("Get Allowance Error:");
            console.log(e);
        }
    }

    async function approve() {
        setIsLoading(true);
        try {
            let tokenContract = new ethers.Contract(stableToken, ERC20_ABI, props.provider);
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

    async function createDCA() {
        setIsLoading(true);
        try {
            console.log("Creating DCA");
            console.log(stableToken)
            console.log(token)
            console.log(amount)
            console.log(period * periodOption)
            let transaction = await props.dcaContractWithSigner.addDCA(
                stableToken,
                token,
                amount,
                period * periodOption,
            );
            setListener(transaction.hash, 'dca');
        } catch (e) {
            toast.error("DCA Order Creation Failed! Check your " + TOKEN_MAP[stableToken] + " balance.");
            setIsLoading(false);
            console.log("Create DCA error: ");
            console.log(e);
        }
    }

    // Transaction Listener
    function setListener(txHash, type) {
        props.provider.once(txHash, async (transaction) => {
            if (type === 'approval') {
                await getAllowance();
                toast.success("Approval Successful!");
            }
            if (type === 'dca') {
                toast.success("DCA Order Created!");
                await props.getLastPurchases();
                await props.getDCAs();
            }
            setIsLoading(false);
        })
    }

    return (<>
        <p className={styles.dcaTitle} style={{width: '100%', textAlign: 'center', marginBottom: 32}}>Create new DCA
            Order</p>
        <div className={styles.rowNoMarginNoPadding}>
            <p className={styles.dcaCreationText}>I want to buy </p>
            <input className={styles.basicInput} type={"text"} id={"dca-amount"}
                   value={amount}
                   placeholder={""}
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
                        setStableToken(value);
                    }}
                />
            </div>
            <p className={styles.dcaCreationText}>every</p><
            input className={styles.basicInput} type={"text"} id={"dca-amount"}
                  value={period}
                  placeholder={""}
                  onChange={(b) => {
                      setPeriod(b.target.value)
                  }}></input>
            <div style={{width: 160}}>
                <Dropdown
                    placeholder='Select Period'
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
            <div className={styles.mainButton}
                 onClick={() => {
                     if (props.walletAddress === "") {
                         props.connectWalletHandler();
                     } else if (approvalNeeded && isValid()) {
                         approve();
                     } else if (isValid()) {
                         createDCA();
                     }
                 }}
                 style={{
                     backgroundColor: props.walletAddress === "" || isValid() ? "#1a5df5" : 'lightgrey',
                     cursor: props.walletAddress === "" || isValid() ? "pointer" : "default",
                     width: 300,
                     height: 50
                 }}>
                {
                    isLoading ?
                        <ClipLoader color={"white"} size={24}/> :
                        <p className={styles.mainButtonText}>
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
