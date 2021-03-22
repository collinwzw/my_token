const EVM_REVERT = 'VM Exception while processing transaction: revert'

const CToken = artifacts.require('./CurrencyToken')
const NFToken = artifacts.require('./NFToken')
const DecentralizedGame= artifacts.require('./dGame')

require('chai')
  .use(require('chai-as-promised'))
  .should()

//h0m3w0rk - check values from events.

contract('dGame', ([deployer, user]) => {
  let dgame, ctoken, nftoken

  beforeEach(async () => {
    ctoken = await CToken.new()
    nftoken = await NFToken.new()
    dgame = await DecentralizedGame.new(ctoken.address, nftoken.address)
    await ctoken.passMinterRole(dgame.address, {from: deployer})
    await nftoken.passMinterRole(dgame.address, {from: deployer})
  })

  describe('testing token contract...', () => {
    describe('success', () => {
      it('checking currency token name', async () => {
        expect(await ctoken.name()).to.be.eq('Currency Token')
      })
      it('checking NF token name', async () => {
        expect(await nftoken.name()).to.be.eq('NF Token')
      })


      it('checking currency token symbol', async () => {
        expect(await ctoken.symbol()).to.be.eq('CT')
      })
      it('checking NF token symbol', async () => {
        expect(await nftoken.symbol()).to.be.eq('NFT')
      })

      it('checking currency token initial total supply', async () => {
        expect(Number(await ctoken.totalSupply())).to.eq(0)
      })
      it('checking NF token initial total supply', async () => {
        expect(Number(await nftoken.totalSupply())).to.eq(0)
      })

      it('dGame should have currency Token minter role', async () => {
        expect(await ctoken.minter()).to.eq(dgame.address)
      })
      it('dGame should have NF Token minter role', async () => {
        expect(await nftoken.minter()).to.eq(dgame.address)
      })
    })

    describe('failure', () => {
      it(' currency token passing minter role should be rejected', async () => {
        await ctoken.passMinterRole(user, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
      })
      it('NF token passing minter role should be rejected', async () => {
        await nftoken.passMinterRole(user, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
      })

      it('currency token  minting should be rejected', async () => {
        await ctoken.mint(user, '1', {from: deployer}).should.be.rejectedWith(EVM_REVERT) //unauthorized minter
      })
      // it('NF tokens minting should be rejected', async () => {
      //   await nftoken.mint(user, 'test NFT token', {from: deployer}).should.be.rejectedWith(EVM_REVERT) //unauthorized minter
      // })
    })
  })

})
