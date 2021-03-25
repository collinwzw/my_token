import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { Col, Row, Image, Container } from 'react-bootstrap'
import ReactCardFlip from 'react-card-flip'
import DGame from '../contracts/dGame.json'
import Tiling from '../contracts/Tiling.json'
import { Button } from 'react-bootstrap'
const CARD_IMG_ARRAY = [
    {
        name: 'munchlax',
        img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC4ytz1uSszg1FE7Evyw4aNtTJZcBMbQW3Og&usqp=CAU',
    },
    {
        name: 'pikachu',
        img:
            'https://i.pinimg.com/originals/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.png',
    },
    {
        name: 'eeve',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
    },
    {
        name: 'mew',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png',
    },
    {
        name: 'jigglypuff',
        img:
            'https://upload.wikimedia.org/wikipedia/en/2/22/Pok%C3%A9mon_Jigglypuff_art.png',
    },
    {
        name: 'snortex',
        img: 'https://images.gameinfo.io/pokemon/256/143-00.png',
    },
    {
        name: 'psyduck',
        img:
            'https://cdn.bulbagarden.net/upload/thumb/5/53/054Psyduck.png/1200px-054Psyduck.png',
    },

    {
        name: 'togepi',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/175.png',
    },
    {
        name: 'weezing',
        img: 'https://cdn.bulbagarden.net/upload/4/42/110Weezing.png',
    },
    {
        name: 'azumarill',
        img:
            'https://cdn.bulbagarden.net/upload/archive/a/a5/20150920171546%21184Azumarill.png',
    },
]

function Tile(props) {
    const [isFlipped, setIsFlipped] = useState(props.isFlipped)
    const [imgSrc, setImgSrc] = useState(props.imgSrc)
    useEffect(() => {
        setImgSrc(props.imgSrc)
        setIsFlipped(props.isFlipped)
    }, [props.isFlipped, props.imgSrc])

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <Image
                fluid
                src="https://preview.free3d.com/img/2016/08/2269209242957251993/fq8qvhot-900.jpg"
            ></Image>
            <Image fluid src={imgSrc}></Image>
        </ReactCardFlip>
    )
}

