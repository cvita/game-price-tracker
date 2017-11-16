import React from 'react';
import { Container, Row, Col, Jumbotron, Alert, Badge } from 'reactstrap';
import './GameOverview.css';


const PriceMessages = props => {
    const { title, strikePrice, onSale, psPlusPrice, price } = props;
    const regularPrice = !onSale;
    const regularSale = onSale && !psPlusPrice;

    if (regularPrice) {
        return (
            <div>
                <h3>{title} is currently <Badge>${price}</Badge></h3>

                {psPlusPrice && (
                    <h5><i>PS Plus</i> member price <Badge color='info'>${psPlusPrice}</Badge></h5>)}
            </div>
        );
    }
    if (regularSale) {
        return (
            <div>
                <h3><i>Nice!</i> {title} is on sale for <Badge>${price}</Badge></h3>
                <strong>Regular price: ${strikePrice}</strong>

                <Alert color='info'>
                    <p>You're still welcome to set up this price alert in case {title} gets an even greater discount.</p>
                </Alert>
            </div>
        );
    }
    return null;
};


const GameOverview = props => {
    const { title, image } = props;
    const imageLarge = image.replace(/225/g, '400');
    return (
        <Jumbotron>
            <Container>
                <Row>
                    <Col md='6' xs='12'>
                        <img
                            className='img-fluid gameOverviewImage'
                            src={imageLarge}
                            alt={title}
                        />
                    </Col>

                    <Col md='6' xs='12'>
                        <PriceMessages {...props} />
                        {props.children}
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};


export default GameOverview;
