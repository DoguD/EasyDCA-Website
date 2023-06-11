export const DEPLOY_BLOCK =
    63819642;
export const MAX_BIG_INT = BigInt(115792089237316195423570985008687907853269984665640564039457584007913129639935);

export const FREQUENCY_OPTIONS = [
    {
        key: 'seconds',
        text: "seconds",
        value: 1
    },
    {
        key: 'days',
        text: "days",
        value: 24 * 60 * 60
    },
    {
        key: 'weeks',
        text: "weeks",
        value: 7 * 24 * 60 * 60
    },
    {
        key: 'months',
        text: "months",
        value: 30 * 24 * 60 * 60
    },
]

export const TARGET_TOKENS = [
    {
        key: 'wETH',
        text: 'wETH',
        value: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
        image: {avatar: true, src: '/weth.webp'},
    },
    {
        key: 'wFTM',
        text: 'wFTM',
        value: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
        image: {avatar: true, src: '/wftm.webp'},
    },
    {
        key: 'BOO',
        text: 'BOO',
        value: '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE',
        image: {avatar: true, src: '/boo.png'},
    },
    {
        key: 'BNB',
        text: 'BNB',
        value: '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454',
        image: {avatar: true, src: '/bnb.png'},
    },
    /*
    {
        key: 'AVAX',
        text: 'AVAX',
        value: '0x511D35c52a3C244E7b8bd92c0C297755FbD89212',
        image: {avatar: true, src: '/AVAX.png'},
    },
     */
    {
        key: 'BRUSH',
        text: 'BRUSH',
        value: '0x85dec8c4B2680793661bCA91a8F129607571863d',
        image: {avatar: true, src: '/brush.webp'},
    },
]

export const STABLE_TOKENS = [
    {
        key: 'USDC',
        text: 'USDC',
        value: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        image: {avatar: true, src: '/usdc.png'},
    },
    {
        key: 'DAI',
        text: 'DAI',
        value: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
        image: {avatar: true, src: '/dai.png'},
    },
    {
        key: 'fUSDT',
        text: 'fUSDT',
        value: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
        image: {avatar: true, src: '/fUSDT.png'},
    },
]

export const TOKENS = [
    {
        key: 'wETH',
        text: 'wETH',
        value: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
        image: {avatar: true, src: '/weth.webp'},
    },
    {
        key: 'wFTM',
        text: 'wFTM',
        value: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
        image: {avatar: true, src: '/wftm.webp'},
    },
    {
        key: 'BOO',
        text: 'BOO',
        value: '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE',
        image: {avatar: true, src: '/boo.png'},
    },
    {
        key: 'BNB',
        text: 'BNB',
        value: '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454',
        image: {avatar: true, src: '/bnb.png'},
    },
    {
        key: 'AVAX',
        text: 'AVAX',
        value: '0x511D35c52a3C244E7b8bd92c0C297755FbD89212',
        image: {avatar: true, src: '/AVAX.png'},
    },
    {
        key: 'BRUSH',
        text: 'BRUSH',
        value: '0x85dec8c4B2680793661bCA91a8F129607571863d',
        image: {avatar: true, src: '/brush.webp'},
    },
]

export const TOKEN_MAP = {
    '0x74b23882a30290451A17c44f4F05243b6b58C76d': 'wETH',
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83': 'wFTM',
    '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75': 'USDC',
    '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E': 'DAI',
    '0x049d68029688eAbF473097a2fC38ef61633A3C7A': 'fUSDT',
    '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE': 'BOO',
    '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454': 'BNB',
    '0x511D35c52a3C244E7b8bd92c0C297755FbD89212': 'AVAX',
    '0x85dec8c4B2680793661bCA91a8F129607571863d': 'BRUSH',
}

export const TOKEN_DECIMALS = {
    '0x74b23882a30290451A17c44f4F05243b6b58C76d': 18,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83': 18,
    '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75': 6,
    '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E': 18,
    '0x049d68029688eAbF473097a2fC38ef61633A3C7A': 18,
    '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE': 18,
    '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454': 18,
    '0x511D35c52a3C244E7b8bd92c0C297755FbD89212': 18,
    '0x85dec8c4B2680793661bCA91a8F129607571863d': 18,
}

export const TOKEN_LOGOS = {
    '0x74b23882a30290451A17c44f4F05243b6b58C76d': '/weth.webp',
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83': '/wftm.webp',
    '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75': '/usdc.png',
    '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E': '/dai.png',
    '0x049d68029688eAbF473097a2fC38ef61633A3C7A': '/fUSDT.png',
    '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE': '/boo.png',
    '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454': '/bnb.png',
    '0x511D35c52a3C244E7b8bd92c0C297755FbD89212': '/AVAX.png',
    '0x85dec8c4B2680793661bCA91a8F129607571863d': '/brush.webp',
}

export const TOKEN_LOGOS_FROM_NAME = {
    'wETH': '/weth.webp',
    'wFTM': '/wftm.webp',
    'USDC': '/usdc.png',
    'DAI': '/dai.png',
    'fUSDT': '/fUSDT.png',
    'BOO': '/boo.png',
    'BNB': '/bnb.png',
    'AVAX': '/AVAX.png',
    'BRUSH': '/brush.webp',
}

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
