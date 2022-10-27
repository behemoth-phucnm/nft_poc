const fs = require('fs')
// eslint-disable-next-line no-unused-vars
const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  // eslint-disable-next-line no-unused-vars
  const balance = await deployer.getBalance()
  const Marketplace = await hre.ethers.getContractFactory('BehemothNFT')
  const marketplace = await Marketplace.deploy()

  await marketplace.deployed()

  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json')),
  }

  // This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./abi/BehemothNFT.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  })
