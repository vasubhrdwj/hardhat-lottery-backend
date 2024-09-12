const { ethers, network } = require("hardhat")
const fs = require("fs")
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers")

const FRONT_END_ADDRESSES_FILE = "../nextjs-smartcontract-raffle/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../nextjs-smartcontract-raffle/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating Front end...")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (network.config.chainId.toString() in currentAddresses) {
        if (!currentAddresses[network.config.chainId.toString()].includes(raffle.address)) {
            currentAddresses[network.config.chainId.toString()].push(raffle.address)
        }
    }
    {
        currentAddresses[network.config.chainId.toString()] = [raffle.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

module.exports.tags = ["all", "frontend"]
