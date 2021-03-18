const Token = artifacts.require("CurrencyToken");
const NFToken = artifacts.require("NFToken");
module.exports = async function(deployer) {
  //deploy Token
  await deployer.deploy(Token)
  //assign token into variable to get it's address
  const token = await Token.deployed()

  //deploy Token
  await deployer.deploy(NFToken)

  //assign token into variable to get it's address
  const nftoken = await NFToken.deployed()
};