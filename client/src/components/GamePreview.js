import React, { Component } from 'react';
import { Alert, Badge, Container, Row, Col } from 'reactstrap';
import './GamePreview.css';


function Price(props) {
    return (
        <div className='price'>
            <h3><Badge>${props.price}</Badge></h3>
            {props.hasOwnProperty('updating') &&
                <Alert className='priceMessage' color='info'>Updating info from Sony PS store</Alert>}
        </div>
    );
}

class GamePreview extends Component {
    render() {
        const { title, image, strikePrice, onSale } = this.props;

        return (
            <Container>
                <Row>
                    <Col xs='6'>
                        <img className='img-fluid' src={image} alt={title} />
                    </Col>

                    <Col xl='6'>
                        {!onSale ?
                            <div>
                                <h3>{title} is currently </h3>
                                <Price {...this.props} />
                            </div> :
                            <div>
                                <h3><i>Nice!</i> {title} is on sale for </h3>
                                <Price {...this.props} />
                                <strong>Regular price: ${strikePrice}</strong>
                            </div>}
                        <div className='lastUpdated'>
                            <small className='text-muted'>Updated {new Date().toLocaleTimeString()}</small>
                        </div>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default GamePreview;


