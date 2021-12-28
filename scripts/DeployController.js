var mapArrD = require('../arguments/deploy')
var mapArrV = require('../arguments/verify')
let _type = process.env.TYPE || '';

async function verifyContract() {

    let events = process.env.DATA || JSON.stringify({ key: '' });
    let data = JSON.parse(events);
    const check = data.key.toString();
    const checkNew = check.replace(/,/g, "_").replace(/20/g, "").replace(/777/g, "").replace(/721/g, "").replace(/1155/g, "");

    let standType;
    if (check.match("20")) {
        standType = "erc20";
    }
    if (check.match("777")) {
        standType = "erc777";
    }
    if (check.match("721")) {
        standType = "erc721";
    }
    if (check.match("1155")) {
        standType = "erc1155";
    }
    if (check.match("staking") || check.match("farming")) {
        standType = "pool";
    }

    await mapArrV.mapVerify[standType][checkNew](data).then((result) => {
        console.log("verify_sucesss", result)
    }).catch((err) => {
        console.log("verify_error", err)
    });

}

async function deployContract() {
    let events = process.env.DATA || JSON.stringify({ key: '' });
    let data = JSON.parse(events);
    const check = data.tokenType.toString();
    const checkNew = check.replace(/,/g, "_").replace(/20/g, "").replace(/777/g, "").replace(/721/g, "").replace(/1155/g, "");

    let standType;
    if (check.match("20")) {
        standType = "erc20";
    }
    if (check.match("777")) {
        standType = "erc777";
    }
    if (check.match("721")) {
        standType = "erc721";
    }
    if (check.match("1155")) {
        standType = "erc1155";
    }
    if (check.match("staking") || check.match("farming")) {
        standType = "pool";
    }

    await mapArrD.mapDeploy[standType][checkNew](data).then(async (result) => {

        let resultDeploy = {
            address: result.address,
            transactionHash: result.deployTransaction.hash
        }

        console.log("deploy_success", resultDeploy)
    }).catch((err) => {
        console.log("deploy_error", err)
    })
}

if (_type == 'verify') {
    verifyContract();
} else {
    deployContract();
}


module.exports = {
    deployContract,
    verifyContract
}