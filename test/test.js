const EVM_REVERT = 'VM Exception while processing transaction: revert'

const CToken = artifacts.require('./CurrencyToken')
const NFToken = artifacts.require('./NFToken')
const DecentralizedGame= artifacts.require('./dGame')

require('chai')
  .use(require('chai-as-promised'))
  .should()

//h0m3w0rk - check values from events.

contract('dBank', ([deployer, user]) => {
  let dgame, ctoken, nftoken

  beforeEach(async () => {
    ctoken = await CToken.new()
    nftoken = await NFToken.new()
    dgame = await DecentralizedGame.new(ctoken.address, nftoken.address)
    await ctoken.passMinterRole(dbank.address, {from: deployer})
    await nftoken.passMinterRole(dbank.address, {from: deployer})
  })

  describe('testing token contract...', () => {
    describe('success', () => {
      it('checking token name', async () => {
        expect(await ctoken.name()).to.be.eq('Currency Token')
      })
      it('checking token name', async () => {
        expect(await nftoken.name()).to.be.eq('NF Token')
      })


      it('checking token symbol', async () => {
        expect(await ctoken.symbol()).to.be.eq('CT')
      })
      it('checking token symbol', async () => {
        expect(await nftoken.symbol()).to.be.eq('NFT')
      })

      it('checking token initial total supply', async () => {
        expect(Number(await ctoken.totalSupply())).to.eq(0)
      })
      it('checking token initial total supply', async () => {
        expect(Number(await nftoken.totalSupply())).to.eq(0)
      })

      it('dGame should have Token minter role', async () => {
        expect(await ctoken.minter()).to.eq(dgame.address)
      })
      it('dGame should have Token minter role', async () => {
        expect(await nftoken.minter()).to.eq(dgame.address)
      })
    })

    describe('failure', () => {
      it('passing minter role should be rejected', async () => {
        await ctoken.passMinterRole(user, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
      })
      it('passing minter role should be rejected', async () => {
        await nftoken.passMinterRole(user, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
      })

      it('tokens minting should be rejected', async () => {
        await ctoken.mint(user, '1', {from: deployer}).should.be.rejectedWith(EVM_REVERT) //unauthorized minter
      })
      it('tokens minting should be rejected', async () => {
        await nftoken.mint(user, '1', {from: deployer}).should.be.rejectedWith(EVM_REVERT) //unauthorized minter
      })
    })
  })

})
