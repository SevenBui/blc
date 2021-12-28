
const apploClient = require("../lib/graphSQL/wsGraphSQL")

const configEnv = [
    {

        proxy: process.env.CONTRACT_PROXY_TESTNET_ETH,
        infuraKey: process.env.INFURA_KEY,
        networkName: process.env.NAME_NETWORK_TESTNET_ETH,
        networkNameDeploy: 'rinkeby',
        chainId: process.env.CHAIN_ID_TESTNET_ETH,
        networkSymbol: process.env.SYMBOL_NETWORK_ETH,
        standard: 'ERC',
        wss: process.env.WSS_TESTNET_ETH,
        subscriptionEventClient: apploClient.subscriptionClientETHTestnet
    },
    // {

    //     proxy: process.env.CONTRACT_PROXY_MAINET_ETH,
    //     infuraKey: process.env.INFURA_KEY,
    //     networkName: process.env.NAME_NETWORK_MAINET_ETH,
    //     chainId: process.env.CHAIN_ID_MAINNET_ETH,
    //     networkSymbol: process.env.SYMBOL_NETWORK_ETH,
    //     standard: 'ERC',
    //     wss: process.env.WSS_MAINNET_ETH,
    //     subscriptionEventClient: apploClient.subscriptionClientETHMainet
    // },
    {

        proxy: process.env.CONTRACT_PROXY_TESTNET_BSC,
        networkName: process.env.NAME_NETWORK_TESTNET_BSC,
        networkNameDeploy: 'bsc_testnet',
        chainId: process.env.CHAIN_ID_TESTNET_BSC,
        networkSymbol: process.env.SYMBOL_NETWORK_BSC,
        standard: 'BEP',
        wss: process.env.WSS_TESTNET_BSC,
        subscriptionEventClient: apploClient.subscriptionClientBSCTestnet

    },
    {

        proxy: process.env.CONTRACT_PROXY_MAINET_BSC,
        networkName: process.env.NAME_NETWORK_MAINET_BSC,
        networkNameDeploy: 'binance',
        chainId: process.env.CHAIN_ID_MAINET_BSC,
        networkSymbol: process.env.SYMBOL_NETWORK_BSC,
        standard: 'BEP',
        wss: process.env.WSS_MAINET_BSC,
        subscriptionEventClient: apploClient.subscriptionClientBSCMainet
    }
]

module.exports = {
    configEnv
}
