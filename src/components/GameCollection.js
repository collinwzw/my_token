import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
class GameCollection extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={{ span: 3 }}>
                        <GameItemtCard
                            img_src="https://cdn.thingiverse.com/assets/66/33/72/e5/71/featured_preview_pika2.jpg"
                            game_title="A Tiling Game"
                            game_description="Find all matching pairs and win a Pokemon card"
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

class GameItemtCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { entered: false }
        this.enter = this.enter.bind(this)
    }

    enter = () => {
        this.setState({ entered: !this.state.entered })
    }
    render() {
        return (
            <Card
                style={{ width: '18rem' }}
                onMouseEnter={this.enter}
                onMouseLeave={this.enter}
                className={this.state.entered ? ' entered' : ''}
            >
                <img
                    src={this.props.img_src}
                    alt=""
                    className="image"
                    style={{ width: '100%' }}
                ></img>
                <div class="middle">
                    <Button as={Link} to="/games/tiling">
                        Play Now
                    </Button>
                </div>
                <Card.Body>
                    <Card.Title>{this.props.game_title}</Card.Title>
                    <Card.Text>{this.props.game_description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default GameCollection
