import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Game from './pages/Games'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import Collections from './pages/Collections'
import TilingGame from './games/TilingGame'
import { Navbar, Nav } from 'react-bootstrap'
function App() {
    return (
        <Router>
            <div style={{ height: '100%' }}>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">
                        Pokemon Cards Collection
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/games">
                                Games
                            </Nav.Link>
                            <Nav.Link as={Link} to="/marketplace">
                                Marketplace
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/collections">
                                My Collections
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route path="/games/tiling">
                        <TilingGame />
                    </Route>
                    <Route path="/games">
                        <Game />
                    </Route>
                    <Route path="/marketplace">
                        <Marketplace />
                    </Route>
                    <Route path="/collections">
                        <Collections />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
