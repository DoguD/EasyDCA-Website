import Head from 'next/head'
import styles from '../styles/Home.module.css'
// Web3
import {ethers} from "ethers";

import React, {useEffect, useState} from "react";

import 'semantic-ui-css/semantic.min.css'

// Circular Progress Bar
import 'react-circular-progressbar/dist/styles.css';
import CreateDCABox from "../components/CreateDCABox";
import {USDC_ABI, USDC_ADDRESS, USDT_ADDRESS} from "../contracts/InProduction/USDC";
import MainSection from "../components/MainSection";
import {DCA_ABI, DCA_ADDRESS} from "../contracts/DCA";
import {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";

// Web3 Global Vars
let provider;
let signer;

let dcaContract;
let dcaContractWithSigner;

export default function Home() {
    // Cookie
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [walletAddress, setWalletAddress] = useState("");
    // UI Controllers
    const [metamaskInstalled, setMetamaskInstalled] = useState(false);


    // Web3
    useEffect(() => {
        if (window.ethereum != null) {
            setMetamaskInstalled(true);
            console.log("Metamask installed.");
            window.ethereum.enable();
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");

            // Got connected wallet if any
            console.log("Cookies: ", cookies)
            if (metamaskInstalled && typeof cookies['walletAddress'] !== "undefined") {
                connectWalletHandler();
            }

            // CONTRACTS
            dcaContract = new ethers.Contract(DCA_ADDRESS, DCA_ABI, provider);
        } else {
            console.log("Metamask not installed.");
            provider = new ethers.providers.getDefaultProvider("https://rpc.ftm.tools");
        }
    }, [signer, metamaskInstalled])

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
            alert("Please install Metamask to use EasyDCA.");
            return;
        }
        try {
            await window.ethereum.enable();
            let chainId = await provider.getNetwork();
            chainId = chainId['chainId'];

            if (chainId !== 250) {
                if (window.confirm("Please switch to Fantom Network to use EasyDCA.")) {
                    await changeNetworkToFTM();
                }
            } else {
                signer = provider.getSigner();
                let userAddress = await signer.getAddress();
                setCookie("walletAddress", userAddress);
                console.log('Set Cookies', cookies);
                setWalletAddress(userAddress);
                dcaContractWithSigner = dcaContract.connect(signer);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={styles.container}>
            <Toaster/>
            <Head>
                <title>EasyDCA - Never lose your crypto</title>
                <meta name="description" content="DCA Into Crypto Easily"/>
            </Head>
            <main className={styles.main}>
                <MainSection/>
                <CreateDCABox walletAddress={walletAddress}
                              connectWalletHandler={() => connectWalletHandler()}
                              provider={provider}
                              signer={signer}

                              dcaContract={dcaContract}
                              dcaContractWithSigner={dcaContractWithSigner}/>
            </main>

            <div className={styles.rowNoMarginNoPadding} style={{marginTop: 32}}>
                <p className={styles.dcaCreationText} style={{marginRight: 16}}>Powered by</p>
                <img src={'/chainlinkAutomation.svg'} style={{width: 300}}/>
            </div>

            <p style={{fontSize: 12, color: 'gray', textAlign: 'center', padding: 32}}>EasyDCA is developed for <a
                href={"https://chainlinkspring2023.devpost.com/"} target={"_blank"} rel={'noreferrer'}>ChainLink
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Spring Hackathon</a> and hasn't been audited yet. Use with caution.</p>
        </div>
    )
}
