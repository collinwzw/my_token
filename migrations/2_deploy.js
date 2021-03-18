const Token = artifacts.require("CurrencyToken");
const NFToken = artifacts.require("NFToken");
module.exports = async function(deployer) {
  //deploy Token
  deployer.deploy(Token)

  //deploy Token
  deployer.deploy(NFToken)

};