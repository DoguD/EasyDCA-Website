import Head from 'next/head'
import styles from '../styles/Home.module.css'
// Web3
import {ethers} from "ethers";

import React, {useEffect, useState} from "react";

import 'semantic-ui-css/semantic.min.css'

// Circular Progress Bar
import 'react-circular-progressbar/dist/styles.css';
import CreateBackupBox from "../components/CreateBackupBox";
import {USDC_ABI, USDC_ADDRESS, USDT_ADDRESS} from "../contracts/InProduction/USDC";
import MainSection from "../components/MainSection";
import {DCA_ABI, DCA_ADDRESS} from "../contracts/DCA";

// Web3 Global Vars
let provider;
let signer;

let usdcContract;
let usdcContractWithSigner;
let usdtContract;
let usdtContractWithSigner;

let dcaContract;
let dcaContractWithSigner;

export default function Home() {
    const [walletAddress, setWalletAddress] = useState("");
    const [purchases, setPurchases] = useState([]);
    // UI Controllers
    const [metamaskInstalled, setMetamaskInstalled] = useState(false);
    const [totalRefs, setTotalRefs] = useState(0);


    // Web3
    useEffect(() => {
        if (window.ethereum != null) {
            setMetamaskInstalled(true);
            console.log("Metamask installed.");
            window.ethereum.enable();
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");

            // CONTRACTS
            usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
            usdtContract = new ethers.Contract(USDT_ADDRESS, USDC_ABI, provider);
            dcaContract = new ethers.Contract(DCA_ADDRESS, DCA_ABI, provider);

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


                usdcContractWithSigner = usdcContract.connect(signer);
                usdtContractWithSigner = usdtContract.connect(signer);
                dcaContractWithSigner = dcaContract.connect(signer);

                getPastPurchases(userAddress);
            }
        } catch (e) {
            console.log(e);
        }
    };


    async function getPastPurchases(userAddress) {
        try {
            let events = await dcaContract.queryFilter("Purchase",
                63796388,
                63798368);
            let userEvents = [];
            for (let i = 0; i < events.length; i++) {
                let event = events[i];
                if (event.args[0] === userAddress) {
                    let currentPurchase = {};
                    currentPurchase.address = event.args[0];
                    currentPurchase.stableCoin = event.args[1];
                    currentPurchase.targetCoin = event.args[2];
                    currentPurchase.stableAmount = parseInt(event.args[3], 10);
                    currentPurchase.targetAmount = parseInt(event.args[4], 10);
                    currentPurchase.timestamp = parseInt(event.args[5], 10);
                    userEvents.push(currentPurchase);
                }
            }
            setPurchases(userEvents);
        } catch (e) {
            console.log("Past purchases error: ");
            console.log(e);
            await getPastPurchases(userAddress);
        }
    }

    async function getGeneralData() {
        try {
            console.log('hey')
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
                                 provider={provider}
                                 signer={signer}
                                 totalRefs={totalRefs}
                                 purchases={purchases}/>
            </main>

            <p style={{fontSize: 12, color: 'gray', textAlign: 'center', padding: 32}}>EasyDCA is developed for <a
                href={"https://chainlinkspring2023.devpost.com/"} target={"_blank"} rel={'noreferrer'}>ChainLink
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Spring Hackathon</a> and hasn't been audited yet. Use with caution.</p>
        </div>
    )
}
