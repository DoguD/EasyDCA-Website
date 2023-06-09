import Head from 'next/head'
import styles from '../styles/Home.module.css'
// Web3
import {NFT_ADDRESS, NFT_ABI, DISCOUNTED_ADDRESS, DISCOUNTED_ABI} from "../contracts/InProduction/EasyClub";
import {ethers} from "ethers";

import React, {useEffect, useState} from "react";

import 'semantic-ui-css/semantic.min.css'

// Circular Progress Bar
import 'react-circular-progressbar/dist/styles.css';
import CreateBackupBox from "../components/CreateBackupBox";
import {PRESALE_ABI, PRESALE_ADDRESS} from "../contracts/InProduction/Presale";
import {USDC_ABI, USDC_ADDRESS, USDT_ADDRESS} from "../contracts/InProduction/USDC";
import {EASY_ABI, EASY_ADDRESS} from "../contracts/InProduction/EasyToken";
import {X_EASY_ADDRESS, X_EASY_ABI} from "../contracts/InProduction/xEasy";
import {LP_ABI, LP_ADDRESS, LP_ADDRESS_USDT} from "../contracts/InProduction/LP";
import {FARM_ABI, FARM_ADDRESS} from "../contracts/InProduction/Farm";
import {BACKUP_ABI, BACKUP_ADDRESS} from "../contracts/InProduction/Backup";
import {ORACLE_ABI, ORACLE_ADDRESS} from "../contracts/InProduction/Oracle";
import {useCookies} from "react-cookie";
import MainSection from "../components/MainSection";

// Web3 Global Vars
let provider;
let nftContract;
let discountedContract;
let nftContractWithSigner;
let discountedContractWithSigner;
let signer;

let presaleContract;
let presaleContractWithSigner;
let usdcContract;
let usdcContractWithSigner;
let easyContract;
let easyContractWithSigner;
let xEasyContract;
let xEasyWithSigner;
let lpContract;
let lpContractWithSigner;
let lpContractUsdt;
let lpContractWithSignerUsdt;
let farmContract;
let farmContractWithSigner;
let backupContract;
let backupContractWithSigner;
let oracleContract;
let usdtContract;
let usdtContractWithSigner;

