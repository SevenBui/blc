var configDeploy = {};

configDeploy.dic = {
    bnb: "0x92471dDf70d694f7A5390E4D0F65a235a11a86E2",
    eth: "0x7B059f4EcC0a79b0aCfA650CE94b599B1930774a"
}

configDeploy.erc20 = {
    address: "0x08f48161FE7b6C8eC3559f1928F381Ae88ad1522",
    name: "MintableBurnable",
    symbol: "LL",
    decimal: 18,
    totalSupply: '1000',
    cap: '1000000'
};
configDeploy.erc777 = {
    address: "0x08f48161FE7b6C8eC3559f1928F381Ae88ad1522",
    name: "AHHAHAHAA",
    symbol: "LL",
    decimal: 3,
    totalSupply: 1000000,
    cap: 10000000
};
configDeploy.erc721 = {
    name: "MintableBurnable",
    symbol: "LL",
    address: "0x08f48161FE7b6C8eC3559f1928F381Ae88ad1522",
    metadata: "1"
};
configDeploy.erc1155 = {
    address: "0x08f48161FE7b6C8eC3559f1928F381Ae88ad1522",
    name: "tetstLA",
    symbol: "LA",
    metadata: "https://toigingiuvedep.vn/wp-content/uploads/2021/01/anh-cute-anime-meo.jpg",
    amount: 1000
};

module.exports = configDeploy;
