import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import NFToken from '../contracts/NFToken.json'
import { Container, Row, Col } from 'react-bootstrap'

/*TODO Consider writing a collection item component??*/
function Collections() {
    const [account, setAccount] = useState()
    const [loading, setLoading] = useState(true)
    const [nfToken, setNFToken] = useState()
    const [nfTokenAddress, setNFTokenAddress] = useState()
    const [cards, setCards] = useState([])
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
    async function loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        // Load smart contract
        const networkId = await web3.eth.net.getId()
        const nfTokenNetworkData = NFToken.networks[networkId]
        if (nfTokenNetworkData) {
            const NFTokenNetworkAbi = NFToken.abi
            const NFTokenAddress = nfTokenNetworkData.address
            setNFTokenAddress(NFTokenAddress)
            const nfToken = new web3.eth.Contract(
                NFTokenNetworkAbi,
                NFTokenAddress
            )
            setNFTokenAddress(nfToken)
            await nfToken.methods
                .balanceOf(accounts[0])
                .call()
                .then(async (x) => {
                    for (let i = 0; i < x; ++i) {
                        await nfToken.methods
                            .tokenOfOwnerByIndex(accounts[0], i)
                            .call()
                            .then((id) => {
                                nfToken.methods
                                    .tokenURI(id)
                                    .call()
                                    .then((x) => {
                                        cards.push(x)
                                    })
                            })
                        setCards([...cards])
                    }
                })
        } else {
            alert('Smart contract not deployed to detected network.')
        }
    }
    return (
        <Container>
            <Row className="equal">
                {cards.map((x) => {
                    return (
                        <Col md={{ span: 3 }}>
                            <img
                                src={x}
                                style={{ width: '100%', height: '100%' }}
                            ></img>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
export default Collections
