const CurrencyToken = artifacts.require('CurrencyToken')
const dGame = artifacts.require('dGame')
const NFToken = artifacts.require('NFToken')
const Tiling = artifacts.require('Tiling')
const BatchRequest = artifacts.require('BatchRequest')
module.exports = async function (deployer) {
    //deploy Token
    await deployer.deploy(CurrencyToken)
    const currencyToken = await CurrencyToken.deployed()

    await deployer.deploy(NFToken)
    const nfToken = await NFToken.deployed()

    //deploy Token
    await deployer.deploy(dGame, currencyToken.address, nfToken.address)
    const dgame = await dGame.deployed()
    console.error(dgame.address)

    await deployer.deploy(Tiling, dgame.address)
    const tiling = await dGame.deployed()
    console.error(tiling.address)

    await currencyToken.passMinterRole(dgame.address)
    await nfToken.passMinterRole(dgame.address)
}
