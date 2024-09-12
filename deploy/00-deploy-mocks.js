const { ethers } = require("hardhat")
// const { developmentChains } = require("../helper-hardhat-config.js")

const BASE_FEE = ethers.utils.parseEther("0.25") //This is the premium.It costs 0.25Link per request
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        console.log("Local network detected! Deploying Mocks......")
        //deploy mock vrfCoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        })
        console.log("Mocks Deployed")
        console.log("----------------------------------------------------------")
        console.log(
            "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
        )
        console.log("----------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
