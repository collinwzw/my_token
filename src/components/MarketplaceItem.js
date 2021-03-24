import React, { Component } from 'react'

class MarketplaceItem extends React.Component {
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
            <div
                onMouseEnter={this.enter}
                onMouseLeave={this.enter}
                className={this.state.entered ? ' entered h-100' : 'h-100'}
            >
                <img
                    src={this.props.img_src}
                    alt=""
                    className="image"
                    style={{ width: '100%', height: '100%' }}
                ></img>
                <ul className="bottom">
                    <li>
                        <a href="#" onClick={this.props.clickFunc}>
                            <img
                                className="icon w-100 h-100 p-1"
                                style={{ objectFit: 'cover' }}
                                src="https://www.freeiconspng.com/uploads/black-shopping-cart-icon-22.png"
                            ></img>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img
                                src="https://img.icons8.com/plasticine/100/000000/filled-like.png"
                                className="icon w-100 h-100 p-1"
                                style={{ objectFit: 'cover' }}
                            ></img>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default MarketplaceItem
