const CurrencyToken = artifacts.require('CurrencyToken')
const dGame = artifacts.require('dGame')
const NFToken = artifacts.require('NFToken')
const Tiling = artifacts.require('Tiling')
module.exports = async function (deployer) {
    //deploy Token
    await deployer.deploy(CurrencyToken)
    const currencyToken = await CurrencyToken.deployed()

    await deployer.deploy(NFToken)
    const nfToken = await NFToken.deployed()

    //deploy Token
    await deployer.deploy(dGame, currencyToken.address, nfToken.address)
    const dgame = await dGame.deployed()

    await deployer.deploy(Tiling, dgame.address)

    await currencyToken.passMinterRole(dgame.address)
    await nfToken.passMinterRole(dgame.address)
}
