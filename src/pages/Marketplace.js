import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MarketplaceItem from '../components/MarketplaceItem'
class Marketplace extends Component {
    render() {
        return (
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
        )
    }
}

export default Marketplace