function TilingGame() {
    const [account, setAccount] = useState()
    const [loading, setLoading] = useState(true)
    const [dGame, setdGame] = useState()
    const [dGameAddress, setdGameAddress] = useState()
    const [CTbalance, setCTBalance] = useState(0)
    const [tiling, setTiling] = useState()
    const [flippedArr, setFlippedArr] = useState(new Array(20).fill(false))
    const [imgArr, setImgArr] = useState(new Array(20).fill(''))
    const [displayArr, setDisplayArr] = useState(new Array(20).fill(true))
    const [tilingAddress, setTilingAddress] = useState()

    useEffect(() => {
        async function waitForBlockchain() {
            await loadWeb3()
            await loadBlockchainData()
        }
        waitForBlockchain().then(async () => {
            let arr = new Array(20)
            for (let i = 0; i < 20; i++) {
                if (tiling != undefined) {
                    await tiling.methods
                        .getMatched(account, i)
                        .call()
                        .then((x) => {
                            // console.log(x + ' ' + i)
                            arr[i] = x == true ? false : true
                        })
                }
            }
            setDisplayArr(arr)
        })
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
        const dGameNetworkData = DGame.networks[networkId]
        if (dGameNetworkData) {
            const dGameNetworkAbi = DGame.abi
            const dGameAddress = dGameNetworkData.address
            setdGameAddress(dGameAddress)
            const dGame = new web3.eth.Contract(dGameNetworkAbi, dGameAddress)
            dGame.methods
                .showCurrencyTokenBalance(accounts[0])
                .call()
                .then((x) => {
                    setCTBalance(x)
                })
            setdGame(dGame)
        } else {
            alert('Smart contract not deployed to detected network.')
        }
        const tilingNetworkData = await Tiling.networks[networkId]
        if (tilingNetworkData) {
            async function func() {
                console.log('flipping')
                tiling.methods
                    .flippedOne(accounts[0])
                    .call()
                    .then((x) => {
                        if (x[0] != -1) {
                            flippedArr[x[0]] = true
                            imgArr[x[0]] = CARD_IMG_ARRAY[x[1]].img
                            setFlippedArr([...flippedArr])
                            setImgArr([...imgArr])
                        }
                    })
            }
            const tilingAbi = Tiling.abi
            const tilingAddress = tilingNetworkData.address
            setTilingAddress(tilingAddress)
            const tiling = new web3.eth.Contract(tilingAbi, tilingAddress)
            await tiling.methods
                .initializeIfNeeded(accounts[0])
                .send({ from: accounts[0] })
                .then(
                    async () =>
                        await func().then(() => {
                            setTiling(tiling)
                            setLoading(false)
                        })
                )
        } else {
            alert('Smart contract not deployed to detected network.')
        }
    }

    function handleClick(id) {
        tiling.methods
            .revealAtIndex(account, id)
            .send({ from: account })
            .then(async () => {
                return await tiling.methods.revealAtIndex(account, id).call()
            })
            .then(async (num) => {
                let arr = [...flippedArr]
                arr[id] = !flippedArr[id]
                let arr2 = [...imgArr]
                arr2[id] = CARD_IMG_ARRAY[num].img
                await Promise.resolve()
                    .then(() => {
                        setFlippedArr(arr)
                        setImgArr(arr2)
                    })
                    .then(async () => {
                        let indices = arr
                            .map((e, i) => (e === true ? i : ''))
                            .filter(String)
                        if (indices.length === 2) {
                            if (arr2[indices[0]] == arr2[indices[1]]) {
                                displayArr[indices[0]] = false
                                displayArr[indices[1]] = false
                                arr[indices[0]] = false
                                arr[indices[1]] = false
                                setCTBalance(parseInt(CTbalance) + 1)
                            } else {
                                arr[indices[0]] = false
                                arr[indices[1]] = false
                            }

                            arr2[indices[0]] = ''
                            arr2[indices[1]] = ''
                            await delay(1500)
                        }
                    })
                    .then(async () => {
                        setImgArr([...arr2])
                        setFlippedArr([...arr])
                        await delay(1500)
                        let arr3 = [...displayArr]
                        setDisplayArr(arr3)
                    })
            })
    }
    function delay(t, v) {
        return new Promise(function (resolve) {
            setTimeout(resolve.bind(null, v), t)
        })
    }

    function render_tiles() {
        let res = []
        let i = 0
        while (i < 20 / 5) {
            let arr = new Array(5).fill().map((x, ind) => 5 * i + ind)
            res.push(
                <Row className="justify-content-sm-center m-2" noGutters>
                    {arr.map((x) => {
                        return (
                            <Col
                                sm={{ span: 1 }}
                                className={'m-2'}
                                key={x}
                                onClick={
                                    displayArr[x]
                                        ? () => {
                                              handleClick(x)
                                          }
                                        : () => {}
                                }
                            >
                                {displayArr[x] && (
                                    <Tile
                                        key={x}
                                        isFlipped={flippedArr[x]}
                                        imgSrc={imgArr[x]}
                                    />
                                )}
                            </Col>
                        )
                    })}
                </Row>
            )
            i += 1
        }
        return res
    }

    return (
        <div className="h-80 d-flex flex-column justify-content-center  align-items-center">
            {!loading && (
                <div style={{ color: '#fff' }}>
                    Current Balance: {CTbalance}{' '}
                </div>
            )}
            <Container
                fluid
                className="justify-content-center align-items-center"
            >
                {!loading && render_tiles()}
            </Container>
            {!loading && (
                <Button
                    onClick={async () => {
                        tiling.methods
                            .reset()
                            .send({ from: account })
                            .then(() => {
                                let arr = new Array(20).fill(true)
                                setDisplayArr(arr)
                            })
                    }}
                >
                    Play Again
                </Button>
            )}
        </div>
    )
}

export default TilingGame
