import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
class FrontPageCarousel extends Component {
    render() {
        return (
            <Carousel className="d-block w-60 mt-2">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.vox-cdn.com/thumbor/e4KRzS--UsuixA2G8TOCwJ-O024=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/6839749/pokemon.0.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 className="glow">Play Games</h3>
                        <p className="glow">
                            You can play games to win your pokemon cards
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.wallpapersden.com/image/download/pokemon-pikachu-art_a25tbW6UmZqaraWkpJRmaWVlrWZlamU.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 className="glow">Trade cards</h3>
                        <p className="glow">
                            You can trade your valuable rare pokemon cards! Or
                            just collect the ones you like.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.zastavki.com/pictures/1400x1050/2019Cartoons_Yellow_pokemon_Pikachu_on_a_black_background_130791_22.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3 className="glow">
                            Click to Start Your Pokemon Card Collection
                        </h3>
                        <Button
                            variant="warning"
                            as={Link}
                            to="/games"
                            className="glow"
                            style={{ color: '#fff' }}
                        >
                            Start Now
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}

export default FrontPageCarousel
