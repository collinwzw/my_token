import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import MarketplaceItem from '../components/MarketplaceItem'
import DGame from '../contracts/dGame.json'
import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

/*should store possible cards in back end otherwise users can just use js to get watever card they want */
const CARD_ARRAY = [
    {
        img: 'https://pokemonarchive.files.wordpress.com/2011/06/scan0008.png',
        title: 'piplup',
        price: 5,
    },
    {
        img:
            'https://pokemonarchive.files.wordpress.com/2011/06/scan0009.png?w=1190',
        title: 'mudkip',
        price: 3,
    },
    {
        img:
            'https://pokemonarchive.files.wordpress.com/2011/06/scan0002lowres.png?w=1190',
        title: 'reshiram',
        price: 10,
    },
]
function Marketplace() {
    const [account, setAccount] = useState()
    const [loading, setLoading] = useState(true)
    const [dGame, setdGame] = useState()
    const [dGameAddress, setdGameAddress] = useState()
    useEffect(() => {
        async function waitForBlockchain() {
            await loadWeb3()
            await loadBlockchainData()
        }
        waitForBlockchain()
    }, [loading])
    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert(
                'Non-Ethereum browser detected. You should consider trying MetaMask!'
            )
        }
    }
    async function handleClick(img_src, price, title) {
        await dGame.methods
            .buyNFToken(account, img_src, price)
            .send({ from: account })
            .then()
        {
            alert('Congrats, you got a ' + title + ' card!')
        }
    }
    async function loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        // Load smart contract
        const networkId = await web3.eth.net.getId()
        const dGameNetworkData = DGame.networks[networkId]
        if (dGameNetworkData) {
            const dGameNetworkAbi = DGame.abi
            const dGameAddress = dGameNetworkData.address
            setdGameAddress(dGameAddress)
            const dGame = new web3.eth.Contract(dGameNetworkAbi, dGameAddress)
            console.log(dGame)
            setdGame(dGame)
        } else {
            alert('Smart contract not deployed to detected network.')
        }
    }

    return (
        <>
            <Jumbotron
                id="forgeJumbotron"
                className="w-80 d-flex justify-content-center align-items-center flex-column"
            >
                <h1>Start your Pokemon Card Collection</h1>
                <p>Make use of the tokens you win!</p>
                {/* <button id="forgeButton">Forge Now</button> */}
            </Jumbotron>
            <Container fluid className="m-3">
                <Row className="equal">
                    {CARD_ARRAY.map((item) => (
                        <Col md={{ span: 3 }}>
                            <MarketplaceItem
                                img_src={item.img}
                                price={item.price}
                                title={item.title}
                                clickFunc={async () => {
                                    await handleClick(
                                        item.img,
                                        item.price,
                                        item.title
                                    )
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Marketplace
