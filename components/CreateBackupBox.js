import styles from "../styles/Home.module.css";
import React, {useEffect, useState} from 'react'
import {Button, Dropdown} from 'semantic-ui-react';
import {ethers} from "ethers";
import {ERC20_ABI} from "../contracts/InProduction/ERC20";
import {TOKEN_MAP} from "./subComponents/Constants";
import PastPurchases from "./subComponents/PastPurchases";
import CreateDCA from "./subComponents/CreateDCA";

let tokenContract;
let tokenContractWithSigner;

let discountedUserOracle;

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function BackupRow(props) {
    let remainingDays;
    let canBeClaimed = false;
    if (((parseInt(props.backup.expiry) - (Math.floor(Date.now() / 1000) - parseInt(props.backup.lastInteraction)))) < 0) {
        canBeClaimed = true;
        remainingDays = 0;
    } else {
        remainingDays = ((parseInt(props.backup.expiry) - (Math.floor(Date.now() / 1000) - parseInt(props.backup.lastInteraction))) / 60 / 60 / 24).toFixed(0)
    }
    return (
        <div className={styles.claimableBackupsRow}>
            <p className={styles.claimableBackupText}><b>To: </b></p>
            <p className={styles.toAddress}>{props.backup.to}</p>

            <div style={{width: 16}}/>
            <p className={styles.claimableBackupText}><b>Token: </b></p>
            <p className={styles.claimableBackupText}>{typeof TOKEN_MAP[props.backup.token] !== "undefined" ? "$" + TOKEN_MAP[props.backup.token] : props.backup.token.slice(0, 4) + "..." + props.backup.token.slice(39, 42)}</p>

            <div style={{width: 16}}/>
            <p className={styles.claimableBackupText}><b>Amount: </b></p>
            <p className={styles.claimableBackupText}>{BigInt(props.backup.amount) > BigInt(2 ** 250)
                ? "∞"
                : parseFloat(props.backup.amount / (10 ** props.backup.decimals)).toString()}</p>

            <div style={{width: 16}}/>
            <p className={styles.claimableBackupText}><b>Can Be Claimed In: </b></p>
            <p className={styles.claimableBackupText}>{canBeClaimed ? "Now" : remainingDays + " days"}</p>

            <p className={styles.claimableBackupText}><b>Automatic: </b></p>
            <p className={styles.claimableBackupText}>{props.backup.automatic ? "Yes" : "No"}</p>

            <div style={{width: 32}}/>
            {props.backup.isActive ?
                <Button basic color={'red'} onClick={() => props.deleteBackup(props.backup.backupId)}>Delete</Button>
                : <p style={{color: 'red', marginRight: 16, fontWeight: 'bold'}}>Deleted</p>}
        </div>
    )
}

export default function CreateBackupBox(props) {

    async function getBackupData() {
        if (typeof props.backupContract !== "undefined") {
            setFee(parseInt(await props.backupContract.getInitFee(), 10));
        }
    }

    async function getCreatedBackups() {
        if (props.walletAddress !== "") {
            let createdBackupCount = parseInt(await props.backupContract.createdBackupsCount(props.walletAddress), 10);
            setTotalCreatedBackups(createdBackupCount);
            let parsedBackups = [];
            for (let i = 0; i < createdBackupCount; i++) {
                let backupId = parseInt(await props.backupContract.createdBackups(props.walletAddress, i), 10);
                let backup = await props.backupContract.backups(backupId);
                if (backup[5]) {
                    let parsedBackup = {
                        amount: backup[3],
                        expiry: backup[4],
                        from: backup[0],
                        isActive: backup[5],
                        to: backup[1],
                        token: backup[2],
                        lastInteraction: parseInt(await props.backupContract.lastInteraction(backup[0]), 10),
                        backupId: backupId,
                        automatic: backup[6],
                        decimals: parseInt(await new ethers.Contract(backup[2], ERC20_ABI, props.provider).decimals(), 10),
                    }
                    parsedBackups.push(parsedBackup);
                }
            }
            setCreatedBackups(parsedBackups);
            setUserRefs(parseInt(await props.backupContract.referralCount(props.walletAddress), 10));
        }
    }

    async function deleteBackup(id) {
        await props.backupContractWithSigner.deletBackup(id);
    }

    async function getBalance(decimal) {
        try {
            setBalance(parseInt(await tokenContract.balanceOf(props.walletAddress), 10) / 10 ** decimal);
        } catch (e) {
            console.log("Backup Box, get allowance error:");
            console.log(e);
        }
    }

    async function heartbeat() {
        setIsLoading(true);
        try {
            let transaction = await props.backupContractWithSigner.heartBeat();
            setListener(transaction.hash);
        } catch (e) {
            setIsLoading(false);
            console.log("Heartbeat error: ");
            console.log(e);
        }
    }

    return (
        <div className={styles.createBackupContainer}>
            <CreateDCA provider={props.provider} walletAddress={props.walletAddress}
                       connectWalletHandler={() => props.connectWalletHandler()}/>
            <p className={styles.dcaTitle}>Your Active DCA Strategies</p>
            <p className={styles.dcaTitle}>Disabled DCA Strategies</p>
            <PastPurchases purchases={props.purchases}/>
        </div>
    );
}
