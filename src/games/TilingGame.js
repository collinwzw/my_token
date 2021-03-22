import React, { Component } from 'react'
import { Col, Row, Image, Container } from 'react-bootstrap'
import ReactCardFlip from 'react-card-flip'
const CARD_ARRAY = [
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
]
class Tile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFlipped: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault()
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }))
    }

    render() {
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped}>
                <Image
                    fluid
                    onClick={this.handleClick}
                    src="https://preview.free3d.com/img/2016/08/2269209242957251993/fq8qvhot-900.jpg"
                ></Image>
                <Image
                    fluid
                    onClick={this.handleClick}
                    src="https://cdnb.artstation.com/p/assets/images/images/017/867/783/large/hardil-patel-pokemon-ball-art-clay-render.jpg?1557659021"
                ></Image>
            </ReactCardFlip>
        )
    }
}
class TilingGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardArray: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
            cardsChosen: [],
            cardsChosenId: [],
            cardsWon: [],
        }
    }

    render_tiles() {
        let res = []
        let i = 0
        while (i < this.state.cardArray.length / 4) {
            res.push(
                <Row className="justify-content-sm-center m-2" noGutters>
                    <Col sm={{ span: 1 }} className="m-2">
                        <Tile number={this.state.cardArray[4 * i]} />
                    </Col>
                    <Col sm={{ span: 1 }} className="m-2">
                        <Tile number={this.state.cardArray[4 * i + 1]} />
                    </Col>
                    <Col sm={{ span: 1 }} className="m-2">
                        <Tile number={this.state.cardArray[4 * i + 2]} />
                    </Col>
                    <Col sm={{ span: 1 }} className="m-2">
                        <Tile number={this.state.cardArray[4 * i + 3]} />
                    </Col>
                </Row>
            )
            i += 1
        }
        return res
    }

    render() {
        return (
            <div className="h-100 d-flex justify-content-center  align-items-center">
                <Container
                    fluid
                    className="justify-content-center  align-items-center"
                >
                    {this.render_tiles()}
                </Container>
            </div>
        )
    }
}

export default TilingGame