export default function Home() {
    const [walletAddress, setWalletAddress] = useState("");
    // UI Controllers
    const [metamaskInstalled, setMetamaskInstalled] = useState(false);
    const [easyPrice, setEasyPrice] = useState(0.005);
    const [easySupply, setEasySupply] = useState(0);
    const [totalBackups, setTotalBackups] = useState(0);
    const [discountedBackups, setDiscountedBackups] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalRefs, setTotalRefs] = useState(0);

    const [menuItem, setMenuItem] = useState(0);

    // Cookie
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    // Referrer and cookie
    const [refAddress, setRefAddress] = useState("0x0000000000000000000000000000000000000000");
    useEffect(() => {
        // Get referrer if any
        let fullUrl = window.location.href;
        let splitUrl = fullUrl.split('?');
        if (splitUrl.length > 1) {
            let params = splitUrl[1];
            if (params.indexOf("r=") !== -1) {
                let referer = params.slice(2, 44);
                console.log("Ref: ", referer);
                setRefAddress(referer);
            }
        }
        // Got connected wallet if any
        if (metamaskInstalled && typeof cookies['walletAddress'] !== "undefined") {
            connectWalletHandler();
        }
    }, [metamaskInstalled]);

    // Web3
    useEffect(() => {
        if (window.ethereum != null) {
            setMetamaskInstalled(true);
            console.log("Metamask installed.");
            window.ethereum.enable();
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");

            // CONTRACTS
            nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider)
            discountedContract = new ethers.Contract(DISCOUNTED_ADDRESS, DISCOUNTED_ABI, provider);

            presaleContract = new ethers.Contract(PRESALE_ADDRESS, PRESALE_ABI, provider);
            usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
            usdtContract = new ethers.Contract(USDT_ADDRESS, USDC_ABI, provider);
            easyContract = new ethers.Contract(EASY_ADDRESS, EASY_ABI, provider);
            xEasyContract = new ethers.Contract(X_EASY_ADDRESS, X_EASY_ABI, provider);
            lpContract = new ethers.Contract(LP_ADDRESS, LP_ABI, provider);
            lpContractUsdt = new ethers.Contract(LP_ADDRESS_USDT, LP_ABI, provider);
            farmContract = new ethers.Contract(FARM_ADDRESS, FARM_ABI, provider);
            backupContract = new ethers.Contract(BACKUP_ADDRESS, BACKUP_ABI, provider);
            oracleContract = new ethers.Contract(ORACLE_ADDRESS, ORACLE_ABI, provider);

            getGeneralData();
        } else {
            console.log("Metamask not installed.");
            provider = new ethers.providers.getDefaultProvider("https://rpc.ftm.tools");
        }
    }, [signer])

    // Network Change
    async function changeNetworkToFTM() {
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found.");
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: `0x${Number(250).toString(16)}`,
                    chainName: "Fantom",
                    nativeCurrency: {
                        name: "Fantom",
                        symbol: "FTM",
                        decimals: 18
                    },
                    rpcUrls: ["https://rpc.ftm.tools/"],
                    blockExplorerUrls: ["https://ftmscan.com/"]
                }]
            });
        } catch (e) {
            alert(e.message);
        }
    }

    // Wallet Connect
    const connectWalletHandler = async () => {
        if (!metamaskInstalled) {
            alert("Please install Metamask to use EasyBackup.");
            return;
        }
        try {
            await window.ethereum.enable();
            let chainId = await provider.getNetwork();
            chainId = chainId['chainId'];

            if (chainId !== 250) {
                if (window.confirm("Please switch to Fantom Network to use EasyBackup.")) {
                    await changeNetworkToFTM();
                }
            } else {
                signer = provider.getSigner();
                let userAddress = await signer.getAddress();
                setWalletAddress(userAddress);

                setCookie("walletAddress", userAddress);
                console.log(cookies);

                nftContractWithSigner = nftContract.connect(signer);
                discountedContractWithSigner = discountedContract.connect(signer);
                usdcContractWithSigner = usdcContract.connect(signer);
                usdtContractWithSigner = usdtContract.connect(signer);
                presaleContractWithSigner = presaleContract.connect(signer);
                easyContractWithSigner = easyContract.connect(signer);
                xEasyWithSigner = xEasyContract.connect(signer);
                lpContractWithSigner = lpContract.connect(signer);
                lpContractWithSignerUsdt = lpContractUsdt.connect(signer);
                farmContractWithSigner = farmContract.connect(signer);
                backupContractWithSigner = backupContract.connect(signer);
            }
        } catch (e) {
            console.log(e);
        }
    };

    async function getGeneralData() {
        try {
            let supply = parseInt(await easyContract.totalSupply(), 10) / 10 ** 18;

            let reserves = await lpContract.getReserves();
            let usdcInLp = parseInt(reserves[0], 10) / 10 ** 6;
            let easyInLp = parseInt(reserves[1], 10) / 10 ** 18;

            setEasySupply(supply);
            setTotalBackups(parseInt(await backupContract.backupCount(), 10));
            setDiscountedBackups(parseInt(await backupContract.discountedBackupCount(), 10));
            setTotalUsers(parseInt(await backupContract.totalUsers(), 10));
            setEasyPrice(usdcInLp / easyInLp);
            setTotalRefs(parseInt(await backupContract.referralBackupCount(), 10));
        } catch (e) {
            console.log("General methods error: ");
            console.log(e);
            let chainId = await provider.getNetwork();
            chainId = chainId['chainId'];
            if (chainId !== 250) {
                if (window.confirm("Please switch to Fantom Network to use EasyBlock.")) {
                    await changeNetworkToFTM();
                }
            } else {
                await getGeneralData();
            }
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>EasyBackup - Never lose your crypto</title>
                <meta name="description" content="DCA Into Crypto Easily"/>
                <link rel="icon" href="/favicon.png"/>

                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
                    rel="stylesheet"/>
            </Head>
            <main className={styles.main}>
                <MainSection/>
                <CreateBackupBox walletAddress={walletAddress}
                                 connectWalletHandler={() => connectWalletHandler()}
                                 backupContract={backupContract}
                                 backupContractWithSigner={backupContractWithSigner}
                                 provider={provider}
                                 signer={signer}
                                 oracleContract={oracleContract}
                                 easyContract={easyContract}
                                 refAddress={refAddress}
                                 totalRefs={totalRefs}/>

                <div className={styles.mobilePadding} style={{width: '100%'}}>
                    <div className={styles.backupInfoCard}>
                        <p className={styles.boxTitle}>What is EasyBackup?</p>
                        <p className={styles.sectionDescription}>EasyBackup is a protocol which lets you assign backup
                            wallets
                            for the tokens in your wallet. This way
                            if you lose access to your wallet for any reason, the backup wallet will be able to
                            transfer
                            those
                            tokens to itself. You never need to transfer your tokens to EasyBackup smart contract and
                            only
                            the
                            backup wallet will be able transfer those tokens. Similarly, the backup system can be used
                            for
                            inheritance.</p>
                        <p className={styles.boxTitle}>How to use?</p>
                        <p className={styles.sectionDescription} style={{width: '100%'}}>- Select a token, amount,
                            backup
                            wallet, and access time.
                            <br/></p>
                        <p className={styles.sectionSmallDescription}>
                            <b>Token: </b>The token you want the backup wallet to be able to access. You can choose from
                            the
                            list
                            or use a custom token address.
                            <br/>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <b>Amount: </b>The amount of tokens the backup wallet can access. If you choose "infinite"
                            the
                            backup
                            will able to access all, or you can limit the amount.
                            <br/>
                            <b>Backup Wallet: </b>The wallet which you want to be able to access your tokens.
                            <br/>
                            <b>Access Time: </b>The time which needs to pass before the backup becomes accessible. For
                            example, choosing 1 year means, the backup wallet can transfer the specified tokens to
                            itself 365 days after your last interaction with the contract.
                            <br/>
                            <b>Automatic Transfer: </b>If this option is enabled the funds will automatically get
                            transferred to the backup wallet. Be extremely careful about enabling this option because
                            loss of access to the backup wallet when automatic transfer is enabled may cause loss of
                            funds.
                            <br/><br/>
                        </p>
                        <p className={styles.sectionDescription}>- After the access time has passed, the backup wallet
                            can
                            claim
                            those tokens from your wallet. You
                            can reset the access time by interacting with the contract.
                            <br/>
                            - You need to complete two transactions, one for token approval, and the other one for
                            creating
                            the backup.
                        </p>
                    </div>
                </div>
            </main>

            <p style={{fontSize: 12, color: 'gray', textAlign: 'center', padding: 32}}>EasyDCA is developed for <a
                href={"https://chainlinkspring2023.devpost.com/"} target={"_blank"} rel={'noreferrer'}>ChainLink
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Spring Hackathon</a> and hasn't been audited yet. Use with caution.</p>
        </div>
    )
}
