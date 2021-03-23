import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import MarketplaceItem from '../components/MarketplaceItem'
import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
function Marketplace() {
    const [account, setAccount] = useState()
    const [loading, setLoading] = useState(true)
    const [dGame, setdGame] = useState()
    const [dGameAddress, setdGameAddress] = useState()
    const [CTbalance, setCTBalance] = useState(0)

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

    async function loadBlockchainData() {
        // const web3 = window.web3
        // const accounts = await web3.eth.getAccounts()
        // setAccount(accounts[0])
        // // Load smart contract
        // const networkId = await web3.eth.net.getId()
        // const dGameNetworkData = DGame.networks[networkId]
        // if (dGameNetworkData) {
        //     const dGameNetworkAbi = DGame.abi
        //     const dGameAddress = dGameNetworkData.address
        //     setdGameAddress(dGameAddress)
        //     const dGame = new web3.eth.Contract(dGameNetworkAbi, dGameAddress)
        //     dGame.methods
        //         .showCurrencyTokenBalance(accounts[0])
        //         .call()
        //         .then((x) => {
        //             setCTBalance(x)
        //         })
        //     setdGame(dGame)
        // } else {
        //     alert('Smart contract not deployed to detected network.')
        // }
        // const tilingNetworkData = await Tiling.networks[networkId]
        // if (tilingNetworkData) {
        //     const tilingAbi = Tiling.abi
        //     const tilingAddress = tilingNetworkData.address
        //     setTilingAddress(tilingAddress)
        //     const tiling = new web3.eth.Contract(tilingAbi, tilingAddress)
        //     async function func() {
        //         let arr = new Array(20)
        //         for (let i = 0; i < 20; i++) {
        //             arr[i] =
        //                 (await tiling.methods.matchedArr(i).call()) == true
        //                     ? false
        //                     : true
        //         }
        //         setDisplayArr(arr)
        //         tiling.methods
        //             .flippedOne()
        //             .call()
        //             .then((x) => {
        //                 if (x[0] != -1) {
        //                     flippedArr[x[0]] = true
        //                     imgArr[x[0]] = CARD_IMG_ARRAY[x[1]].img
        //                     setFlippedArr([...flippedArr])
        //                     setImgArr([...imgArr])
        //                 }
        //             })
        //     }
        //     func().then(() => {
        //         setTiling(tiling)
        //         setLoading(false)
        //     })
        // } else {
        //     alert('Smart contract not deployed to detected network.')
        // }
    }

    return (
        <>
            <Jumbotron
                id="forgeJumbotron"
                className="w-80 d-flex justify-content-center align-items-center flex-column"
            >
                <h1>Forge your Pokemon Card</h1>
                <p>
                    Forge your Pokemon Card with the tokens you won. Win common,
                    rare and legnedary cards!
                </p>
                <button id="forgeButton">Forge Now</button>
            </Jumbotron>
            <Container fluid className="m-3">
                <Row className="equal">
                    <Col md={{ span: 3 }}>
                        <MarketplaceItem img_src="https://pokemonarchive.files.wordpress.com/2011/06/scan0008.png" />
                    </Col>
                    <Col md={{ span: 3 }}>
                        <MarketplaceItem img_src="https://pokemonarchive.files.wordpress.com/2011/06/scan0007lowres.png" />
                    </Col>
                    <Col md={{ span: 3 }}>
                        <MarketplaceItem img_src="https://pokemonarchive.files.wordpress.com/2011/06/scan0006lowres.png" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Marketplace
