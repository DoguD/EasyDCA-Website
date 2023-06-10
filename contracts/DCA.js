// export const DCA_ADDRESS = "0xb1dD5c9f86093c99E1D14b81723B8Ff37044f706";
export const DCA_ADDRESS= "0xabb6b23d8C19beCd9BdaeD1cD75682c3aD9d836C"; // test
export const DCA_ABI = [{"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "account", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "stableCoin",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "targetCoin", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "stableAmount",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "targetAmount", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "purchaseTimeStamp",
        "type": "uint256"
    }],
    "name": "Purchase",
    "type": "event"
}, {
    "inputs": [{"internalType": "address", "name": "_stable", "type": "address"}, {
        "internalType": "address",
        "name": "_target",
        "type": "address"
    }, {"internalType": "uint256", "name": "_amount", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_frequency",
        "type": "uint256"
    }], "name": "addDCA", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_newCoin", "type": "address"}],
    "name": "addToStableCoinsList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_newCoin", "type": "address"}],
    "name": "addToTargetCoinsList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "allowedStableCoins",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "allowedTargetCoins",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes", "name": "", "type": "bytes"}],
    "name": "checkUpkeep",
    "outputs": [{"internalType": "bool", "name": "upkeepNeeded", "type": "bool"}, {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "dcaHeap",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "dcaList",
    "outputs": [{"internalType": "address", "name": "account", "type": "address"}, {
        "internalType": "address",
        "name": "stableCoin",
        "type": "address"
    }, {"internalType": "address", "name": "targetCoin", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "frequency", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "lastPurchase",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "treshold", "type": "uint256"}, {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_dcaIndex", "type": "uint256"}],
    "name": "deleteDCA",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "dex",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "fee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes", "name": "", "type": "bytes"}],
    "name": "performUpkeep",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_coin", "type": "address"}],
    "name": "removeFromStableCoinsList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_coin", "type": "address"}],
    "name": "removeFromTargetCoinsList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_newFee", "type": "uint256"}],
    "name": "setFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_newCollector", "type": "address"}],
    "name": "setFeeCollector",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_newDex", "type": "address"}],
    "name": "updateDex",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "userDCACount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "userDCAs",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}]
